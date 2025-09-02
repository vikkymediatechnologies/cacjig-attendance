import { useEffect, useState } from "react";
import { Church } from "lucide-react";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);
  
  const churchText = "CACJIGM";
  const subtitleText = "Attendance System";

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500); // Logo appears
    const timer2 = setTimeout(() => setStage(2), 1200); // Text starts appearing
    const timer3 = setTimeout(() => setStage(3), 2800); // Complete
    const timer4 = setTimeout(() => onComplete(), 3500); // Finish

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-church-bg-light via-white to-church-primary/5 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-church-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-church-secondary rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-church-accent rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex items-center justify-center">
        {/* Logo Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Logo Background Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br from-church-primary/20 to-church-secondary/20 rounded-full transition-all duration-1000 ${
            stage >= 1 ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
          }`} />
          
          {/* Main Logo */}
          <div className={`relative z-10 w-20 h-20 bg-gradient-to-br from-church-primary via-church-secondary to-church-accent rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-800 ${
            stage >= 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
          }`}>
            <Church className="w-10 h-10 text-white" />
          </div>

          {/* Animated Text Circle */}
          <div className="absolute inset-0 w-32 h-32">
            {churchText.split('').map((char, index) => {
              const angle = (index / churchText.length) * 360 - 90; // Start from top
              const radius = 45; // Distance from center
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={`main-${index}`}
                  className={`absolute text-2xl font-bold text-church-primary transition-all duration-500 ${
                    stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    transitionDelay: `${800 + index * 100}ms`
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>

          {/* Subtitle Text Circle */}
          <div className="absolute inset-0 w-40 h-40">
            {subtitleText.split('').map((char, index) => {
              const totalChars = subtitleText.length;
              const angle = (index / totalChars) * 360 - 90;
              const radius = 65; // Larger radius for subtitle
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return char === ' ' ? null : (
                <div
                  key={`sub-${index}`}
                  className={`absolute text-sm font-medium text-church-secondary transition-all duration-500 ${
                    stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    transitionDelay: `${1200 + index * 80}ms`
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>

          {/* Completion Effect */}
          {stage >= 3 && (
            <div className="absolute inset-0 w-64 h-64 border-2 border-church-primary/20 rounded-full animate-ping" />
          )}
        </div>
      </div>

      {/* Loading Progress */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-church-primary/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-church-primary to-church-secondary transition-all duration-3000 ease-out"
            style={{ 
              width: stage >= 3 ? '100%' : stage >= 2 ? '70%' : stage >= 1 ? '30%' : '0%' 
            }}
          />
        </div>
        <p className="text-center text-sm text-church-primary/70 mt-3 font-medium">
          {stage >= 3 ? 'Welcome!' : stage >= 2 ? 'Setting up...' : stage >= 1 ? 'Loading...' : 'Initializing...'}
        </p>
      </div>
    </div>
  );
};

export default Loader;