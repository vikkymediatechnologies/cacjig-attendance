import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Users, BookOpen, BarChart3 } from "lucide-react";

const LoginPage = () => {
  const [pin, setPin] = useState('');
  const { toast } = useToast();

  const verifyPin = (pin: string) => {
    const users = {
      '1234': { name: 'Main Church Usher', role: 'usher', ministry: 'Main Church', redirect: '/attendance' },
      '5678': { name: 'Teens Church Teacher', role: 'teacher', ministry: 'Teens Church', redirect: '/attendance' },
      '9012': { name: 'Children Church Teacher', role: 'teacher', ministry: 'Children Church', redirect: '/attendance' },
      '0000': { name: 'Church Leader', role: 'leader', ministry: 'All', redirect: '/dashboard' }
    };
    return users[pin as keyof typeof users];
  };

  const handleLogin = () => {
    const user = verifyPin(pin);
    if (user) {
      // Store user info in sessionStorage for the attendance page
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: "Authentication Successful",
        description: `Welcome, ${user.name}!`,
      });
      // Redirect based on role
      setTimeout(() => {
        window.location.href = user.redirect;
      }, 1000);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid PIN. Please try again.",
        variant: "destructive"
      });
    }
  };

  const pinInfo = [
    { pin: '1234', role: 'Main Church Usher', icon: Users, color: 'from-blue-500 to-blue-600' },
    { pin: '5678', role: 'Teens Church Teacher', icon: BookOpen, color: 'from-green-500 to-green-600' },
    { pin: '9012', role: 'Children Church Teacher', icon: Users, color: 'from-purple-500 to-purple-600' },
    { pin: '0000', role: 'Leaders Dashboard', icon: BarChart3, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-church-primary" />
              <span className="font-medium">Secure Login</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="border-church-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-church-primary to-church-secondary rounded-full flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl">PIN Authentication</CardTitle>
              <CardDescription className="text-base">
                Enter your unique 4-digit PIN to access the CACJIGM attendance system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="pin" className="text-base">PIN Code</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  className="text-center text-2xl tracking-widest h-14 mt-2"
                  maxLength={4}
                />
              </div>
              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 h-12 text-lg"
                disabled={pin.length !== 4}
              >
                <Shield className="mr-2 h-5 w-5" />
                Authenticate
              </Button>
            </CardContent>
          </Card>

          {/* PIN Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-church-text-light text-center lg:text-left">
              Access Levels
            </h3>
            <p className="text-muted-foreground text-center lg:text-left">
              Each ministry area has its own secure PIN code for controlled access to the attendance system.
            </p>
            
            <div className="grid gap-4">
              {pinInfo.map((info, index) => (
                <Card key={index} className="border-l-4 border-l-church-primary/50 hover:border-l-church-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-church-text-light">{info.role}</h4>
                        <p className="text-sm text-muted-foreground">PIN: {info.pin}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-church-primary/5 border-church-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-church-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-church-primary">Security Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep your PIN confidential. Each PIN provides access to specific ministry areas and ensures accurate attendance tracking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;