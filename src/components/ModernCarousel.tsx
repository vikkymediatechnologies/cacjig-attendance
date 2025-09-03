import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, UserPlus, Church } from "lucide-react";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  bgGradient: string;
}

interface ModernCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  onCTAClick?: (slideId: number) => void;
  onRegisterClick?: () => void;
}

const ModernCarousel = ({ 
  slides, 
  autoPlayInterval = 6000,
  onCTAClick,
  onRegisterClick 
}: ModernCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isPaused, autoPlayInterval]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
          const isNext = index === (currentSlide + 1) % slides.length;
          
          let transformClass = "translate-x-full opacity-0 scale-95";
          if (isActive) {
            transformClass = "translate-x-0 opacity-100 scale-100";
          } else if (isPrev) {
            transformClass = "-translate-x-full opacity-0 scale-95";
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-[800ms] ease-in-out ${transformClass}`}
            >
              {/* Dynamic Background */}
              <div className={`absolute inset-0 ${slide.bgGradient} opacity-10`} />
              
              {/* Animated Background Elements */}
              <div className="absolute top-20 left-10 animate-float opacity-30">
                <Church className="h-12 w-12 text-white" />
              </div>
              <div className="absolute top-40 right-20 animate-float opacity-20" style={{ animationDelay: '2s' }}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-church-accent/30 to-church-secondary/30" />
              </div>
              <div className="absolute bottom-40 left-20 animate-pulse-slow opacity-25">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-church-primary/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                {/* Church Icon with Enhanced Animation */}
                <div className="mb-12 animate-scale-in">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-church-primary to-church-secondary rounded-full blur-2xl opacity-40 animate-pulse-slow" />
                    <div className="relative p-8 bg-gradient-to-br from-church-primary/20 via-church-secondary/20 to-church-accent/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-2xl">
                      <Church className="h-20 w-20 text-white" />
                    </div>
                  </div>
                </div>

                {/* Title with Staggered Animation */}
                <div className="mb-6">
                  <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${isActive ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                    {slide.title}
                  </h1>
                  <h2 className={`text-lg md:text-xl lg:text-2xl font-semibold text-white/90 transition-all duration-1000 delay-200 ${isActive ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                    {slide.subtitle}
                  </h2>
                </div>

                {/* Description */}
                <p className={`text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isActive ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
                  {slide.description}
                </p>
                
                {/* Enhanced Action Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${isActive ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}>
                  <Button 
                    size="default"
                    className="group bg-gradient-to-r from-church-primary to-church-secondary hover:from-church-primary/90 hover:to-church-secondary/90 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                    onClick={() => onCTAClick?.(slide.id)}
                  >
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    {slide.cta}
                  </Button>
                  
                  <Button 
                    size="default"
                    variant="outline"
                    className="group bg-white/10 backdrop-blur-xl border border-white/40 hover:bg-white/20 hover:border-white/60 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                    onClick={onRegisterClick}
                  >
                    <UserPlus className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl group"
      >
        <ChevronLeft className="h-8 w-8 text-white group-hover:scale-125 transition-transform duration-300" />
      </Button>
      
      <Button
        variant="ghost"
        size="lg"
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl group"
      >
        <ChevronRight className="h-8 w-8 text-white group-hover:scale-125 transition-transform duration-300" />
      </Button>

      {/* Enhanced Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative group transition-all duration-500 ${
              index === currentSlide 
                ? 'w-12 h-4' 
                : 'w-4 h-4 hover:w-6'
            }`}
          >
            <div className={`w-full h-full rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-church-primary via-church-secondary to-church-accent shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`} />
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-church-primary via-church-secondary to-church-accent rounded-full animate-pulse opacity-50" />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-church-primary via-church-secondary to-church-accent transition-all ease-linear"
          style={{ 
            width: isPaused ? 'auto' : '100%',
            transitionDuration: isPaused ? '0ms' : `${autoPlayInterval}ms`,
            animation: isPaused ? 'none' : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default ModernCarousel;