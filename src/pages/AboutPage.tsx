import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Church, Shield, Users, BarChart3, Calendar, CheckCircle } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: "PIN Authentication",
      description: "Secure access with unique PIN codes for each staff member, ensuring data integrity and accountability."
    },
    {
      icon: Users,
      title: "Multi-Ministry Support",
      description: "Comprehensive tracking across Main Church, Teens, Children, Car Park, and special programs."
    },
    {
      icon: BarChart3,
      title: "Section-Based Counting", 
      description: "Prevents duplication by assigning specific sections to each counter, ensuring accurate totals."
    },
    {
      icon: Calendar,
      title: "Dynamic Scheduling",
      description: "Handles regular services and special programs including Fire Night and Arogungbogunmi."
    },
    {
      icon: CheckCircle,
      title: "Real-Time Reporting",
      description: "Instant dashboard updates with attendance trends, ministry breakdowns, and user activity."
    },
    {
      icon: Church,
      title: "Church-Specific Design",
      description: "Built specifically for CACJIGM with understanding of church structure and needs."
    }
  ];

  const ministryStructure = [
    {
      name: "Main Church",
      description: "Adult congregation divided into geographical sections",
      sections: ["Havilah", "Sub-Havilah", "Zion", "Sub-Zion"],
      color: "church-primary"
    },
    {
      name: "Teens Church", 
      description: "Youth ministry for ages 13-19 with dedicated teachers",
      sections: ["Male Teachers", "Female Teachers", "Teens"],
      color: "church-secondary"
    },
    {
      name: "Children Church",
      description: "Children's ministry for ages 3-12 with trained staff",
      sections: ["Male Teachers", "Female Teachers", "Children"],
      color: "church-accent"
    },
    {
      name: "Support Ministries",
      description: "Essential support services for smooth operations",
      sections: ["Car Park Workers", "Security", "Ushers"],
      color: "church-primary"
    }
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
              <Church className="h-5 w-5 text-church-primary" />
              <span className="font-medium">About CACJIGM</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-church-primary to-church-secondary rounded-full flex items-center justify-center mb-6">
            <Church className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-church-text-light mb-4">
            About CACJIGM System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Church Attendance Management System for Christ Apostolic Church Jesus Is God Ministry 
            is designed to provide accurate, secure, and comprehensive attendance tracking across all 
            ministry areas and services.
          </p>
        </section>

        {/* Mission Statement */}
        <Card className="mb-12 border-church-primary/20 bg-gradient-to-r from-church-bg-light/50 to-background/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-church-primary">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              To provide CACJIGM leadership with accurate, real-time attendance data that helps in 
              strategic planning, resource allocation, and understanding congregation growth patterns. 
              Our system ensures accountability, prevents data duplication, and maintains the highest 
              standards of data integrity for informed decision-making.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-church-text-light mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-church-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-church-primary to-church-secondary rounded-lg flex items-center justify-center mb-3">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-church-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ministry Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-church-text-light mb-8">
            Ministry Structure
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ministryStructure.map((ministry, index) => (
              <Card key={index} className="border-church-primary/20">
                <CardHeader>
                  <CardTitle className={`text-${ministry.color}`}>{ministry.name}</CardTitle>
                  <CardDescription>{ministry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Sections:</p>
                    <div className="flex flex-wrap gap-2">
                      {ministry.sections.map((section, sIndex) => (
                        <span 
                          key={sIndex}
                          className={`px-3 py-1 bg-${ministry.color}/10 text-${ministry.color} rounded-full text-sm`}
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-church-text-light mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "PIN Authentication", desc: "Staff login with unique PIN" },
              { step: 2, title: "Service Selection", desc: "Choose date and service type" },
              { step: 3, title: "Ministry & Section", desc: "Select ministry area and section" },
              { step: 4, title: "Enter Counts", desc: "Record attendance numbers" },
              { step: 5, title: "Real-time Dashboard", desc: "View reports and analytics" }
            ].map((item, index) => (
              <Card key={index} className="text-center border-church-primary/20">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-church-primary to-church-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-church-text-light">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <Card className="border-church-primary/20 bg-gradient-to-r from-church-bg-light/50 to-background/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-church-primary">Benefits</CardTitle>
            <CardDescription>Why choose CACJIGM Attendance System</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-church-text-light">For Leadership:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-primary" />
                    Real-time attendance insights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-primary" />
                    Growth trend analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-primary" />
                    Ministry performance tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-primary" />
                    Exportable reports
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-church-text-light">For Staff:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-secondary" />
                    Simple, intuitive interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-secondary" />
                    Quick data entry process
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-secondary" />
                    Secure authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-church-secondary" />
                    Mobile-friendly design
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutPage;