import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, TrendingUp, Calendar, Download, BarChart3 } from "lucide-react";

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-week');

  // Mock data - in real app, this would come from backend
  const mockData = {
    totalAttendance: 2456,
    weeklyGrowth: 12.5,
    servicesCount: 8,
    ministryBreakdown: {
      'Main Church': 1200,
      'Teens Church': 450,
      'Children Church': 600,
      'Car Park': 45,
      'Bible Study': 161
    },
    recentServices: [
      { service: 'First Service', date: '2024-08-18', total: 567, ministry: 'Main Church' },
      { service: 'Second Service', date: '2024-08-18', total: 489, ministry: 'Main Church' },
      { service: 'Teens Church', date: '2024-08-18', total: 145, ministry: 'Teens Church' },
      { service: 'Fire Night', date: '2024-08-16', total: 678, ministry: 'All' },
    ],
    userReports: [
      { name: 'John Usher', section: 'Section A', submissions: 5 },
      { name: 'Mary Teacher', section: 'Section B', submissions: 3 },
      { name: 'David Counter', section: 'Section C', submissions: 4 },
    ]
  };

  const totalMinistryAttendance = Object.values(mockData.ministryBreakdown).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <BarChart3 className="h-5 w-5 text-church-primary" />
                <span className="font-medium">Leader Dashboard</span>
              </div>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-church-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Attendance
                </CardTitle>
                <Users className="h-4 w-4 text-church-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-church-primary">
                {mockData.totalAttendance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all services
              </p>
            </CardContent>
          </Card>

          <Card className="border-church-secondary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Weekly Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-church-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-church-secondary">
                +{mockData.weeklyGrowth}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Compared to last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-church-accent/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Services Held
                </CardTitle>
                <Calendar className="h-4 w-4 text-church-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-church-accent">
                {mockData.servicesCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This week
              </p>
            </CardContent>
          </Card>

          <Card className="border-church-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average per Service
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-church-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-church-primary">
                {Math.round(mockData.totalAttendance / mockData.servicesCount)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                People per service
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ministry Breakdown */}
          <Card className="border-church-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-church-primary" />
                Ministry Breakdown
              </CardTitle>
              <CardDescription>Attendance by ministry area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockData.ministryBreakdown).map(([ministry, count]) => {
                  const percentage = (count / totalMinistryAttendance) * 100;
                  return (
                    <div key={ministry} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{ministry}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-church-primary to-church-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Services */}
          <Card className="border-church-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-church-secondary" />
                Recent Services
              </CardTitle>
              <CardDescription>Latest attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{service.service}</p>
                      <p className="text-sm text-muted-foreground">{service.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-church-primary">{service.total}</p>
                      <p className="text-xs text-muted-foreground">{service.ministry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Reports */}
          <Card className="border-church-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-church-accent" />
                User Activity
              </CardTitle>
              <CardDescription>Staff submission reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.userReports.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.section}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-church-accent">{user.submissions}</p>
                      <p className="text-xs text-muted-foreground">submissions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="border-church-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-church-primary" />
                Export Reports
              </CardTitle>
              <CardDescription>Download attendance data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export as Excel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Weekly Summary Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;