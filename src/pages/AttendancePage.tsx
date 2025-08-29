import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Calendar, Users, Hash, Plus, Minus } from "lucide-react";
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
  const [attendanceCounts, setAttendanceCounts] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  // PIN verification with specific codes
  const verifyPin = (pin: string) => {
    const users = {
      '1234': { name: 'Main Church User', role: 'user', ministry: 'Main Church' },
      '5678': { name: 'Teens Church User', role: 'user', ministry: 'Teens Church' },
      '9012': { name: 'Infant Church User', role: 'user', ministry: 'Infant Church' },
      '0000': { name: 'Church Leader', role: 'leader', ministry: 'All' }
    };
    return users[pin as keyof typeof users];
  };

  const services = [
    'First Service (Sunday 8:00 AM)', 
    'Second Service (Sunday 10:00 AM)',
    'Teens Church (Sunday 8:00 AM)',
    'Infant Church (Sunday 8:00 AM)',
    'Take Charge of the Week (Sunday 6:00 AM)',
    'Arogungbogunmi (Monday 6:00 AM)',
    'Wednesday Agbagra (Wednesday 8:30 AM)',
    'Dining with the King (Thursday 5:00 PM)',
    'Holy Ghost Fire Night (Friday 11:00 PM)',
    'Bible Club Youth (2nd Saturday 11:00 AM)',
    'Bible Club Children (2nd Saturday 11:00 AM)'
  ];

  const ministryAreas = {
    'Main Church': ['Havilah', 'Sub-Havilah', 'Zion', 'Sub-Zion'],
    'Teens Church': ['Male Teachers', 'Female Teachers', 'Teens'],
    'Infant Church': ['Male Teachers', 'Female Teachers', 'Children'],
    'Dining with the King': ['General']
  };

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
        window.location.href = '/leader';
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

  const updateCount = (section: string, change: number) => {
    setAttendanceCounts(prev => ({
      ...prev,
      [section]: Math.max(0, (prev[section] || 0) + change)
    }));
  };

  const handleSubmitAttendance = async () => {
    if (!selectedService || !selectedMinistry) {
      toast({
        title: "Missing Information",
        description: "Please select service and ministry area.",
        variant: "destructive"
      });
      return;
    }

    const sections = ministryAreas[selectedMinistry as keyof typeof ministryAreas];
    const records = [];

    for (const section of sections) {
      const count = attendanceCounts[section] || 0;
      if (count > 0) {
        records.push({
          service: selectedService,
          service_date: selectedDate,
          ministry_area: selectedMinistry,
          section: section,
          category: section.includes('Teacher') ? 'Teachers' : section === 'Teens' || section === 'Children' ? 'Students' : 'General',
          count: count,
          user_on_duty: userOnDuty
        });
      }
    }

    if (records.length === 0) {
      toast({
        title: "No Attendance",
        description: "Please enter attendance numbers.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('attendance_records')
        .insert(records);
      
      if (error) throw error;
      
      const totalCount = Object.values(attendanceCounts).reduce((sum, count) => sum + count, 0);
      toast({
        title: "Success!",
        description: `Attendance recorded: ${totalCount} people across ${records.length} sections`,
      });
      
      // Reset form
      setSelectedService('');
      setSelectedMinistry('');
      setAttendanceCounts({});
      
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
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-card/50 backdrop-blur-sm">
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {step === 'auth' && (
          <Card className="animate-scale-in max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Attendance Entry</CardTitle>
              <CardDescription>Simple and easy attendance recording</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="user-name" className="text-lg">Your Name</Label>
                <Input
                  id="user-name"
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12 text-lg mt-2"
                />
              </div>
              <div>
                <Label htmlFor="pin" className="text-lg">PIN Code</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={6}
                  className="h-12 text-lg mt-2 text-center"
                />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Demo PINs: 1234 (Main) • 5678 (Teens) • 9012 (Infant) • 0000 (Leader)
                </p>
              </div>
              <Button 
                onClick={handleAuthSubmit}
                className="w-full h-14 text-lg bg-gradient-to-r from-church-primary to-church-secondary"
                disabled={pin.length < 4 || !userName.trim()}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'entry' && (
          <div className="space-y-8 animate-fade-in">
            {/* Step 1: Date Selection */}
            <Card className="border-2 border-church-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="h-6 w-6 text-church-primary" />
                  Step 1: Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-center font-medium h-12 text-lg"
                />
              </CardContent>
            </Card>

            {/* Step 2: Service Selection */}
            <Card className="border-2 border-church-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="h-6 w-6 text-church-secondary" />
                  Step 2: Choose Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card 
                      key={service}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedService === service 
                          ? 'ring-2 ring-church-primary bg-gradient-to-br from-church-primary/10 to-church-secondary/10' 
                          : 'hover:border-church-primary/50'
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="font-medium text-sm">{service}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Ministry Selection */}
            {selectedService && (
              <Card className="border-2 border-church-primary/20 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Hash className="h-6 w-6 text-church-accent" />
                    Step 3: Select Ministry Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(ministryAreas).map((ministry) => (
                      <Card 
                        key={ministry}
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedMinistry === ministry 
                            ? 'ring-2 ring-church-secondary bg-gradient-to-br from-church-secondary/10 to-church-accent/10' 
                            : 'hover:border-church-secondary/50'
                        }`}
                        onClick={() => setSelectedMinistry(ministry)}
                      >
                        <CardContent className="p-4 text-center">
                          <p className="font-medium text-lg">{ministry}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Attendance Count */}
            {selectedMinistry && (
              <Card className="border-2 border-church-primary/20 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Users className="h-6 w-6 text-church-primary" />
                    Step 4: Count People
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Use the large buttons to count people in {selectedMinistry}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    {ministryAreas[selectedMinistry as keyof typeof ministryAreas].map((section) => (
                      <div key={section} className="p-6 bg-muted/50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-center">{section}</h3>
                        <div className="flex items-center justify-center gap-6">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => updateCount(section, -1)}
                            disabled={(attendanceCounts[section] || 0) === 0}
                            className="h-16 w-16 text-2xl"
                          >
                            <Minus className="h-8 w-8" />
                          </Button>
                          
                          <div className="text-center">
                            <div className="text-4xl font-bold text-church-primary">
                              {attendanceCounts[section] || 0}
                            </div>
                            <div className="text-sm text-muted-foreground">People</div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => updateCount(section, 1)}
                            className="h-16 w-16 text-2xl"
                          >
                            <Plus className="h-8 w-8" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-r from-church-primary/10 to-church-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-church-primary mb-2">
                      Total: {Object.values(attendanceCounts).reduce((sum, count) => sum + count, 0)} People
                    </div>
                    <Button 
                      onClick={handleSubmitAttendance}
                      className="w-full h-16 text-xl bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90"
                      disabled={Object.values(attendanceCounts).reduce((sum, count) => sum + count, 0) === 0}
                    >
                      Submit Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AttendancePage;