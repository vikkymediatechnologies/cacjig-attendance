import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Calendar, Users, Hash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AttendanceData {
  service: string;
  date: string;
  ministryArea: string;
  category: string;
  section: string;
  count: number;
  userOnDuty: string;
}

const AttendancePage = () => {
  const [step, setStep] = useState<'auth' | 'entry'>('auth');
  const [userName, setUserName] = useState('');
  const [pin, setPin] = useState('');
  const [userOnDuty, setUserOnDuty] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [attendanceCount, setAttendanceCount] = useState('');
  const { toast } = useToast();

  // PIN verification with specific codes
  const verifyPin = (pin: string) => {
    const users = {
      '1234': { name: 'Main Church Usher', role: 'usher', ministry: 'Main Church' },
      '5678': { name: 'Teens Church Teacher', role: 'teacher', ministry: 'Teens Church' },
      '9012': { name: 'Children Church Teacher', role: 'teacher', ministry: 'Children Church' },
      '0000': { name: 'Church Leader', role: 'leader', ministry: 'All' }
    };
    return users[pin as keyof typeof users];
  };

  const services = [
    'Marathon Service (Sunday 6:00 AM)',
    'First Service (Sunday 8:30 AM)', 
    'Second Service (Sunday 11:00 AM)',
    'Teens Church (Sunday 11:00 AM)',
    'Children Church (Sunday 11:00 AM)',
    'Take Charge of the Week (Monday 6:00 PM)',
    'Wednesday Agbara Mountain Program (Wednesday 6:00 PM)',
    'Dining with the King - Bible Study (Thursday 6:00 PM)',
    'Holy Ghost Fire Night (3rd Friday 6:00 PM)',
    'Arogungbogunmi (2nd Saturday 6:00 PM)',
    'Bible Club Youth (Saturday 4:00 PM)',
    'Bible Club Children (Saturday 4:00 PM)'
  ];

  const ministryAreas = {
    'Main Church': ['Havilah', 'Sub-Havilah', 'Zion', 'Sub-Zion'],
    'Teens Church': ['Male Teachers', 'Female Teachers', 'Teens'],
    'Children Church': ['Male Teachers', 'Female Teachers', 'Children'],
    'Car Park': ['Car Park Workers'],
    'Bible Study': ['Children', 'Youth', 'Pastors', 'Adults (Male)', 'Adults (Female)']
  };

  const sections = ['Section A', 'Section B', 'Section C', 'Section D'];

  const handleAuthSubmit = () => {
    if (!userName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return;
    }

    const user = verifyPin(pin);
    if (user) {
      setUserOnDuty(userName.trim());
      
      if (user.role === 'leader') {
        window.location.href = '/dashboard';
        return;
      }
      setStep('entry');
      toast({
        title: "Welcome!",
        description: `Hello, ${userName}!`,
      });
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please check your PIN and try again.",
        variant: "destructive"
      });
    }
  };


  const handleSubmitAttendance = async () => {
    if (!selectedService || !selectedMinistry || !attendanceCount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const count = parseInt(attendanceCount);
    if (count <= 0) {
      toast({
        title: "Invalid Count",
        description: "Please enter a valid attendance number.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('attendance_records')
        .insert({
          service: selectedService,
          service_date: selectedDate,
          ministry_area: selectedMinistry,
          section: 'General',
          category: 'Total',
          count: count,
          user_on_duty: userOnDuty
        });
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: `Attendance recorded: ${count} people`,
      });
      
      // Reset form
      setSelectedService('');
      setSelectedMinistry('');
      setAttendanceCount('');
      
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast({
        title: "Error",
        description: "Failed to submit attendance. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {userOnDuty && (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-church-primary" />
                <span className="text-sm font-medium">{userOnDuty}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        {step === 'auth' && (
          <Card className="animate-scale-in">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Login to Continue</CardTitle>
              <CardDescription>Enter your name and PIN to record attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="user-name">Your Name</Label>
                <Input
                  id="user-name"
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pin">PIN Code</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Demo PINs: 1234 (Main) • 5678 (Teens) • 9012 (Children) • 0000 (Leader)
                </p>
              </div>
              <Button 
                onClick={handleAuthSubmit}
                className="w-full"
                disabled={pin.length < 4 || !userName.trim()}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'entry' && (
          <Card className="animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Record Attendance</CardTitle>
              <CardDescription>Fill in the service details and attendance count</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="service">Service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ministry">Ministry Area</Label>
                <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ministry" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(ministryAreas).map((ministry) => (
                      <SelectItem key={ministry} value={ministry}>
                        {ministry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="count">Total Attendance Count</Label>
                <Input
                  id="count"
                  type="number"
                  placeholder="Enter total number of people"
                  min="0"
                  value={attendanceCount}
                  onChange={(e) => setAttendanceCount(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleSubmitAttendance}
                className="w-full"
                disabled={!selectedService || !selectedMinistry || !attendanceCount}
              >
                Submit Attendance
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AttendancePage;