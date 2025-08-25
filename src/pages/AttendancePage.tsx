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
  const [step, setStep] = useState<'auth' | 'service' | 'ministry' | 'entry'>('auth');
  const [userName, setUserName] = useState('');
  const [pin, setPin] = useState('');
  const [userOnDuty, setUserOnDuty] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceData, setAttendanceData] = useState<Record<string, number>>({});
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
      // Use the actual user name instead of the generic role name
      setUserOnDuty(userName.trim());
      
      // Redirect leaders to dashboard
      if (user.role === 'leader') {
        window.location.href = '/dashboard';
        return;
      }
      setStep('service');
      toast({
        title: "Authentication Successful",
        description: `Welcome, ${userName}!`,
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid PIN. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleServiceSelection = () => {
    if (selectedService && selectedDate) {
      setStep('ministry');
    } else {
      toast({
        title: "Selection Required",
        description: "Please select both service and date.",
        variant: "destructive"
      });
    }
  };

  const handleMinistrySelection = () => {
    if (selectedMinistry && selectedSection) {
      setStep('entry');
    } else {
      toast({
        title: "Selection Required", 
        description: "Please select ministry area and section.",
        variant: "destructive"
      });
    }
  };

  const handleCountChange = (category: string, count: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [category]: parseInt(count) || 0
    }));
  };

  const handleSubmitAttendance = async () => {
    const totalCount = Object.values(attendanceData).reduce((sum, count) => sum + count, 0);
    
    if (totalCount === 0) {
      toast({
        title: "No Data Entered",
        description: "Please enter at least one attendance count.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create attendance records for each category
      const attendanceRecords = [];
      
      for (const [category, count] of Object.entries(attendanceData)) {
        if (count > 0) {
          attendanceRecords.push({
            service: selectedService,
            service_date: selectedDate,
            ministry_area: selectedMinistry,
            section: selectedSection,
            category: category,
            count: count,
            user_on_duty: userOnDuty
          });
        }
      }
      
      // Insert all records
      const { error } = await supabase
        .from('attendance_records')
        .insert(attendanceRecords);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Attendance Submitted Successfully",
        description: `Total count: ${totalCount} recorded for ${selectedService}`,
      });
      
      // Reset form
      setStep('service');
      setAttendanceData({});
      
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast({
        title: "Error",
        description: "Failed to submit attendance. Please try again.",
        variant: "destructive",
      });
    }
  };

  const currentCategories = ministryAreas[selectedMinistry as keyof typeof ministryAreas] || [];

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
            <div className="flex items-center gap-2 ml-auto">
              <Shield className="h-5 w-5 text-church-primary" />
              <span className="font-medium">{userOnDuty || 'Not Authenticated'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {step === 'auth' && (
          <Card className="border-church-primary/20 animate-scale-in">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-church-primary to-church-secondary rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">User Authentication</CardTitle>
              <CardDescription>
                Enter your name and PIN to access the attendance system:<br />
                <span className="text-xs text-muted-foreground mt-2 block">
                  1234 for Main Church • 5678 for Teens Church • 9012 for Children Church • 0000 for Leaders Dashboard
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="user-name">Full Name</Label>
                <Input
                  id="user-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-center"
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
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handleAuthSubmit}
                className="w-full bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90"
                disabled={pin.length < 4 || !userName.trim()}
              >
                Authenticate
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'service' && (
          <Card className="border-church-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-church-secondary to-church-accent rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Select Service</CardTitle>
              <CardDescription>Choose the service and date for attendance entry</CardDescription>
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
                    <SelectValue placeholder="Select a service" />
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
              <Button 
                onClick={handleServiceSelection}
                className="w-full bg-gradient-to-r from-church-secondary to-church-accent hover:from-church-secondary/90 hover:to-church-accent/90"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'ministry' && (
          <Card className="border-church-primary/20 animate-slide-in-right">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-church-accent to-church-primary rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Ministry & Section</CardTitle>
              <CardDescription>Select your ministry area and assigned section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ministry">Ministry Area</Label>
                <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ministry area" />
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
                <Label htmlFor="section">Section</Label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleMinistrySelection}
                className="w-full bg-gradient-to-r from-church-accent to-church-primary hover:from-church-accent/90 hover:to-church-primary/90"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'entry' && (
          <Card className="border-church-primary/20 animate-fade-in-up">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-church-primary to-church-accent rounded-full flex items-center justify-center mb-4">
                <Hash className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Enter Attendance</CardTitle>
              <CardDescription>
                {selectedService} - {selectedDate}<br />
                {selectedMinistry} ({selectedSection})<br />
                <span className="text-church-primary font-medium">Recorded by: {userOnDuty}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCategories.map((category) => (
                <div key={category}>
                  <Label htmlFor={category}>{category}</Label>
                  <Input
                    id={category}
                    type="number"
                    placeholder="0"
                    min="0"
                    value={attendanceData[category] || ''}
                    onChange={(e) => handleCountChange(category, e.target.value)}
                  />
                </div>
              ))}
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Count:</span>
                  <span className="text-2xl font-bold text-church-primary">
                    {Object.values(attendanceData).reduce((sum, count) => sum + count, 0)}
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleSubmitAttendance}
                className="w-full bg-gradient-to-r from-church-primary to-church-accent hover:from-church-primary/90 hover:to-church-accent/90"
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