import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { ChevronRight, Users, BarChart3, Church, UserPlus, Clock, Shield, CheckSquare, Calendar, MapPin, Play, Star, Heart, Globe, Zap, Target } from "lucide-react";
import churchAttendanceHero from "@/assets/church-attendance-hero.jpg";

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    pin: '',
    ministry: '',
    role: ''
  });
  const { toast } = useToast();

  const heroTexts = [
    "Transform Your Church Experience",
    "Seamless Attendance Management", 
    "Unite Faith with Technology"
  ];

  const carouselSlides = [
    {
      title: "Christ Apostolic Church",
      subtitle: "Jehovah Is Great Ministries",
      description: "Modern digital attendance system for seamless church service management",
      cta: "Take Attendance Now"
    },
    {
      title: "Real-Time Attendance",
      subtitle: "Track Every Service",
      description: "Get instant insights and reports for all your church services and ministries",
      cta: "View Dashboard"
    },
    {
      title: "Multiple Ministries",
      subtitle: "One Platform",
      description: "Manage attendance for Main Church, Teens, Children, and all special programs",
      cta: "Register Today"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  const quickActions = [
    {
      title: "Enter Attendance",
      description: "Record service attendance",
      icon: Users,
      href: "/attendance",
      primary: true
    },
    {
      title: "Register as Usher",
      description: "Get your PIN and register",
      icon: UserPlus,
      action: () => setShowRegistration(true),
      primary: false
    },
    {
      title: "View Reports",
      description: "Leader dashboard and analytics",
      icon: BarChart3,
      href: "/dashboard",
      primary: false
    }
  ];

  const ministryOptions = [
    'Main Church',
    'Teens Church', 
    'Infant Church',
    'Car Park',
    'Dining with the King'
  ];

  const roleOptions = [
    'User',
    'Leader'
  ];

  const handleRegistration = () => {
    if (!registrationData.name || !registrationData.pin || !registrationData.ministry || !registrationData.role) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Registration Successful!",
      description: `Welcome ${registrationData.name}! Your PIN is ${registrationData.pin}. Please remember it for attendance entry.`,
    });
    
    setShowRegistration(false);
    setRegistrationData({ name: '', pin: '', ministry: '', role: '' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Main Background with Parallax */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-church-primary/20 z-10" />
        <img 
          src={churchAttendanceHero}
          alt="Church Attendance"
          className="w-full h-[120vh] object-cover opacity-90"
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-20">
        <Header />

        {/* Hero Carousel Section */}
        <section className="min-h-screen flex items-center justify-center text-center px-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 animate-float">
            <Church className="h-8 w-8 text-white/30" />
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <Star className="h-6 w-6 text-church-accent/50" />
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse-slow">
            <Heart className="h-10 w-10 text-church-secondary/40" />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Carousel Container */}
            <div className="relative">
              {carouselSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute inset-0 translate-x-full'
                  }`}
                >
                  {/* Church Icon */}
                  <div className="mb-8 animate-scale-in">
                    <div className="inline-flex p-6 bg-gradient-to-r from-church-primary/20 to-church-secondary/20 backdrop-blur-xl border border-white/30 rounded-full mb-8 shadow-2xl">
                      <Church className="h-16 w-16 text-white animate-pulse-slow" />
                    </div>
                  </div>

                  {/* Main Title with Flip Animation */}
                  <div className="mb-6">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 animate-fade-in-up">
                      {slide.title}
                    </h1>
                    <div className="h-20 md:h-24 flex items-center justify-center">
                      <span 
                        key={currentTextIndex}
                        className="block text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-church-accent via-church-secondary to-white bg-clip-text text-transparent animate-text-flip font-bold"
                      >
                        {heroTexts[currentTextIndex]}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-church-secondary mb-6 animate-slide-up">
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
                    {slide.description}
                  </p>
                  
                  {/* Call to Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white text-xl px-10 py-8 rounded-3xl transition-all duration-500 hover:scale-110 shadow-2xl border-2 border-white/20 backdrop-blur-sm"
                      onClick={() => window.location.href = "/attendance"}
                    >
                      <Play className="mr-3 h-6 w-6" />
                      {slide.cta}
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-xl border-2 border-white/50 hover:bg-white/20 text-white text-xl px-10 py-8 rounded-3xl transition-all duration-500 hover:scale-110 shadow-2xl"
                      onClick={() => setShowRegistration(true)}
                    >
                      <UserPlus className="mr-3 h-6 w-6" />
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-12 space-x-4">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Sections with Different Backgrounds */}
        
        {/* Quick Actions Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background with parallax */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-church-primary/30 to-church-secondary/30" />
          </div>
          
          <div className="relative z-10 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                    Quick Actions
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Get started with our powerful attendance management system
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {quickActions.map((action, index) => (
                    <Card 
                      key={index}
                      className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 animate-slide-up shadow-xl hover:shadow-2xl ${
                        action.primary ? 'border-church-primary/50 bg-gradient-to-br from-church-primary/10 to-church-secondary/10' : 'hover:border-church-primary/30'
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => action.href ? window.location.href = action.href : action.action?.()}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                          action.primary 
                            ? 'bg-gradient-to-br from-church-primary to-church-secondary shadow-lg' 
                            : 'bg-gradient-to-br from-muted to-muted/80'
                        }`}>
                          <action.icon className={`h-10 w-10 ${action.primary ? 'text-white' : 'text-muted-foreground'}`} />
                        </div>
                        <CardTitle className={`text-xl mb-2 ${action.primary ? 'text-church-primary' : ''}`}>
                          {action.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {action.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 text-center">
                        <div className="flex items-center justify-center text-church-primary group-hover:translate-x-2 transition-all duration-300">
                          <span className="text-base font-semibold">Get Started</span>
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

        {/* Features Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-church-accent/10 to-transparent" />
          </div>
          
          <div className="relative z-10 bg-card/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                  Why Choose Our System?
                </h2>
                <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto animate-slide-up">
                  Experience the future of church attendance management with our innovative features
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Zap,
                      title: "Lightning Fast",
                      description: "Quick and efficient attendance recording for all age groups"
                    },
                    {
                      icon: Shield,
                      title: "Secure & Reliable",
                      description: "PIN-based authentication ensures data security and accuracy"
                    },
                    {
                      icon: Globe,
                      title: "Multi-Ministry Support",
                      description: "Manage attendance for all church ministries in one platform"
                    },
                    {
                      icon: BarChart3,
                      title: "Real-time Analytics",
                      description: "Get instant insights and detailed reports for better planning"
                    },
                    {
                      icon: Heart,
                      title: "User-Friendly",
                      description: "Designed for all ages, from teenagers to senior members"
                    },
                    {
                      icon: Target,
                      title: "Accurate Tracking",
                      description: "Precise attendance tracking with detailed breakdowns"
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="group p-8 rounded-2xl bg-gradient-to-br from-background to-background/80 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in border border-border hover:border-church-primary/30"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-church-primary to-church-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-church-primary">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          >
            <img 
              src={churchAttendanceHero}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-church-primary/40 to-church-secondary/40" />
          </div>
          
          <div className="relative z-10 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in">
                  How It Works
                </h2>
                <p className="text-xl text-white/80 mb-16 max-w-3xl mx-auto animate-slide-up">
                  Simple, secure, and efficient - get started in three easy steps
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    {
                      step: "01",
                      icon: Shield,
                      title: "Login with PIN",
                      description: "Enter your name and secure PIN to access the system"
                    },
                    {
                      step: "02", 
                      icon: Clock,
                      title: "Select Service",
                      description: "Choose the service and ministry you're recording for"
                    },
                    {
                      step: "03",
                      icon: Users,
                      title: "Record Attendance", 
                      description: "Count and submit attendance with detailed breakdowns"
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-white to-white/90 rounded-full flex items-center justify-center shadow-2xl">
                            <step.icon className="h-12 w-12 text-church-primary" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-church-accent to-church-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                        <p className="text-white/80 text-lg leading-relaxed">{step.description}</p>
                      </div>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-12 left-full w-12 border-t-2 border-dashed border-white/40 transform translate-x-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Areas Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="relative z-10 bg-card/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                    Ministry Areas
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive attendance management across all church ministries
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { 
                      name: "Main Church", 
                      count: "4 sections",
                      icon: Church,
                      description: "Primary worship service with multiple seating areas"
                    },
                    { 
                      name: "Teens Church", 
                      count: "1 section + Teachers",
                      icon: Users,
                      description: "Youth ministry with separate teacher tracking"
                    },
                    { 
                      name: "Infant Church", 
                      count: "1 section + Teachers",
                      icon: Heart,
                      description: "Children's ministry with dedicated teacher count"
                    },
                    { 
                      name: "Dining with the King", 
                      count: "1 section",
                      icon: Calendar,
                      description: "Fellowship and community dining program"
                    }
                  ].map((ministry, index) => (
                    <Card 
                      key={index} 
                      className="p-8 border-church-primary/20 hover:border-church-primary/40 transition-all duration-500 hover:scale-105 animate-slide-up shadow-lg hover:shadow-xl bg-gradient-to-br from-background to-background/80"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <ministry.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-church-primary">{ministry.name}</h3>
                            <span className="text-sm font-medium text-church-secondary bg-church-secondary/10 px-3 py-1 rounded-full">
                              {ministry.count}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{ministry.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-card/50 backdrop-blur-sm mt-16 animate-fade-in">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-muted-foreground">
              © 2024 CACJIGM - Christ Apostolic Church Jehovah Is Great Ministries
            </p>
          </div>
        </footer>
      </div>

      {/* Registration Modal */}
      <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-church-primary" />
              Register as Usher
            </DialogTitle>
            <DialogDescription>
              Enter your details to register and get your unique PIN for attendance entry.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="reg-name">Full Name</Label>
              <Input
                id="reg-name"
                placeholder="Enter your full name"
                value={registrationData.name}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="reg-pin">Create PIN (4-6 digits)</Label>
              <Input
                id="reg-pin"
                type="password"
                placeholder="Enter a memorable PIN"
                maxLength={6}
                value={registrationData.pin}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, pin: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="reg-ministry">Ministry Area</Label>
              <Select value={registrationData.ministry} onValueChange={(value) => setRegistrationData(prev => ({ ...prev, ministry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your ministry" />
                </SelectTrigger>
                <SelectContent>
                  {ministryOptions.map((ministry) => (
                    <SelectItem key={ministry} value={ministry}>
                      {ministry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="reg-role">Role</Label>
              <Select value={registrationData.role} onValueChange={(value) => setRegistrationData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowRegistration(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegistration}
              className="flex-1 bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90"
            >
              Register
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;