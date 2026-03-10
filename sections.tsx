import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  User,
  UserCheck, 
  Briefcase, 
  Star, 
  Globe2, 
  UserCircle,
  HelpCircle,
  ChevronDown,
  Quote
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from './utils';
import { SectionHeader, AnimatedCounter, LatamUsaHeader } from './components';

// --- Hero Section ---
const Counter = ({ from, to, duration = 2.5, prefix = '', suffix = '' }: { from: number, to: number, duration?: number, prefix?: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, prefix, suffix]);

  return <span ref={nodeRef} className="inline-block min-w-[3ch] text-center">{prefix}{from}{suffix}</span>;
}

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="top" ref={containerRef} className="min-h-screen flex flex-col items-center justify-center relative pt-28 md:pt-20 pb-16 overflow-hidden bg-slate-950">
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20business%20person%20working%20on%20a%20laptop%20in%20a%20modern%20corporate%20office%20with%20glass%20walls%2C%20natural%20lighting%2C%20high%20quality%2C%204k%2C%20cinematic%2C%20enterprise%20atmosphere&image_size=landscape_16_9" 
          alt="Professional working environment" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </motion.div>

      <motion.div 
        style={{ opacity: isMobile ? 1 : opacityHero }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container relative z-20 mx-auto px-4 md:px-6 flex flex-col items-start text-left md:items-center md:text-center pt-20"
      >
        <motion.h1 variants={fadeInUp} className="font-heading max-w-5xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 md:mb-6 leading-tight">
          Ecosistema Estratégico de <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Talento y Negocios</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed">
          Potenciamos el crecimiento empresarial con soluciones integrales y talento remoto validado. 
          Calidad enterprise, agilidad startup.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12 md:mb-16">
          <Link
            to="/empresas/aplicar"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 md:py-4 text-sm md:text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-600/40 active:scale-95"
          >
            <Building2 className="w-5 h-5" />
            Soy una empresa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            to="/profesionales/aplicar"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 md:py-4 text-sm md:text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 hover:scale-105 active:scale-95"
          >
            <User className="w-5 h-5" />
            Soy profesional
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-2 md:gap-16 border-t border-white/10 pt-8 md:pt-10 w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center md:items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
              <Counter from={0} to={5000} prefix="+" />
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider text-center">Talentos Validados</span>
          </div>
          <div className="flex flex-col items-center md:items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
              <Counter from={0} to={50} prefix="+" />
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider text-center">Empresas Partner</span>
          </div>
          <div className="flex flex-col items-center md:items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
              <Counter from={0} to={100} suffix="%" />
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider text-center">Satisfacción</span>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-start md:justify-center gap-4 md:gap-8 mt-12 w-full">
           {['Procesos Certificados', 'Soporte 24/7', 'Talento Bilingüe'].map((item) => (
             <div key={item} className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-black/20 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm hover:bg-white/5 transition-colors cursor-default">
               <CheckCircle2 className="h-4 w-4 text-emerald-400" />
               {item}
             </div>
           ))}
        </motion.div>

      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
      </motion.div>
    </section>
  );
};

// --- Triple Impact ---
const impactData = [
  {
    title: 'Soluciones Corporativas',
    description: 'Transformamos operaciones empresariales mediante inteligencia estratégica y equipos de alto rendimiento.',
    cta: 'Potenciar mi Empresa',
    href: '/empresas',
    highlights: ['Consultoría Estratégica', 'Talento Tech & Exec', 'Optimización de Procesos'],
    icon: Building2,
    gradient: 'from-blue-600 to-indigo-700',
    iconColor: 'text-blue-200',
    shadow: 'shadow-blue-900/20'
  },
  {
    title: 'Desarrollo Profesional',
    description: 'Accede a un ecosistema de crecimiento acelerado con mentoría de clase mundial y oportunidades globales.',
    cta: 'Unirme al Ecosistema',
    href: '/profesionales',
    highlights: ['Certificación Global', 'Networking Elite', 'Placement Prioritario'],
    icon: UserCircle,
    gradient: 'from-emerald-600 to-teal-700',
    iconColor: 'text-emerald-200',
    shadow: 'shadow-emerald-900/20',
    badge: 'Membresía PRO'
  },
  {
    title: 'Carrera Interna',
    description: 'Identificamos y cultivamos el top 1% de talento para liderar nuestras iniciativas estratégicas.',
    cta: 'Explorar Oportunidades',
    href: '/careers',
    highlights: ['Liderazgo Estratégico', 'Equity & Benefits', 'Impacto Directo'],
    icon: Briefcase,
    gradient: 'from-slate-700 to-slate-900',
    iconColor: 'text-slate-300',
    shadow: 'shadow-slate-900/20'
  },
];

