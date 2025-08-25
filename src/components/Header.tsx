import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Church, Menu, Users, BarChart3, Calendar, Info } from "lucide-react";

const Header = () => {
  const menuItems = [
    { title: "Service Attendance", href: "/attendance", icon: Users },
    { title: "Leader Dashboard", href: "/dashboard", icon: BarChart3 },  
    { title: "Schedule", href: "/schedule", icon: Calendar },
    { title: "About", href: "/about", icon: Info }
  ];

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-church-primary to-church-secondary rounded-lg">
              <Church className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent">
                CACJIGM
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Church Attendance System</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = item.href}
                  className="text-sm"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Button>
              ))}
            </nav>

            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Church className="h-5 w-5 text-church-primary" />
                    CACJIGM Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {menuItems.map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => window.location.href = item.href}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;