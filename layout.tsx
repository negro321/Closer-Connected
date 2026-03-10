import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn, scrollToSection } from './utils';

// --- Navbar ---
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsMobileServicesOpen(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigateToSection = (item: { path: string, id: string }) => {
    setIsOpen(false);
    setIsServicesOpen(false);
    
    if (item.path.startsWith('/#')) {
      const id = item.path.substring(2);
      if (location.pathname === '/') {
        scrollToSection(id);
        window.history.pushState(null, '', `/#${id}`);
      } else {
        navigate(`/#${id}`);
      }
    } else {
      navigate(item.path);
    }
  };

  const servicesItems = [
    { name: 'Empresas', id: 'empresas', path: '/empresas/aplicar' },
    { name: 'Profesionales', id: 'profesionales', path: '/profesionales/aplicar' },
    { name: 'Unidades de negocio', id: 'divisiones', path: '/#divisiones' },
    { name: 'Alcance', id: 'alcance', path: '/#alcance' },
  ];

  const navLinks = [
    { name: 'Cómo trabajamos', id: 'como-trabajamos', path: '/como-trabajamos' },
    { name: 'Testimonios', id: 'testimonios', path: '/#testimonios' },
    { name: 'FAQ', id: 'faq', path: '/#faq' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out',
        isOpen 
          ? 'bg-transparent py-3' 
          : scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border/50 py-3' 
            : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative z-[101]">
        <button onClick={() => navigateToSection({ path: '/#top', id: 'top' })} className="flex items-center gap-3 group outline-none">
          <img 
            src="https://i.postimg.cc/B6HR8v7f/closerlogo.png" 
            alt="Closer Connected Logo" 
            className="h-10 w-auto object-contain transition-all duration-500 md:h-12"
          />
          <span className={cn(
            "text-lg font-bold tracking-tight transition-colors duration-500", 
            (scrolled || isOpen) ? "text-brand-900" : "text-white drop-shadow-md"
          )}>
            Closer Connected
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          
          {/* Servicios Dropdown */}
          <div className="relative px-2" ref={dropdownRef}>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg",
                scrolled
                  ? (isServicesOpen ? "text-brand-600 bg-brand-50" : "text-muted hover:text-brand-700 hover:bg-background-soft")
                  : (isServicesOpen ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10")
              )}
              aria-haspopup="menu"
              aria-expanded={isServicesOpen}
            >
              Servicios
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isServicesOpen && "rotate-180")} />
            </button>

            {isServicesOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-background rounded-xl shadow-xl shadow-border/50 border border-border py-2 animate-in fade-in zoom-in-95 duration-200"
                role="menu"
              >
                {servicesItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToSection(item)}
                    className="w-full text-left px-4 py-2.5 text-sm text-muted hover:bg-background-soft hover:text-brand-700 transition-colors focus:outline-none focus:bg-background-soft font-medium"
                    role="menuitem"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateToSection(link)}
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300",
                scrolled 
                  ? "text-muted hover:text-brand-700 hover:bg-background-soft" 
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {link.name}
            </button>
          ))}

          <div className="pl-4 ml-2 border-l border-border/30">
            <a
              href="https://wa.me/15856766514"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
                scrolled 
                  ? "bg-accent hover:bg-accent-hover text-white" 
                  : "bg-white text-brand-900 hover:bg-brand-50"
              )}
            >Contáctanos</a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors duration-300 relative z-[110] focus:outline-none focus:ring-2 focus:ring-brand-500",
            (scrolled || isOpen) ? "text-brand-900 hover:bg-background-soft" : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6 animate-in spin-in-90 duration-200" />
          ) : (
            <Menu className="h-6 w-6 animate-in fade-in zoom-in duration-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[90] h-[100dvh] w-full animate-in fade-in duration-200 overflow-y-auto overscroll-none touch-none">
          <div className="flex flex-col p-6 h-full pt-24 pb-10">
            
            <div className="mb-4">
              <button 
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-base text-brand-900 bg-background-soft hover:bg-brand-50 hover:text-brand-700 rounded-xl font-medium transition-all active:scale-[0.98] active:bg-brand-50 focus:outline-none"
              >
                Servicios
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileServicesOpen && "rotate-180")} />
              </button>
              
              {isMobileServicesOpen && (
                <div className="flex flex-col gap-2 mt-2 ml-4 pl-4 border-l-2 border-brand-100 animate-in slide-in-from-top-2 duration-200">
                  {servicesItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToSection(item)}
                      className="w-full text-left px-4 py-2.5 text-sm text-brand-900/80 hover:text-brand-700 hover:bg-brand-50 rounded-lg font-medium transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 mb-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateToSection(link)}
                  className="w-full text-left px-4 py-3.5 text-base text-muted hover:text-brand-900 hover:bg-background-soft rounded-xl font-medium transition-all active:bg-background-soft"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="mt-auto border-t border-border/50 pt-6">
              <a
                href="https://wa.me/15856766514"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-accent hover:bg-accent-hover text-white text-lg font-bold px-6 py-4 rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-95"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Footer ---
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-soft-light" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10 transition-colors group-hover:bg-white/10">
                <img 
                  src="https://i.postimg.cc/B6HR8v7f/closerlogo.png" 
                  alt="Closer Connected" 
                  className="h-8 w-auto brightness-200 contrast-100" 
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Closer Connected</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Transformando vendedores en profesionales de élite y conectando talento validado con empresas líderes en LATAM y USA.
            </p>

          </div>

          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-brand-500 rounded-full"></span>
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", href: "/" },
                { label: "Para Empresas", href: "/empresas/aplicar" },
                { label: "Para Profesionales", href: "/#profesionales" },
                { label: "Sobre Nosotros", href: "/como-trabajamos" },
                { label: "Casos de Éxito", href: "/#testimonios" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-brand-500 rounded-full"></span>
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Winterwoods Ln, Winston Salem,<br />Carolina del Norte, 27103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="tel:+15856766514" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +1 585-676-6514
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="mailto:closerconnected12345@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  closerconnected12345@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {currentYear} Closer Connected. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Términos de Uso</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
