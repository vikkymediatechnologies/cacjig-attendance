import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, TrendingUp, Calendar, Download, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-week');
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<{
    totalAttendance: number;
    weeklyGrowth: number;
    servicesCount: number;
    averagePerService: number;
    ministryBreakdown: Record<string, number>;
    recentServices: Array<{
      service: string;
      date: string;
      total: number;
      ministry: string;
    }>;
    userReports: Array<{
      name: string;
      section: string;
      submissions: number;
    }>;
  }>({
    totalAttendance: 0,
    weeklyGrowth: 0,
    servicesCount: 0,
    averagePerService: 0,
    ministryBreakdown: {},
    recentServices: [],
    userReports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Calculate date range based on selected period
      const now = new Date();
      let startDate = new Date();
      
      switch (selectedPeriod) {
        case "today":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "this-week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "this-month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "this-year":
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      // Fetch attendance records
      const { data: records, error } = await supabase
        .from('attendance_records')
        .select('*')
        .gte('service_date', startDate.toISOString().split('T')[0])
        .order('service_date', { ascending: false });

      if (error) throw error;

      // Process data for dashboard
      const totalAttendance = records?.reduce((sum, record) => sum + record.count, 0) || 0;
      const servicesCount = new Set(records?.map(r => `${r.service}-${r.service_date}`)).size || 0;
      const averagePerService = servicesCount > 0 ? Math.round(totalAttendance / servicesCount) : 0;

      // Ministry breakdown
      const ministryMap: Record<string, number> = {};
      records?.forEach(record => {
        if (!ministryMap[record.ministry_area]) {
          ministryMap[record.ministry_area] = 0;
        }
        ministryMap[record.ministry_area] += record.count;
      });

      // Recent services
      const serviceMap: Record<string, { service: string; date: string; total: number; ministry: string }> = {};
      records?.forEach(record => {
        const key = `${record.service}-${record.service_date}`;
        if (!serviceMap[key]) {
          serviceMap[key] = {
            service: record.service,
            date: record.service_date,
            total: 0,
            ministry: record.ministry_area
          };
        }
        serviceMap[key].total += record.count;
      });

      const recentServices = Object.values(serviceMap).slice(0, 5);

      // User reports
      const userMap: Record<string, { name: string; section: string; submissions: number }> = {};
      records?.forEach(record => {
        if (!userMap[record.user_on_duty]) {
          userMap[record.user_on_duty] = {
            name: record.user_on_duty,
            section: record.section,
            submissions: 0
          };
        }
        userMap[record.user_on_duty].submissions += 1;
      });

      const userReports = Object.values(userMap).slice(0, 4);

      setDashboardData({
        totalAttendance,
        weeklyGrowth: 0, // Calculate based on comparison with previous period
        servicesCount,
        averagePerService,
        ministryBreakdown: ministryMap,
        recentServices,
        userReports
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalMinistryAttendance = Object.values(dashboardData.ministryBreakdown).reduce((sum, count) => sum + count, 0);

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
                {loading ? "..." : dashboardData.totalAttendance.toLocaleString()}
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
                +{dashboardData.weeklyGrowth}%
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
                {loading ? "..." : dashboardData.servicesCount}
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
                {loading ? "..." : dashboardData.averagePerService}
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
                {loading ? (
                  <div>Loading...</div>
                ) : Object.keys(dashboardData.ministryBreakdown).length > 0 ? (
                  Object.entries(dashboardData.ministryBreakdown).map(([ministry, count]) => {
                    const percentage = totalMinistryAttendance > 0 ? (count / totalMinistryAttendance) * 100 : 0;
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
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">No data available</p>
                )}
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
                {loading ? (
                  <div>Loading...</div>
                ) : dashboardData.recentServices.length > 0 ? (
                  dashboardData.recentServices.map((service, index) => (
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
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent services</p>
                )}
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
                {loading ? (
                  <div>Loading...</div>
                ) : dashboardData.userReports.length > 0 ? (
                  dashboardData.userReports.map((user, index) => (
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
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No user activity</p>
                )}
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
              <CardDescription>Download attendance data in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start hover:bg-church-primary/5"
                onClick={async () => {
                  try {
                    const { data: records } = await supabase
                      .from('attendance_records')
                      .select('*')
                      .order('service_date', { ascending: false });
                    
                    const csvHeader = "Service,Date,Ministry,Section,Category,Count,User\n";
                    const csvData = records?.map(record => 
                      `${record.service},${record.service_date},${record.ministry_area},${record.section},${record.category},${record.count},${record.user_on_duty}`
                    ).join('\n') || '';
                    
                    const blob = new Blob([csvHeader + csvData], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'attendance_export.csv';
                    a.click();
                  } catch (error) {
                    toast({
                      title: "Export Failed",
                      description: "Failed to export data",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export as Excel (.csv)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start hover:bg-church-secondary/5"
                onClick={async () => {
                  try {
                    const { data: records } = await supabase
                      .from('attendance_records')
                      .select('*')
                      .order('service_date', { ascending: false });
                    
                    const jsonData = JSON.stringify(records, null, 2);
                    const blob = new Blob([jsonData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'attendance_report.json';
                    a.click();
                  } catch (error) {
                    toast({
                      title: "Export Failed",
                      description: "Failed to export data",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export as JSON
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start hover:bg-church-accent/5"
                onClick={() => {
                  window.print();
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Print PDF Report
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start hover:bg-church-primary/5"
                onClick={() => {
                  const summaryData = `CACJIGM Weekly Summary\n\nTotal Attendance: ${dashboardData.totalAttendance}\nWeekly Growth: ${dashboardData.weeklyGrowth}%\nServices Held: ${dashboardData.servicesCount}\n\nMinistry Breakdown:\n${Object.entries(dashboardData.ministryBreakdown).map(([ministry, count]) => `${ministry}: ${count}`).join('\n')}`;
                  const blob = new Blob([summaryData], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.download = 'weekly_summary.txt';
                  a.click();
                }}
              >
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