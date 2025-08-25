import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { ChevronRight, Users, BarChart3, Info, Church, UserPlus, Clock, Shield } from "lucide-react";

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    pin: '',
    ministry: '',
    role: ''
  });
  const { toast } = useToast();

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
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in-up">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex p-3 bg-gradient-to-br from-church-primary to-church-secondary rounded-2xl mb-4">
                <Church className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Christ Apostolic Church
              <span className="block text-2xl md:text-3xl bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                Jesus Is God Ministry
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Simple and efficient attendance management system for all services and ministry areas.
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 animate-scale-in ${
                    action.primary ? 'border-church-primary/50 bg-gradient-to-br from-church-primary/5 to-church-secondary/5' : 'hover:border-church-primary/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => action.href ? window.location.href = action.href : action.action?.()}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                      action.primary 
                        ? 'bg-gradient-to-br from-church-primary to-church-secondary' 
                        : 'bg-muted'
                    }`}>
                      <action.icon className={`h-8 w-8 ${action.primary ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <CardTitle className={`text-lg ${action.primary ? 'text-church-primary' : ''}`}>
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <div className="flex items-center justify-center text-church-primary group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">Get Started</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Simplified */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-church-primary to-church-secondary rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">Login with PIN</h3>
                <p className="text-sm text-muted-foreground">Enter your name and PIN to get started</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-church-secondary to-church-accent rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">Select Service</h3>
                <p className="text-sm text-muted-foreground">Choose the service you're recording for</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-church-accent to-church-primary rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">Record Attendance</h3>
                <p className="text-sm text-muted-foreground">Count and submit attendance numbers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Areas - Simplified */}
        <section className="animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Ministry Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Main Church", count: "4 sections" },
                { name: "Teens Church", count: "3 sections" },
                { name: "Children Church", count: "3 sections" },
                { name: "Car Park", count: "1 section" }
              ].map((ministry, index) => (
                <Card key={index} className="p-4 border-church-primary/20 hover:border-church-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-church-primary">{ministry.name}</h3>
                    <span className="text-sm text-muted-foreground">{ministry.count}</span>
                  </div>
                </Card>
              ))}
            </div>
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