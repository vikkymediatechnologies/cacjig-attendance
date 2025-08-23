import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";

const SchedulePage = () => {
  const weeklySchedule = [
    {
      day: "Sunday",
      programs: [
        { name: "Marathon Service", time: "6:00 AM - 8:00 AM", location: "Main Auditorium", ministry: "All" },
        { name: "First Service", time: "8:30 AM - 10:30 AM", location: "Main Auditorium", ministry: "Main Church" },
        { name: "Second Service", time: "11:00 AM - 1:00 PM", location: "Main Auditorium", ministry: "Main Church" },
        { name: "Teens Church", time: "11:00 AM - 12:30 PM", location: "Teen Center", ministry: "Teens" },
        { name: "Children Church", time: "11:00 AM - 12:00 PM", location: "Children Hall", ministry: "Children" }
      ]
    },
    {
      day: "Monday", 
      programs: [
        { name: "Take Charge of the Week", time: "6:00 PM - 8:00 PM", location: "Main Auditorium", ministry: "All" }
      ]
    },
    {
      day: "Wednesday",
      programs: [
        { name: "Agbara Mountain Program", time: "6:00 PM - 8:00 PM", location: "Main Auditorium", ministry: "All" }
      ]
    },
    {
      day: "Thursday",
      programs: [
        { name: "Dining with the King (Bible Study)", time: "6:00 PM - 8:00 PM", location: "Various Locations", ministry: "All" }
      ]
    },
    {
      day: "Friday",
      programs: [
        { name: "Holy Ghost Fire Night", time: "6:00 PM - 10:00 PM", location: "Main Auditorium", ministry: "All", note: "3rd Friday monthly" }
      ]
    },
    {
      day: "Saturday",
      programs: [
        { name: "Arogungbogunmi", time: "6:00 PM - 9:00 PM", location: "Main Auditorium", ministry: "All", note: "2nd Saturday monthly" },
        { name: "Bible Club (Youth)", time: "4:00 PM - 6:00 PM", location: "Youth Center", ministry: "Youth" },
        { name: "Bible Club (Children)", time: "4:00 PM - 5:30 PM", location: "Children Hall", ministry: "Children" }
      ]
    }
  ];

  const getMinistryColor = (ministry: string) => {
    const colors = {
      "All": "from-church-primary to-church-secondary",
      "Main Church": "from-church-primary to-church-primary/80",
      "Teens": "from-church-secondary to-church-secondary/80", 
      "Children": "from-church-accent to-church-accent/80",
      "Youth": "from-church-secondary to-church-accent"
    };
    return colors[ministry as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

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
              <Calendar className="h-5 w-5 text-church-primary" />
              <span className="font-medium">Programs Schedule</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-church-text-light mb-2">
            CACJIGM Weekly Schedule
          </h1>
          <p className="text-muted-foreground">
            Complete program schedule for Christ Apostolic Church Jesus Is God Ministry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {weeklySchedule.map((daySchedule, dayIndex) => (
            <Card key={dayIndex} className="border-church-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-church-primary">
                  <Calendar className="h-5 w-5" />
                  {daySchedule.day}
                </CardTitle>
                <CardDescription>
                  {daySchedule.programs.length} program{daySchedule.programs.length !== 1 ? 's' : ''} scheduled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {daySchedule.programs.map((program, programIndex) => (
                  <div 
                    key={programIndex}
                    className="p-4 rounded-lg border border-church-primary/10 bg-gradient-to-r from-church-bg-light/50 to-background/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-church-text-light">{program.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs text-white bg-gradient-to-r ${getMinistryColor(program.ministry)}`}>
                        {program.ministry}
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {program.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {program.location}
                      </div>
                      {program.note && (
                        <div className="flex items-center gap-2 text-church-secondary">
                          <Users className="h-4 w-4" />
                          {program.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ministry Areas Legend */}
        <Card className="mt-8 border-church-primary/20">
          <CardHeader>
            <CardTitle className="text-church-primary">Ministry Areas</CardTitle>
            <CardDescription>Understanding our different ministry areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Main Church", description: "Adult congregation in main auditorium", sections: "Havilah, Sub-Havilah, Zion, Sub-Zion" },
                { name: "Teens Church", description: "Teenage members aged 13-19", sections: "Male Teachers, Female Teachers, Teens" },
                { name: "Children Church", description: "Children aged 3-12", sections: "Male Teachers, Female Teachers, Children" },
                { name: "Support Ministry", description: "Car park and logistics", sections: "Car Park Workers, Security" }
              ].map((ministry, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-church-primary mb-2">{ministry.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{ministry.description}</p>
                  <p className="text-xs text-church-secondary">{ministry.sections}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SchedulePage;