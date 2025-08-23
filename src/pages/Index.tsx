import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Users, BarChart3, Calendar, Info, Church, Shield, CheckCircle } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
      href: "/login",
      gradient: "from-church-primary to-church-secondary"
    },
    {
      title: "Leader Dashboard",
      description: "View reports and analytics",
      icon: BarChart3,
      href: "/dashboard",
      gradient: "from-church-secondary to-church-accent"
    },
    {
      title: "Programs Schedule",
      description: "View weekly program schedule",
      icon: Calendar,
      href: "/schedule",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-church-primary to-church-secondary rounded-lg">
              <Church className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                CACJIGM
              </h1>
              <p className="text-muted-foreground">Church Attendance Management System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-church-text-light mb-4">
            Welcome to CACJIGM
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamlined attendance management for Christ Apostolic Church Jesus Is God Ministry. 
            Track attendance across all services and ministry areas with precision and ease.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white px-8 py-3 text-lg"
            onClick={() => window.location.href = '/login'}
          >
            Enter Attendance System
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* System Flow */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-church-text-light">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {flowSteps.map((step, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all duration-300 cursor-pointer ${
                  index === currentStep 
                    ? 'border-church-primary shadow-lg scale-105' 
                    : 'border-border hover:border-church-secondary'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
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
        <section>
          <h3 className="text-2xl font-bold text-center mb-8 text-church-text-light">
            Quick Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationCards.map((card, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 overflow-hidden"
                onClick={() => window.location.href = card.href}
              >
                <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-church-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-church-primary group-hover:translate-x-1 transition-transform">
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

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
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