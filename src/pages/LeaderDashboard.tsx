import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { 
  Building2, 
  Users, 
  UserPlus, 
  Shield, 
  Plus, 
  Edit, 
  Trash2,
  Settings,
  Key,
  Activity
} from "lucide-react";

interface Ministry {
  id: string;
  name: string;
  description: string;
  sections: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
}

interface Usher {
  id: string;
  name: string;
  pin: string;
  is_active: boolean;
  ministry: { name: string };
  role: { name: string };
}

const LeaderDashboard = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [ushers, setUshers] = useState<Usher[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newMinistry, setNewMinistry] = useState({ name: '', description: '', sections: '' });
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [newUsher, setNewUsher] = useState({ name: '', pin: '', ministryId: '', roleId: '' });

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ministriesRes, rolesRes, ushersRes] = await Promise.all([
        supabase.from('ministries').select('*'),
        supabase.from('roles').select('*'),
        supabase.from('ushers').select(`
          *,
          ministry:ministries(name),
          role:roles(name)
        `)
      ]);

      if (ministriesRes.data) setMinistries(ministriesRes.data);
      if (rolesRes.data) setRoles(rolesRes.data);
      if (ushersRes.data) setUshers(ushersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createMinistry = async () => {
    if (!newMinistry.name) {
      toast({
        title: "Name required",
        description: "Please enter a ministry name",
        variant: "destructive"
      });
      return;
    }

    try {
      const sections = newMinistry.sections ? newMinistry.sections.split(',').map(s => s.trim()) : [];
      const { error } = await supabase
        .from('ministries')
        .insert({
          name: newMinistry.name,
          description: newMinistry.description,
          sections
        });

      if (error) throw error;

      toast({
        title: "Ministry Created",
        description: `${newMinistry.name} has been added successfully`
      });

      setNewMinistry({ name: '', description: '', sections: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating ministry:', error);
      toast({
        title: "Error",
        description: "Failed to create ministry",
        variant: "destructive"
      });
    }
  };

  const createRole = async () => {
    if (!newRole.name) {
      toast({
        title: "Name required",
        description: "Please enter a role name",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('roles')
        .insert(newRole);

      if (error) throw error;

      toast({
        title: "Role Created",
        description: `${newRole.name} role has been added successfully`
      });

      setNewRole({ name: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating role:', error);
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive"
      });
    }
  };

  const createUsher = async () => {
    if (!newUsher.name || !newUsher.pin || !newUsher.ministryId || !newUsher.roleId) {
      toast({
        title: "All fields required",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (newUsher.pin.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be at least 4 characters",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('ushers')
        .insert({
          name: newUsher.name,
          pin: newUsher.pin,
          ministry_id: newUsher.ministryId,
          role_id: newUsher.roleId
        });

      if (error) throw error;

      toast({
        title: "Usher Created",
        description: `${newUsher.name} has been added successfully with PIN: ${newUsher.pin}`
      });

      setNewUsher({ name: '', pin: '', ministryId: '', roleId: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating usher:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create usher",
        variant: "destructive"
      });
    }
  };

  const toggleUsherStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('ushers')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Usher ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });

      fetchData();
    } catch (error) {
      console.error('Error updating usher status:', error);
      toast({
        title: "Error",
        description: "Failed to update usher status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-bg-light to-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex p-3 bg-gradient-to-br from-church-primary to-church-secondary rounded-2xl mb-4">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Leader Dashboard</h1>
          <p className="text-muted-foreground">Manage ministries, roles, and ushers</p>
        </div>

        <Tabs defaultValue="overview" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ministries">Ministries</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="ushers">Ushers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Ministries</CardTitle>
                  <Building2 className="h-4 w-4 text-church-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-church-primary">{ministries.length}</div>
                </CardContent>
              </Card>
              <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                  <Shield className="h-4 w-4 text-church-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-church-secondary">{roles.length}</div>
                </CardContent>
              </Card>
              <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Ushers</CardTitle>
                  <Users className="h-4 w-4 text-church-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-church-accent">
                    {ushers.filter(u => u.is_active).length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ministries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Ministry Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-church-primary to-church-secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ministry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Ministry</DialogTitle>
                    <DialogDescription>Add a new ministry area to the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ministry-name">Ministry Name</Label>
                      <Input
                        id="ministry-name"
                        placeholder="e.g., Youth Ministry"
                        value={newMinistry.name}
                        onChange={(e) => setNewMinistry(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ministry-desc">Description</Label>
                      <Input
                        id="ministry-desc"
                        placeholder="Brief description"
                        value={newMinistry.description}
                        onChange={(e) => setNewMinistry(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ministry-sections">Sections (comma-separated)</Label>
                      <Input
                        id="ministry-sections"
                        placeholder="e.g., Section A, Section B"
                        value={newMinistry.sections}
                        onChange={(e) => setNewMinistry(prev => ({ ...prev, sections: e.target.value }))}
                      />
                    </div>
                    <Button onClick={createMinistry} className="w-full">
                      Create Ministry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ministries.map((ministry, index) => (
                <Card key={ministry.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-church-primary" />
                      {ministry.name}
                    </CardTitle>
                    <CardDescription>{ministry.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {ministry.sections.map((section, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Role Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-church-secondary to-church-accent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>Add a new role for church members</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input
                        id="role-name"
                        placeholder="e.g., Coordinator"
                        value={newRole.name}
                        onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role-desc">Description</Label>
                      <Input
                        id="role-desc"
                        placeholder="Role responsibilities"
                        value={newRole.description}
                        onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <Button onClick={createRole} className="w-full">
                      Create Role
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role, index) => (
                <Card key={role.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-church-secondary" />
                      {role.name}
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ushers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Usher Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-church-accent to-church-primary">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Usher
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Usher</DialogTitle>
                    <DialogDescription>Add a new usher with PIN access</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="usher-name">Full Name</Label>
                      <Input
                        id="usher-name"
                        placeholder="Enter full name"
                        value={newUsher.name}
                        onChange={(e) => setNewUsher(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="usher-pin">PIN (4-6 digits)</Label>
                      <Input
                        id="usher-pin"
                        type="password"
                        placeholder="Enter PIN"
                        maxLength={6}
                        value={newUsher.pin}
                        onChange={(e) => setNewUsher(prev => ({ ...prev, pin: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="usher-ministry">Ministry</Label>
                      <Select value={newUsher.ministryId} onValueChange={(value) => setNewUsher(prev => ({ ...prev, ministryId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ministry" />
                        </SelectTrigger>
                        <SelectContent>
                          {ministries.map((ministry) => (
                            <SelectItem key={ministry.id} value={ministry.id}>
                              {ministry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="usher-role">Role</Label>
                      <Select value={newUsher.roleId} onValueChange={(value) => setNewUsher(prev => ({ ...prev, roleId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={createUsher} className="w-full">
                      Create Usher
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {ushers.map((usher, index) => (
                <Card key={usher.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-church-accent" />
                          {usher.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Key className="h-3 w-3" />
                            PIN: {usher.pin}
                          </span>
                          <span>{usher.ministry.name}</span>
                          <span>{usher.role.name}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={usher.is_active ? "default" : "secondary"}>
                          {usher.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleUsherStatus(usher.id, usher.is_active)}
                        >
                          <Activity className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LeaderDashboard;