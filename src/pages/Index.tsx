import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronRight, Users, BarChart3, Calendar, Info, Church, Shield, CheckCircle, UserPlus, X } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    pin: '',
    ministry: '',
    role: ''
  });
  const { toast } = useToast();

  const flowSteps = [
    {
      icon: Shield,
      title: "PIN Authentication",
      description: "Secure login with your unique PIN code"
    },
    {
      icon: Calendar,
      title: "Select Service",
      description: "Choose date and service type"
    },
    {
      icon: Users,
      title: "Ministry & Section",
      description: "Select your ministry area and section"
    },
    {
      icon: CheckCircle,
      title: "Enter Attendance",
      description: "Count and record attendance numbers"
    },
    {
      icon: BarChart3,
      title: "Leader Dashboard",
      description: "View reports and analytics"
    }
  ];

  const navigationCards = [
    {
      title: "Service Attendance",
      description: "Secure PIN login and attendance entry",
      icon: Users,
      href: "/attendance",
      gradient: "from-church-primary to-church-secondary"
    },
    {
      title: "Register as Usher",
      description: "Register your name and get a PIN",
      icon: UserPlus,
      action: () => setShowRegistration(true),
      gradient: "from-church-secondary to-church-accent"
    },
    {
      title: "Leader Dashboard",
      description: "View reports and analytics",
      icon: BarChart3,
      href: "/dashboard",
      gradient: "from-church-accent to-church-primary"
    },
    {
      title: "About CACJIGM",
      description: "Learn about our system",
      icon: Info,
      href: "/about",
      gradient: "from-church-primary to-church-accent"
    }
  ];

  const ministryOptions = [
    'Main Church',
    'Teens Church', 
    'Children Church',
    'Car Park',
    'Bible Study'
  ];

  const roleOptions = [
    'Usher',
    'Teacher',
    'Worker',
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
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm animate-fade-in">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-church-primary to-church-secondary rounded-lg animate-scale-in">
                <Church className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                  CACJIGM
                </h1>
                <p className="text-muted-foreground">Church Attendance Management System</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-church-text-light mb-4">
            Welcome to CACJIGM
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamlined attendance management for Christ Apostolic Church Jesus Is God Ministry. 
            Track attendance across all services and ministry areas with precision and ease.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white px-8 py-3 text-lg hover:scale-105 transition-transform duration-300"
            onClick={() => window.location.href = '/attendance'}
          >
            Enter Attendance System
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* System Flow */}
        <section className="mb-12 animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-8 text-church-text-light">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {flowSteps.map((step, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  index === currentStep 
                    ? 'border-church-primary shadow-lg scale-105 animate-scale-in' 
                    : 'border-border hover:border-church-secondary hover:scale-102'
                } animate-slide-in-right`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-gradient-to-br from-church-primary to-church-secondary text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-8 text-church-text-light">
            Quick Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationCards.map((card, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg hover:shadow-church-primary/10 transition-all duration-500 cursor-pointer border-0 overflow-hidden hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => card.href ? window.location.href = card.href : card.action?.()}
              >
                <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-church-primary transition-colors duration-300">
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-church-primary group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm font-medium">Access</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ministry Areas */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-church-text-light">
            Ministry Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Main Church", sections: ["Havilah", "Sub-Havilah", "Zion", "Sub-Zion"] },
              { name: "Teens Church", sections: ["Male Teachers", "Female Teachers", "Teens"] },
              { name: "Children Church", sections: ["Male Teachers", "Female Teachers", "Children"] },
              { name: "Car Park", sections: ["Car Park Workers"] }
            ].map((ministry, index) => (
              <Card key={index} className="border-church-primary/20">
                <CardHeader>
                  <CardTitle className="text-church-primary">{ministry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {ministry.sections.map((section, sIndex) => (
                      <li key={sIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-church-secondary rounded-full mr-2" />
                        {section}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

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

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16 animate-fade-in">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground">
            © 2024 CACJIGM - Christ Apostolic Church Jesus Is God Ministry
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;