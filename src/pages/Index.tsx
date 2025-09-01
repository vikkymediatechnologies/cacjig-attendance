import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ModernCarousel from "@/components/ModernCarousel";
import { ChevronRight, Users, BarChart3, Church, UserPlus, Clock, Shield, CheckSquare, Calendar, MapPin, Star, Heart, Globe, Zap, Target, Sparkles, Award, TrendingUp } from "lucide-react";
import churchAttendanceHero from "@/assets/church-attendance-hero.jpg";

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    pin: '',
    ministry: '',
    role: ''
  });
  const { toast } = useToast();

  const carouselSlides = [
    {
      id: 1,
      title: "Christ Apostolic Church",
      subtitle: "Jehovah Is Great Ministries",
      description: "Experience seamless digital attendance management with cutting-edge technology designed for modern church services",
      cta: "Take Attendance Now",
      bgGradient: "bg-gradient-to-br from-church-primary/30 via-church-secondary/20 to-church-accent/10"
    },
    {
      id: 2,
      title: "Real-Time Analytics",
      subtitle: "Smart Attendance Tracking",
      description: "Get instant insights, detailed reports, and comprehensive analytics for all your church services and ministries",
      cta: "View Dashboard",
      bgGradient: "bg-gradient-to-br from-church-secondary/30 via-church-accent/20 to-church-primary/10"
    },
    {
      id: 3,
      title: "United in Faith",
      subtitle: "Connected Through Technology",
      description: "Streamline attendance for Main Church, Youth Ministry, Children's Church, and all special programs in one platform",
      cta: "Join Community",
      bgGradient: "bg-gradient-to-br from-church-accent/30 via-church-primary/20 to-church-secondary/10"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    {
      title: "Take Attendance",
      description: "Record service attendance instantly",
      icon: Users,
      href: "/attendance",
      primary: true,
      gradient: "from-church-primary to-church-secondary"
    },
    {
      title: "Register as Usher",
      description: "Get your secure PIN and start recording",
      icon: UserPlus,
      action: () => setShowRegistration(true),
      primary: false,
      gradient: "from-church-secondary to-church-accent"
    },
    {
      title: "View Analytics",
      description: "Access leader dashboard and reports",
      icon: BarChart3,
      href: "/dashboard",
      primary: false,
      gradient: "from-church-accent to-church-primary"
    }
  ];

  const ministryOptions = [
    'Main Church',
    'Teens Church', 
    'Infant Church',
    'Car Park',
    'Dining with the King'
  ];

  const roleOptions = ['User', 'Leader'];

  const handleRegistration = () => {
    if (!registrationData.name || !registrationData.pin || !registrationData.ministry || !registrationData.role) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Registration Successful!",
      description: `Welcome ${registrationData.name}! Your PIN is ${registrationData.pin}. Please remember it for attendance entry.`,
    });
    
    setShowRegistration(false);
    setRegistrationData({ name: '', pin: '', ministry: '', role: '' });
  };

  return (
    <div className="min-h-screen relative bg-church-bg-light">
      {/* Enhanced Background with Parallax */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-church-primary/30 z-10" />
        <img 
          src={churchAttendanceHero}
          alt="Church Attendance"
          className="w-full h-[120vh] object-cover"
        />
      </div>
      
      <div className="relative z-20">
        <Header />

        {/* Modern Hero Carousel */}
        <ModernCarousel 
          slides={carouselSlides}
          onCTAClick={(slideId) => {
            if (slideId === 1) window.location.href = "/attendance";
            if (slideId === 2) window.location.href = "/dashboard";
            if (slideId === 3) setShowRegistration(true);
          }}
          onRegisterClick={() => setShowRegistration(true)}
        />

        {/* Enhanced Quick Actions Section */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-church-primary/20 to-church-secondary/20" />
          </div>
          
          <div className="relative z-10 bg-white/98 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <div className="inline-block p-4 bg-gradient-to-r from-church-primary/10 to-church-secondary/10 rounded-3xl mb-6">
                    <Sparkles className="h-12 w-12 text-church-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-church-primary">
                    Get Started Today
                  </h2>
                  <p className="text-base md:text-lg text-church-text-light/80 max-w-3xl mx-auto leading-relaxed">
                    Transform your church experience with our powerful attendance management system
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {quickActions.map((action, index) => (
                    <Card 
                      key={index}
                      className={`group cursor-pointer transition-all duration-700 hover:scale-110 hover:-rotate-2 animate-slide-up shadow-2xl hover:shadow-3xl border-0 overflow-hidden ${
                        action.primary ? 'ring-2 ring-church-primary/30' : ''
                      }`}
                      style={{ animationDelay: `${index * 300}ms` }}
                      onClick={() => action.href ? window.location.href = action.href : action.action?.()}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <CardHeader className="text-center pb-6 pt-12">
                        <div className={`mx-auto w-28 h-28 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 bg-gradient-to-br ${action.gradient} shadow-2xl`}>
                          <action.icon className="h-14 w-14 text-white" />
                        </div>
                        <CardTitle className="text-xl mb-3 text-church-primary group-hover:text-church-secondary transition-colors duration-300">
                          {action.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {action.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 pb-12 text-center">
                        <div className="flex items-center justify-center text-church-primary group-hover:text-church-secondary group-hover:translate-x-2 transition-all duration-300">
                          <span className="text-base font-semibold">Explore Now</span>
                          <ChevronRight className="ml-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Grid */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-church-accent/15 to-transparent" />
          </div>
          
          <div className="relative z-10 bg-gradient-to-br from-white/95 to-church-bg-light/95 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <div className="inline-block p-4 bg-gradient-to-r from-church-secondary/10 to-church-accent/10 rounded-3xl mb-6">
                    <Award className="h-12 w-12 text-church-secondary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-church-primary">
                    Why Choose Our Platform?
                  </h2>
                  <p className="text-base md:text-lg text-church-text-light/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Discover the advanced features that make church attendance management effortless
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[
                    {
                      icon: Zap,
                      title: "Lightning Fast",
                      description: "Ultra-quick attendance recording with optimized performance for all devices",
                      color: "from-yellow-400 to-orange-500"
                    },
                    {
                      icon: Shield,
                      title: "Military-Grade Security", 
                      description: "Advanced PIN-based authentication with encrypted data protection",
                      color: "from-blue-400 to-purple-500"
                    },
                    {
                      icon: Globe,
                      title: "Multi-Ministry Hub",
                      description: "Comprehensive platform supporting all church ministries and programs",
                      color: "from-green-400 to-blue-500"
                    },
                    {
                      icon: TrendingUp,
                      title: "Advanced Analytics",
                      description: "AI-powered insights with predictive attendance modeling",
                      color: "from-purple-400 to-pink-500"
                    },
                    {
                      icon: Heart,
                      title: "User-Centric Design",
                      description: "Intuitive interface designed for seamless user experience across all ages",
                      color: "from-pink-400 to-red-500"
                    },
                    {
                      icon: Target,
                      title: "Precision Tracking",
                      description: "Accurate attendance monitoring with detailed demographic breakdowns",
                      color: "from-indigo-400 to-purple-500"
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="group p-10 rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-700 animate-scale-in border border-church-primary/10 hover:border-church-primary/30 hover:scale-105"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className={`w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-church-primary group-hover:text-church-secondary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-base text-church-text-light/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Ministry Showcase */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <img 
              src={churchAttendanceHero}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-church-primary/60 to-church-secondary/60" />
          </div>
          
          <div className="relative z-10 bg-white/95 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <div className="inline-block p-4 bg-gradient-to-r from-church-accent/10 to-church-primary/10 rounded-3xl mb-6">
                    <Church className="h-12 w-12 text-church-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-church-primary">
                    Ministry Coverage
                  </h2>
                  <p className="text-base md:text-lg text-church-text-light/80 max-w-3xl mx-auto leading-relaxed">
                    Comprehensive attendance management across all church ministries and programs
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { 
                      name: "Main Church Service", 
                      count: "4 Seating Sections",
                      icon: Church,
                      description: "Primary worship service with comprehensive multi-section attendance tracking",
                      stats: "500+ Members"
                    },
                    { 
                      name: "Youth Ministry", 
                      count: "Teens + Leaders",
                      icon: Users,
                      description: "Dynamic youth programs with separate tracking for participants and mentors",
                      stats: "150+ Teens"
                    },
                    { 
                      name: "Children's Church", 
                      count: "Kids + Teachers",
                      icon: Heart,
                      description: "Dedicated children's ministry with safety-focused attendance monitoring",
                      stats: "200+ Children"
                    },
                    { 
                      name: "Fellowship Programs", 
                      count: "Special Events",
                      icon: Calendar,
                      description: "Community dining and special event attendance management",
                      stats: "300+ Participants"
                    }
                  ].map((ministry, index) => (
                    <Card 
                      key={index} 
                      className="group p-8 border-0 hover:scale-105 transition-all duration-700 animate-slide-up shadow-2xl hover:shadow-3xl bg-gradient-to-br from-white to-church-bg-light/50 overflow-hidden"
                      style={{ animationDelay: `${index * 250}ms` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-church-primary/10 to-church-secondary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="relative flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-church-primary to-church-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <ministry.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-church-primary group-hover:text-church-secondary transition-colors duration-300">
                              {ministry.name}
                            </h3>
                            <span className="text-sm font-bold text-white bg-gradient-to-r from-church-secondary to-church-accent px-4 py-2 rounded-full shadow-lg">
                              {ministry.count}
                            </span>
                          </div>
                          <p className="text-base text-church-text-light/80 leading-relaxed mb-4">
                            {ministry.description}
                          </p>
                          <div className="flex items-center text-church-primary font-semibold">
                            <span className="text-sm bg-church-primary/10 px-3 py-1 rounded-full">
                              {ministry.stats}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="relative bg-gradient-to-br from-church-primary via-church-secondary to-church-accent text-white py-16">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl">
                  <Church className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">CACJIGM</h3>
              </div>
              <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                Christ Apostolic Church Jehovah Is Great Ministries - Leading the future of church attendance management
              </p>
            </div>
            <div className="border-t border-white/20 pt-8">
              <p className="text-white/70 text-base">
                © 2024 CACJIGM. All rights reserved. Built with ❤️ for the church community.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Enhanced Registration Modal */}
      <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
        <DialogContent className="sm:max-w-lg animate-scale-in bg-gradient-to-br from-white to-church-bg-light border-church-primary/20 shadow-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                Join Our Community
              </span>
            </DialogTitle>
            <DialogDescription className="text-lg text-church-text-light/80">
              Register as an usher to get your unique PIN and start managing attendance with our advanced system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-6">
            <div>
              <Label htmlFor="reg-name" className="text-base font-semibold text-church-primary">Full Name</Label>
              <Input
                id="reg-name"
                placeholder="Enter your complete name"
                value={registrationData.name}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-2 text-base py-3 border-church-primary/30 focus:border-church-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="reg-pin" className="text-base font-semibold text-church-primary">Create PIN (4-6 digits)</Label>
              <Input
                id="reg-pin"
                type="password"
                placeholder="Create a memorable PIN"
                maxLength={6}
                value={registrationData.pin}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, pin: e.target.value }))}
                className="mt-2 text-base py-3 border-church-primary/30 focus:border-church-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="reg-ministry" className="text-base font-semibold text-church-primary">Ministry Area</Label>
              <Select value={registrationData.ministry} onValueChange={(value) => setRegistrationData(prev => ({ ...prev, ministry: value }))}>
                <SelectTrigger className="mt-2 text-base py-3 border-church-primary/30">
                  <SelectValue placeholder="Select your ministry area" />
                </SelectTrigger>
                <SelectContent>
                  {ministryOptions.map((ministry) => (
                    <SelectItem key={ministry} value={ministry} className="text-base">
                      {ministry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="reg-role" className="text-base font-semibold text-church-primary">Role</Label>
              <Select value={registrationData.role} onValueChange={(value) => setRegistrationData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger className="mt-2 text-base py-3 border-church-primary/30">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role} className="text-base">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-4 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowRegistration(false)}
              className="flex-1 text-base py-3 border-church-primary/30 hover:bg-church-primary/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegistration}
              className="flex-1 text-base py-3 bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 shadow-xl"
            >
              Complete Registration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;