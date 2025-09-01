import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Church, Menu, Users, BarChart3, Calendar, Info, ChevronDown } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { title: "Service Attendance", href: "/attendance", icon: Users },
    { title: "Leader Dashboard", href: "/dashboard", icon: BarChart3 },  
    { title: "Schedule", href: "/schedule", icon: Calendar },
    { title: "About", href: "/about", icon: Info }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-church-primary/10 shadow-2xl' 
        : 'bg-white/80 backdrop-blur-sm border-b border-white/20'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-church-primary to-church-secondary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative p-3 bg-gradient-to-br from-church-primary via-church-secondary to-church-accent rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Church className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-church-primary via-church-secondary to-church-accent bg-clip-text text-transparent">
                CACJIGM
              </h1>
              <p className="text-sm text-church-primary/70 font-medium hidden sm:block">
                Attendance System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {menuItems.map((item, index) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  size="lg"
                  onClick={() => window.location.href = item.href}
                  className="group relative text-base font-medium px-6 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-church-primary/10 hover:to-church-secondary/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-church-primary group-hover:text-church-secondary transition-colors duration-300" />
                    <span className="text-church-primary group-hover:text-church-secondary transition-colors duration-300">
                      {item.title}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-church-primary to-church-secondary group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                </Button>
              ))}
            </nav>

            {/* CTA Button */}
            <Button 
              className="hidden md:flex bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white px-8 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = "/attendance"}
            >
              Take Attendance
            </Button>

            {/* Enhanced Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="lg:hidden p-3 rounded-2xl hover:bg-church-primary/10 transition-all duration-300 group"
                >
                  <Menu className="h-6 w-6 text-church-primary group-hover:text-church-secondary transition-colors duration-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-br from-white to-church-bg-light border-l border-church-primary/20">
                <SheetHeader className="pb-8">
                  <SheetTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-church-primary to-church-secondary rounded-xl">
                      <Church className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-church-primary to-church-secondary bg-clip-text text-transparent font-bold">
                      CACJIGM Menu
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-3">
                  {menuItems.map((item, index) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      size="lg"
                      className="justify-start text-left p-4 rounded-2xl hover:bg-gradient-to-r hover:from-church-primary/10 hover:to-church-secondary/10 transition-all duration-300 group"
                      onClick={() => window.location.href = item.href}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <item.icon className="h-5 w-5 mr-4 text-church-primary group-hover:text-church-secondary transition-colors duration-300" />
                      <span className="text-base font-medium text-church-primary group-hover:text-church-secondary transition-colors duration-300">
                        {item.title}
                      </span>
                    </Button>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-church-primary/20">
                    <Button 
                      className="w-full bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300"
                      onClick={() => window.location.href = "/attendance"}
                    >
                      Take Attendance Now
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