export const TripleImpact = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <SectionHeader 
        eyebrow="Nuestro Ecosistema"
        title="Impacto Estratégico Integral"
        subtitle="Una plataforma unificada que sincroniza ambiciones empresariales con talento excepcional."
        className="mb-16"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {impactData.map((card, index) => (
          <div 
            key={index}
            className={cn(
              "group relative flex flex-col h-full overflow-hidden rounded-3xl bg-white border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
              card.shadow
            )}
          >
            <div className={cn("absolute top-0 left-0 right-0 h-2 bg-gradient-to-r", card.gradient)} />
            
            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "p-4 rounded-2xl bg-gradient-to-br shadow-lg",
                  card.gradient
                )}>
                  <card.icon className={cn("w-8 h-8", card.iconColor)} />
                </div>
                {card.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 border border-emerald-200/50">
                    {card.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                {card.description}
              </p>

              <ul className="space-y-4 mb-8">
                {card.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-medium text-gray-600">
                    <CheckCircle2 className={cn("w-5 h-5 flex-shrink-0 mt-0.5", card.gradient.split(' ')[1].replace('to-', 'text-'))} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to={card.href}
                className="mt-auto w-full group/btn inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 bg-gray-50 text-gray-900 hover:bg-gray-900 hover:text-white border border-gray-200 hover:border-transparent"
              >
                {card.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>

            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none bg-gradient-to-br",
              card.gradient
            )} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Business Units ---
const businessCards = [
  {
    title: "Soluciones Corporativas",
    description: "Estrategias de alto nivel para transformar operaciones y escalar resultados.",
    icon: Building2,
    gradient: "from-blue-600 to-indigo-700",
    shadowColor: "shadow-blue-500/20",
    buttonColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    bullets: [
      "Consultoría Estratégica",
      "Talento Tech & Exec",
      "Optimización de Procesos"
    ],
    buttonText: "Potenciar mi Empresa",
    href: "/empresas"
  },
  {
    title: "Desarrollo Profesional",
    description: "Impulsa tu carrera con mentoría experta y acceso a oportunidades globales.",
    icon: UserCheck,
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/20",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge: "Membresía PRO",
    bullets: [
      "Certificación Global",
      "Networking Elite",
      "Placement Prioritario"
    ],
    buttonText: "Unirme al Ecosistema",
    href: "/profesionales"
  },
  {
    title: "Carrera Interna",
    description: "Únete al top 1% de talento y lidera iniciativas que marcan la diferencia.",
    icon: Briefcase,
    gradient: "from-slate-700 to-gray-900",
    shadowColor: "shadow-slate-500/20",
    buttonColor: "bg-gradient-to-r from-slate-700 to-gray-900 hover:from-slate-800 hover:to-black",
    iconBg: "bg-slate-50",
    iconColor: "text-slate-700",
    bullets: [
      "Liderazgo Estratégico",
      "Equity & Benefits",
      "Impacto Directo"
    ],
    buttonText: "Explorar Oportunidades",
    href: "/careers"
  }
];

export const BusinessUnits = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeader 
        eyebrow="Unidades de negocio"
        title="Soluciones Integrales"
        subtitle="Un ecosistema diseñado para potenciar el crecimiento en cada nivel."
        className="mb-16"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {businessCards.map((card, index) => (
          <div 
            key={index}
            className={cn(
              "group relative flex flex-col h-full bg-white rounded-3xl transition-all duration-500 hover:-translate-y-2",
              "border border-gray-100",
              "shadow-xl hover:shadow-2xl",
              card.shadowColor
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50 rounded-3xl pointer-events-none" />
            <div className={cn("absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r rounded-t-3xl", card.gradient)} />

            <div className="relative p-6 md:p-8 flex flex-col h-full z-10">
              <div className="flex justify-between items-start mb-8">
                <div className={cn(
                  "p-4 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                  card.iconBg
                )}>
                  <card.icon className={cn("w-8 h-8", card.iconColor)} strokeWidth={1.5} />
                </div>
                
                {card.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-700" />
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {card.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 group/item">
                    <CheckCircle2 className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors duration-300", 
                      card.iconColor
                    )} />
                    <span className="font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={card.href}
                className={cn(
                  "mt-auto w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.98]",
                  card.buttonColor
                )}
              >
                {card.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- How We Work ---
interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 'diagnostico',
    number: '01',
    title: 'Diagnóstico',
    description: 'Entendemos tu necesidad, el contexto LATAM/EE.UU. y definimos objetivos claros.',
  },
  {
    id: 'diseno',
    number: '02',
    title: 'Diseño',
    description: 'Armamos la estrategia, el plan y el modelo operativo (talento + servicios).',
  },
  {
    id: 'ejecucion',
    number: '03',
    title: 'Ejecución',
    description: 'Implementamos equipos remotos, soluciones integrales y entregables medibles.',
  },
  {
    id: 'acompanamiento',
    number: '04',
    title: 'Acompañamiento',
    description: 'Seguimiento continuo, optimización y soporte para escalar resultados.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: (index: number) => ({ 
    opacity: 0, 
    y: index % 2 === 0 ? -50 : 50 
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20
    }
  }
};

export const HowWeWork = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeader 
        eyebrow="Cómo trabajamos"
        title="Un proceso claro, de punta a punta"
        subtitle="Diagnóstico, diseño y ejecución con acompañamiento transnacional."
      />

      <div className="relative mb-16">
        <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-0.5 bg-border z-0" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              custom={index}
              variants={itemVariants}
              className="relative flex flex-col items-center lg:items-start group"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-24 h-24 rounded-full bg-background border-4 border-background-soft flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:border-brand-50 transition-colors duration-300 relative"
              >
                <motion.div 
                  animate={{ 
                    boxShadow: ["0 0 0 rgba(37, 99, 235, 0)", "0 0 15px rgba(37, 99, 235, 0.2)", "0 0 0 rgba(37, 99, 235, 0)"] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                  className="w-20 h-20 rounded-full bg-background-soft flex items-center justify-center group-hover:bg-brand-50 transition-colors duration-300"
                >
                   <span className="text-2xl font-bold text-brand-600">{step.number}</span>
                </motion.div>
                {index !== steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-full h-12 w-0.5 bg-border" />
                )}
              </motion.div>

              <div className="bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 w-full text-center lg:text-left h-full group-hover:-translate-y-1 group-hover:border-brand-100/50">
                <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/empresas/aplicar"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5"
        >
          Agenda una sesión
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

// --- Our Reach ---
const stats = [
  { label: 'Países', value: 8, suffix: '' },
  { label: 'Talentos en comunidad', value: 1200, suffix: '+' },
  { label: 'Áreas de servicio', value: 5, suffix: '' },
];

const bullets = [
  "Operación transnacional para empresas que expanden o contratan en la región",
  "Equipos remotos pre-validados en LATAM para clientes en EE.UU.",
  "Soporte en procesos: talento, legal, financiero y marketing",
  "Comunicación y coordinación en husos horarios de las Américas",
];

export const OurReach = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group ring-1 ring-slate-900/5">
          <img 
            src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=digital%20connected%20map%20of%20the%20americas%20with%20network%20lines%20dark%20blue%20background%20corporate%20minimalist&image_size=portrait_4_3"
            alt="Map of Americas Coverage"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-900/60 to-brand-900/40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px] animate-pulse delay-1000" />
          
          <div className="relative z-10 text-center p-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Globe2 className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-lg">LATAM / USA</h3>
            <p className="text-brand-100 font-medium tracking-widest uppercase text-xs drop-shadow-md">Área de Cobertura</p>
            
            <div className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-30">
               <svg className="w-full h-full">
                 <path d="M100,100 Q200,50 300,100 T500,100" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
               </svg>
            </div>
          </div>
        </div>

        <div className="lg:pl-8">
          <LatamUsaHeader />

          <ul className="space-y-3 mb-6">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-4 group">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                </div>
                <span className="text-slate-700 font-medium leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-slate-200 pt-6 sm:pt-4 overflow-hidden">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col relative items-center sm:items-start text-center sm:text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
              >
                <motion.div 
                  className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-200 to-transparent"
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: "100%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                />
                
                <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1 tabular-nums tracking-tight">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                </p>
                <p className="text-xs md:text-sm text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Testimonials ---
const testimonials = [
  {
    name: 'Michelle R.',
    role: 'Directora de Ventas',
    company: 'TechFlow Inc.',
    content: 'Closer Connected nos ayudó a encontrar un profesional de ventas altamente capacitado que estuvo listo para rendir desde el primer día. El proceso de incorporación fue fluido y sumamente profesional.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20business%20woman%20portrait%20smiling%20office%20headshot&image_size=square',
    stars: 5,
  },
  {
    name: 'Carlos M.',
    role: 'CEO',
    company: 'StartUp Latam',
    content: 'Gracias a Closer Connected, hemos construido un equipo de ventas más fuerte. Su compromiso con el desarrollo marca una gran diferencia en los resultados mensuales de nuestra facturación.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20business%20man%20portrait%20smiling%20office%20headshot&image_size=square',
    stars: 5,
  },
  {
    name: 'Laura G.',
    role: 'VP de Crecimiento',
    company: 'Global Scale',
    content: 'El talento que Closer Connected incorporó a nuestro equipo superó las expectativas. Sus agentes están preparados, seguros y motivados para obtener resultados desde la primera semana.',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20executive%20woman%20portrait%20smiling%20office%20headshot&image_size=square',
    stars: 5,
  },
];

const testimonialsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const testimonialsItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 20
    }
  }
};

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 md:py-16 relative overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNjYmQ1ZTEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-4"
          >
            <Star className="w-3 h-3 fill-blue-600" />
            Testimonios
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-heading"
          >
            Empresas que confían en <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">
              nuestro talento
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            Historias de éxito de organizaciones que han transformado sus resultados comerciales.
          </motion.p>
        </div>

        <motion.div 
          variants={testimonialsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={testimonialsItemVariants}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full"
            >
              <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-50 transition-colors duration-300">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="flex-grow mb-8 relative z-10">
                <p className="text-slate-600 leading-relaxed font-medium">
                  "{testimonial.content}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                  <div className="flex flex-col">
                    <span className="text-xs text-brand-600 font-semibold">{testimonial.role}</span>
                    <span className="text-xs text-slate-400">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- FAQ ---
const faqs = [
  {
    question: '¿Con qué tipo de empresas trabajan?',
    answer: 'Trabajamos con empresas que buscan profesionales de ventas de alto rendimiento listos para ofrecer resultados inmediatos, desde startups en crecimiento hasta corporaciones establecidas.',
  },
  {
    question: '¿Solo capacitan a agentes de ventas?',
    answer: 'No, no solo capacitamos. Gestionamos, guiamos y también conectamos directamente el talento certificado con empresas que lo necesitan.',
  },
  {
    question: '¿Cuánto tiempo tarda el proceso de colocación?',
    answer: 'El tiempo varía según la empresa y la preparación del agente, pero priorizamos colocaciones rápidas y efectivas, a menudo en cuestión de semanas.',
  },
  {
    question: '¿Puedo agendar una consulta aunque no sepa en qué encajo?',
    answer: '¡Claro que sí! Te guiaremos en el proceso y te ayudaremos a encontrar el mejor camino según tus habilidades y objetivos.',
  },
  {
    question: '¿Qué hace diferente a Closer Connected?',
    answer: 'No solo reclutamos; también gestionamos, guiamos y aseguramos desarrollo e integración continua, garantizando resultados a largo plazo.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-16 bg-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-heading leading-tight"
            >
              Resolvemos <br/>
              <span className="text-brand-600">tus dudas</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-lg leading-relaxed mb-8"
            >
              Respuestas claras para decisiones informadas. Si necesitas más detalles, nuestro equipo está listo para ayudarte.
            </motion.p>

            <motion.a 
              href="#contacto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors group"
            >
              Contactar a soporte
              <span className="block h-px w-full bg-brand-600 absolute bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.a>
          </div>

          <div className="lg:w-2/3">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "border-b border-slate-200 transition-colors duration-300",
                    openIndex === index ? "border-brand-200 bg-slate-50/50 rounded-lg" : "hover:border-slate-300"
                  )}
                >
                  <button
                    className="w-full py-6 px-4 text-left flex justify-between items-start gap-4 group"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className={cn(
                      "font-medium text-lg transition-colors duration-300",
                      openIndex === index ? "text-brand-700" : "text-slate-800 group-hover:text-slate-900"
                    )}>
                      {faq.question}
                    </span>
                    <span className={cn(
                      "mt-1 p-1 rounded-full transition-all duration-300 shrink-0",
                      openIndex === index ? "bg-brand-100 text-brand-600 rotate-180" : "text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100"
                    )}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-6 pt-0">
                          <p className="text-slate-600 leading-relaxed text-base border-l-2 border-brand-200 pl-4">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
