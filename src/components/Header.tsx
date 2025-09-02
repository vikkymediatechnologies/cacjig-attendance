import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Church, Menu, Users, BarChart3, Calendar, Info } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { title: "Attendance", href: "/attendance", icon: Users },
    { title: "Dashboard", href: "/dashboard", icon: BarChart3 },  
    { title: "Schedule", href: "/schedule", icon: Calendar },
    { title: "About", href: "/about", icon: Info }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-xl border-b border-church-primary/20 shadow-lg' 
        : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.location.href = "/"}>
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Church className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-church-primary">
                CACJIGM
              </h1>
              <p className="text-xs text-church-primary/70 font-medium">
                Attendance System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = item.href}
                  className="group relative px-3 py-2 text-sm font-medium text-church-primary hover:text-church-secondary hover:bg-church-primary/5 transition-all duration-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                </Button>
              ))}
            </nav>

            {/* CTA Button */}
            <Button 
              size="sm"
              className="hidden md:flex bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 rounded-lg"
              onClick={() => window.location.href = "/attendance"}
            >
              Take Attendance
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden p-2 text-church-primary hover:text-church-secondary hover:bg-church-primary/5 transition-all duration-200 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white border-l border-church-primary/10">
                <SheetHeader className="pb-6 border-b border-church-primary/10">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-gradient-to-br from-church-primary to-church-secondary rounded-lg">
                      <Church className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-church-primary font-bold">
                      CACJIGM
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {menuItems.map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-left p-3 text-church-primary hover:text-church-secondary hover:bg-church-primary/5 transition-all duration-200 rounded-lg"
                      onClick={() => window.location.href = item.href}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </Button>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-church-primary/10">
                    <Button 
                      className="w-full bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white py-2.5 text-sm font-medium shadow-md transition-all duration-200 rounded-lg"
                      onClick={() => window.location.href = "/attendance"}
                    >
                      Take Attendance
                    </Button>
                  </div>
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