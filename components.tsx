import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { ArrowDown, Globe2 } from 'lucide-react';
import { useInView, animate } from 'framer-motion';
import { cn, scrollToSection } from './utils';

// --- Phone Input ---
export interface PhoneValue {
  country: string;
  dialCode: string;
  number: string;
}

interface PhoneInputProps {
  value: string; // Simplified to string for consistency with PhoneInputSimple
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const countries = [
  { code: "US", name: "Estados Unidos", dial: "+1" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "MX", name: "México", dial: "+52" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "PE", name: "Perú", dial: "+51" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "PA", name: "Panamá", dial: "+507" },
  { code: "DO", name: "Rep. Dominicana", dial: "+1" },
  { code: "ES", name: "España", dial: "+34" }
];

export const PhoneInput = ({
  value = "",
  onChange,
  label = "Teléfono / WhatsApp",
  error,
  required = false,
  className
}: PhoneInputProps) => {
  const [dialCode, setDialCode] = useState("+1");
  const [localNumber, setLocalNumber] = useState("");

  useEffect(() => {
    if (value && value !== `${dialCode}${localNumber}`) {
      const matchedCountry = countries
        .sort((a, b) => b.dial.length - a.dial.length)
        .find(c => value.startsWith(c.dial));

      if (matchedCountry) {
        setDialCode(matchedCountry.dial);
        setLocalNumber(value.slice(matchedCountry.dial.length));
      } else {
        if (value.startsWith("+")) {
           setLocalNumber(value.replace(/^\+/, '')); 
        } else {
           setLocalNumber(value);
        }
      }
    }
  }, [value]);

  const handleDialChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDial = e.target.value;
    setDialCode(newDial);
    triggerChange(newDial, localNumber);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    setLocalNumber(digits);
    triggerChange(dialCode, digits);
  };

  const triggerChange = (dial: string, num: string) => {
    if (num.length > 0) {
      onChange(`${dial}${num}`);
    } else {
      onChange("");
    }
  };

  return (
    <div className={cn("group", className)}>
      {label && (
        <label className="block text-sm font-semibold text-brand-900 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="flex gap-2">
        <div className="relative w-[140px] flex-shrink-0">
          <select
            value={dialCode}
            onChange={handleDialChange}
            className={cn(
              "w-full pl-3 pr-8 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer appearance-none text-sm font-medium",
              error ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400"
            )}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.dial}>
                {c.code} ({c.dial})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <input
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          className={cn(
            "flex-1 px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all",
            error ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400"
          )}
          placeholder=""
        />
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1 error-message">{error}</p>}
    </div>
  );
};

// --- Section Header ---
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeader = ({ 
  eyebrow, 
  title, 
  subtitle, 
  className,
  centered = true 
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      "max-w-3xl mx-auto mb-16", 
      centered ? "text-center" : "text-left",
      className
    )}>
      {eyebrow && (
        <span className="text-brand-600 font-bold tracking-wider uppercase text-xs md:text-sm mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// --- Animated Counter ---
interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, end, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = `${prefix}${Math.floor(value).toLocaleString()}${suffix}`;
        }
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration, prefix, suffix]);

  return <span ref={ref} className={className}>0</span>;
};

// --- Empty ---
export function Empty() {
  return (
    <div className={cn('flex h-full items-center justify-center')}>Empty</div>
  )
}

// --- Quick Jumps ---
interface QuickJump {
  label: string;
  targetId: string;
}

const jumps: QuickJump[] = [
  { label: 'Empresas', targetId: 'empresas' },
  { label: 'Profesionales', targetId: 'profesionales' },
  { label: 'Cómo trabajamos', targetId: 'como-trabajamos' },
  { label: 'Alcance', targetId: 'alcance' },
  { label: 'FAQ', targetId: 'faq' },
];

export const QuickJumps = () => {
  return (
    <div className="w-full bg-white border-b border-slate-100 sticky top-[100px] z-40 shadow-sm backdrop-blur-md bg-white/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto scrollbar-hide snap-x">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 whitespace-nowrap hidden md:block">
            Explorar:
          </span>
          {jumps.map((jump) => (
            <button
              key={jump.targetId}
              onClick={() => scrollToSection(jump.targetId)}
              className="snap-start shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-600 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              aria-label={`Scroll to ${jump.label} section`}
            >
              {jump.label}
              <ArrowDown className="w-3 h-3 opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Latam Usa Header ---
export const LatamUsaHeader = () => {
  return (
    <div className="relative w-full mb-8 group font-sans overflow-hidden md:overflow-visible">
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="h-px w-12 bg-gradient-to-r from-slate-400 to-transparent" />
        <span className="text-slate-500 font-semibold tracking-[0.25em] uppercase text-xs">
          Nuestro Alcance
        </span>
      </div>

      <div className="relative mb-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 max-w-full break-words">
          <span className="relative inline-flex items-center gap-2">
            LATAM
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.5)]" />
          </span>
          <span className="text-slate-300 mx-1 font-light">+</span>
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600">
            EE.UU.
          </span>
        </h2>
        
        <div className="mt-2 md:mt-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <span className="block text-2xl md:text-3xl font-light text-slate-600">
            operando como un <span className="relative inline-block font-semibold text-slate-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500/40 after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500">solo equipo</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-start animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        
        <div className="hidden md:flex flex-col items-center gap-2 pt-2">
           <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-slate-400" />
           <div className="p-2 rounded-full border border-slate-200 bg-white shadow-sm">
             <Globe2 className="w-5 h-5 text-slate-400" />
           </div>
           <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-slate-200" />
        </div>

        <div className="space-y-3">
          <p className="text-lg text-slate-600 leading-relaxed font-light border-l-4 border-slate-200 pl-6 md:border-none md:pl-0">
            Ejecución remota, visión transnacional y soporte unificado en ambos mercados. <br className="hidden lg:block"/>
            Una infraestructura diseñada para eliminar fronteras operativas.
          </p>
        </div>
      </div>
      
      <div className="absolute top-[3.5rem] right-0 hidden lg:block opacity-10 pointer-events-none">
         <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50 C 50 50, 50 10, 100 10 C 150 10, 150 90, 200 90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-900" />
         </svg>
      </div>

      <span className="sr-only">Latinoamérica y Estados Unidos conectados como una sola entidad operativa.</span>
    </div>
  );
};
