import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { scrollToSection } from './utils';
import { Hero, BusinessUnits, OurReach, Testimonials, FAQ } from './sections';
import { CompanyApplyForm, FinalCtaForm } from './forms';
import { motion, AnimatePresence } from 'framer-motion';

// --- Home Page ---
export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location]);

  return (
    <main className="relative bg-background-soft">
      <Hero />
      
      {/* Sections with ID anchors */}
      
      <div id="empresas" className="scroll-mt-24" />
      <div id="profesionales" className="scroll-mt-24" />

      
      <div id="divisiones" className="scroll-mt-24" />
      <section className="bg-background-soft py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />
        <BusinessUnits />
      </section>
      

      
      {/* Added comunidad ID wrapper for navigation consistency */}
      <div id="comunidad" className="scroll-mt-24" />
      <div id="alcance" className="scroll-mt-24" />
      <section className="bg-background-soft pt-16 md:pt-24 pb-8 md:pb-12">
        <OurReach />
      </section>
      
      <div id="testimonios" className="scroll-mt-24" />
      <Testimonials />
      
      <div id="faq" className="scroll-mt-24" />
      <FAQ />
      
      <div id="contacto" className="scroll-mt-24" />
      <section className="bg-background py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
        <FinalCtaForm />
      </section>
      
    </main>
  );
};

// --- Company Apply Page ---
export const CompanyApply = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-soft">
      {/* Simple Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted hover:text-brand-700 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-brand-900 hidden sm:block">Talent Acquisition Activo</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Intro */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-50 border border-brand-100 text-brand-600 font-bold tracking-wider uppercase text-xs mb-4">
              Para Empresas
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-900 mb-6 tracking-tight">Comienza tu búsqueda de talento</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Completa el formulario para conectarte con profesionales pre-validado en LATAM. 
              Te ayudaremos a encontrar el perfil ideal en tiempo récord.
            </p>
          </div>

          {/* New Business Section */}
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-brand-900 mb-6 text-center">Soluciones Integrales para Empresas</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-brand-800 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                    </div>
                    Contratación de Talento
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    Acceda a nuestra bolsa de empleo exclusiva con perfiles pre-validados y capacitados. Ofrecemos dos modalidades:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-brand-900">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Directa:</strong> Incorpore talento a su nómina con nuestra garantía de selección.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-brand-900">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Vía EOR:</strong> Nosotros gestionamos la contratación, nómina y cumplimiento legal.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brand-800 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </div>
                    Servicios Consultivos
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    Más allá del reclutamiento, optimizamos sus operaciones con servicios especializados:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-brand-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      <span>Inteligencia de Negocios y Analítica (BI)</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-brand-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      <span>Asesoría Legal y Movilidad Global</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-brand-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      <span>Protección Financiera y Patrimonial</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-brand-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      <span>Agencia Digital y Marketing Creativo</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="bg-brand-50/50 rounded-xl p-4 border border-brand-100 flex gap-4 items-start">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-brand-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-900 text-sm mb-1">Garantía de Calidad "Dogfooding"</h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Utilizamos nuestra propia comunidad de talento para nutrir nuestros equipos internos. 
                      Los profesionales que recomendamos han sido probados y validados bajo nuestros propios estándares operativos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {[
              "Perfiles verificados en < 48h",
              "Soporte EOR y Legal incluido",
              "Garantía de reemplazo de 90 días"
            ].map((prop, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <span className="text-sm font-medium text-brand-900">{prop}</span>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <h2 className="text-2xl font-bold text-brand-900 mb-6 text-center">Por qué las empresas líderes nos eligen</h2>
            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
              <p className="text-muted leading-relaxed mb-6">
                En <strong>Closer Connected</strong>, no solo conectamos empresas con talento; construimos un ecosistema de crecimiento mutuo. 
                Nuestra propuesta de valor se basa en una sinergia de triple impacto que beneficia a empresas, profesionales y a nuestra propia organización.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-brand-900 mb-2">Reducción de Riesgos</h4>
                  <p className="text-sm text-muted">
                    Minimizamos el riesgo de malas contrataciones mediante un proceso de validación riguroso y una garantía de reemplazo. 
                    Además, gestionamos el cumplimiento legal en contrataciones internacionales.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-900 mb-2">Agilidad y Velocidad</h4>
                  <p className="text-sm text-muted">
                    Gracias a nuestra comunidad activa de talento, podemos presentar candidatos calificados en tiempos récord, 
                    reduciendo significativamente el "Time-to-Hire" y los costos operativos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Toggle Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="group flex items-center gap-3 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{isFormOpen ? 'Ocultar Formulario' : 'Comenzar Solicitud'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Form Container with Collapse Animation */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <CompanyApplyForm />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <footer className="bg-background border-t border-border py-8 mt-12 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Closer Connected. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
