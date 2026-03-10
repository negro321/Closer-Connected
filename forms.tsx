import React, { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Calendar,
  Check,
  Loader2,
  ArrowRight,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from './utils';
import { PhoneInput } from './components';

// --- Company Apply Form ---
interface CompanyFormData {
  fullName: string;
  workEmail: string;
  phoneWhatsApp: string;
  roleTitle: string;
  companyName: string;
  companyWebsiteOrLinkedIn: string;
  companyCountryCity: string;
  companySize: string;
  needType: string;
  areas: string[];
  positionsCount: string;
  seniority: string;
  workMode: string;
  preferredTalentLocation: string;
  budgetRange: string;
  contractType: string;
  hiringTimeline: string;
  shortDescription: string;
  jdFile: File | null;
  pasteJD: string;
  termsAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const areasOptions = [
  'Tecnología / Desarrollo', 'Marketing Digital', 'Ventas / Comercial', 
  'Diseño / Creativo', 'Finanzas / Contabilidad', 'Legal', 
  'Recursos Humanos', 'Operaciones / Admin', 'Servicio al Cliente', 'Otro'
];

export const CompanyApplyForm = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    fullName: '',
    workEmail: '',
    phoneWhatsApp: '',
    roleTitle: '',
    companyName: '',
    companyWebsiteOrLinkedIn: '',
    companyCountryCity: '',
    companySize: '',
    needType: '',
    areas: [],
    positionsCount: '',
    seniority: '',
    workMode: '',
    preferredTalentLocation: '',
    budgetRange: '',
    contractType: '',
    hiringTimeline: '',
    shortDescription: '',
    jdFile: null,
    pasteJD: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Requerido';
    if (!formData.workEmail.trim()) newErrors.workEmail = 'Requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) newErrors.workEmail = 'Email inválido';
    
    const digits = formData.phoneWhatsApp.replace(/\D/g, '');
    if (!formData.phoneWhatsApp.trim()) newErrors.phoneWhatsApp = 'Requerido';
    else if (digits.length < 7) newErrors.phoneWhatsApp = 'Mínimo 7 dígitos';

    if (!formData.roleTitle.trim()) newErrors.roleTitle = 'Requerido';
    if (!formData.companyName.trim()) newErrors.companyName = 'Requerido';
    if (!formData.companyWebsiteOrLinkedIn.trim()) newErrors.companyWebsiteOrLinkedIn = 'Requerido';
    if (!formData.companyCountryCity.trim()) newErrors.companyCountryCity = 'Requerido';
    if (!formData.companySize) newErrors.companySize = 'Selecciona una opción';

    if (!formData.needType) newErrors.needType = 'Selecciona una opción';
    if (formData.areas.length === 0) newErrors.areas = 'Selecciona al menos una área';
    if (!formData.positionsCount) newErrors.positionsCount = 'Requerido';
    if (!formData.seniority) newErrors.seniority = 'Requerido';
    if (!formData.workMode) newErrors.workMode = 'Requerido';
    if (!formData.preferredTalentLocation) newErrors.preferredTalentLocation = 'Requerido';

    if (!formData.contractType) newErrors.contractType = 'Requerido';
    if (!formData.hiringTimeline) newErrors.hiringTimeline = 'Requerido';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Requerido';

    if (!formData.termsAccepted) newErrors.termsAccepted = 'Debes aceptar los términos';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData(prev => ({ ...prev, [name]: checked } as any));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (newValue: string) => {
    setFormData(prev => ({ ...prev, phoneWhatsApp: newValue }));
    if (errors.phoneWhatsApp) setErrors(prev => ({ ...prev, phoneWhatsApp: '' }));
  };

  const handleAreaToggle = (area: string) => {
    setFormData(prev => {
      const newAreas = prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area];
      return { ...prev, areas: newAreas };
    });
    if (errors.areas) setErrors(prev => ({ ...prev, areas: '' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    const WHATSAPP_NUMBER = "15856766514";
    
    const jdStatus = formData.jdFile 
      ? 'Adjunta en el formulario (Notificar envío)' 
      : formData.pasteJD 
        ? `${formData.pasteJD.substring(0, 200)}${formData.pasteJD.length > 200 ? '...' : ''}` 
        : 'No adjunta';

    const areasList = formData.areas.length > 0 ? formData.areas.join(', ') : 'No especificado';
    const budget = formData.budgetRange || 'No definido';
    const fullPhone = String(formData.phoneWhatsApp || '');

    const message = `📩 Nueva solicitud (Empresa) — Bolsa Closer Connected

🏢 Empresa: ${formData.companyName}
🌐 Web/LinkedIn: ${formData.companyWebsiteOrLinkedIn}
📍 Ubicación: ${formData.companyCountryCity}
👥 Tamaño: ${formData.companySize}

👤 Contacto: ${formData.fullName} — ${formData.roleTitle}
✉️ Email: ${formData.workEmail}
📞 Tel/WhatsApp: ${fullPhone}

🎯 Necesidad: ${formData.needType}
🧩 Áreas: ${areasList}
🔢 Vacantes: ${formData.positionsCount}
📌 Seniority: ${formData.seniority}
🏠 Modalidad: ${formData.workMode}
🌎 Ubicación del talento: ${formData.preferredTalentLocation}

⏱️ Timeline: ${formData.hiringTimeline}
💰 Presupuesto: ${budget}
📝 Descripción: ${formData.shortDescription}

📎 JD: ${jdStatus}

— Enviado desde la web`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);

    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('Company Application Payload:', formData);
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm ring-8 ring-green-50">
          <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">¡Solicitud Lista!</h2>
        <p className="text-xl text-muted mb-8 leading-relaxed">
          Te estamos redirigiendo a WhatsApp para enviar tu solicitud a nuestro equipo de Talent Acquisition.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {whatsappUrl && (
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-all shadow-md hover:shadow-lg"
            >
              Abrir WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-border bg-background text-muted font-semibold hover:bg-background-soft transition-all"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2 pb-4 border-b border-border">
          <User className="w-5 h-5 text-brand-600" />
          Datos de Contacto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Nombre Completo *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all", errors.fullName ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
              placeholder="Tu nombre"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1 error-message">{errors.fullName}</p>}
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Email Corporativo *</label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all", errors.workEmail ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
              placeholder="nombre@empresa.com"
            />
            {errors.workEmail && <p className="text-red-500 text-xs mt-1 error-message">{errors.workEmail}</p>}
          </div>
          <div className="group">
            <PhoneInput
              value={formData.phoneWhatsApp}
              onChange={handlePhoneChange}
              error={errors.phoneWhatsApp}
              required
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Cargo / Rol *</label>
            <input
              type="text"
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all", errors.roleTitle ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
              placeholder="Ej. HR Manager, CEO"
            />
            {errors.roleTitle && <p className="text-red-500 text-xs mt-1 error-message">{errors.roleTitle}</p>}
          </div>
        </div>
      </div>

      <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2 pb-4 border-b border-border">
          <Building2 className="w-5 h-5 text-brand-600" />
          Sobre la Empresa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Nombre de la Empresa *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all", errors.companyName ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
              placeholder="Nombre comercial"
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1 error-message">{errors.companyName}</p>}
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Sitio Web o LinkedIn *</label>
            <input
              type="text"
              name="companyWebsiteOrLinkedIn"
              value={formData.companyWebsiteOrLinkedIn}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all", errors.companyWebsiteOrLinkedIn ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
              placeholder="https://..."
            />
            {errors.companyWebsiteOrLinkedIn && <p className="text-red-500 text-xs mt-1 error-message">{errors.companyWebsiteOrLinkedIn}</p>}
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">País / Ciudad Base *</label>
            <input
              type="text"
              name="companyCountryCity"
              value={formData.companyCountryCity}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all", errors.companyCountryCity ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
              placeholder="Ej. Miami, FL / Bogotá, CO"
            />
            {errors.companyCountryCity && <p className="text-red-500 text-xs mt-1 error-message">{errors.companyCountryCity}</p>}
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Tamaño de la Empresa *</label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.companySize ? "border-red-300 focus:ring-2 focus:ring-red-100" : "border-border focus:ring-2 focus:ring-brand-100 focus:border-brand-400")}
            >
              <option value="">Seleccionar...</option>
              <option value="1-10">1-10 empleados</option>
              <option value="11-50">11-50 empleados</option>
              <option value="51-200">51-200 empleados</option>
              <option value="201-500">201-500 empleados</option>
              <option value="500+">500+ empleados</option>
            </select>
            {errors.companySize && <p className="text-red-500 text-xs mt-1 error-message">{errors.companySize}</p>}
          </div>
        </div>
      </div>

      <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2 pb-4 border-b border-border">
          <Briefcase className="w-5 h-5 text-brand-600" />
          Necesidad de Contratación
        </h3>
        
        <div className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-3">¿Qué necesitas actualmente? *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {['Publicar vacantes', 'Contratar talento remoto', 'Armar un equipo completo', 'Soporte EOR / Nómina', 'Otro'].map((type) => (
                <label 
                  key={type}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:bg-background-soft",
                    formData.needType === type 
                      ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" 
                      : "border-border"
                  )}
                >
                  <input 
                    type="radio" 
                    name="needType" 
                    value={type} 
                    checked={formData.needType === type}
                    onChange={handleChange}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-brand-900 font-medium">{type}</span>
                </label>
              ))}
            </div>
            {errors.needType && <p className="text-red-500 text-xs mt-1 error-message">{errors.needType}</p>}
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-3">Áreas de interés (Selecciona varias) *</label>
            <div className="flex flex-wrap gap-2">
              {areasOptions.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => handleAreaToggle(area)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    formData.areas.includes(area)
                      ? "bg-brand-600 text-white border-brand-600 shadow-md"
                      : "bg-background text-muted border-border hover:border-brand-300 hover:text-brand-700"
                  )}
                >
                  {area}
                </button>
              ))}
            </div>
            {errors.areas && <p className="text-red-500 text-xs mt-1 error-message">{errors.areas}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-brand-900 mb-1.5">Cantidad de posiciones *</label>
              <select
                name="positionsCount"
                value={formData.positionsCount}
                onChange={handleChange}
                className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.positionsCount ? "border-red-300" : "border-border")}
              >
                <option value="">Seleccionar...</option>
                <option value="1">1</option>
                <option value="2-5">2-5</option>
                <option value="6-10">6-10</option>
                <option value="10+">10+</option>
              </select>
              {errors.positionsCount && <p className="text-red-500 text-xs mt-1 error-message">{errors.positionsCount}</p>}
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-brand-900 mb-1.5">Seniority requerido *</label>
              <select
                name="seniority"
                value={formData.seniority}
                onChange={handleChange}
                className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.seniority ? "border-red-300" : "border-border")}
              >
                <option value="">Seleccionar...</option>
                <option value="Junior">Junior (0-2 años)</option>
                <option value="Mid">Mid-Level (2-5 años)</option>
                <option value="Senior">Senior (5+ años)</option>
                <option value="Lead/Manager">Lead / Manager</option>
                <option value="Mix">Mix / Varios</option>
              </select>
              {errors.seniority && <p className="text-red-500 text-xs mt-1 error-message">{errors.seniority}</p>}
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-brand-900 mb-1.5">Modalidad de trabajo *</label>
              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.workMode ? "border-red-300" : "border-border")}
              >
                <option value="">Seleccionar...</option>
                <option value="100% Remoto">100% Remoto</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Presencial">Presencial</option>
              </select>
              {errors.workMode && <p className="text-red-500 text-xs mt-1 error-message">{errors.workMode}</p>}
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-brand-900 mb-1.5">Ubicación preferida del talento *</label>
              <select
                name="preferredTalentLocation"
                value={formData.preferredTalentLocation}
                onChange={handleChange}
                className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.preferredTalentLocation ? "border-red-300" : "border-border")}
              >
                <option value="">Seleccionar...</option>
                <option value="Cualquier país LATAM">Cualquier país LATAM</option>
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Argentina">Argentina</option>
                <option value="Perú">Perú</option>
                <option value="Otro">Otro / Específico</option>
              </select>
              {errors.preferredTalentLocation && <p className="text-red-500 text-xs mt-1 error-message">{errors.preferredTalentLocation}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2 pb-4 border-b border-border">
          <FileText className="w-5 h-5 text-brand-600" />
          Condiciones y Detalles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Rango Presupuestal (Mensual USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer"
              >
                <option value="">No definido aún</option>
                <option value="< $1,000">&lt; $1,000</option>
                <option value="$1,000 - $2,000">$1,000 - $2,000</option>
                <option value="$2,000 - $4,000">$2,000 - $4,000</option>
                <option value="$4,000 - $6,000">$4,000 - $6,000</option>
                <option value="$6,000+">$6,000+</option>
              </select>
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Tipo de Contrato Preferido *</label>
            <select
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.contractType ? "border-red-300" : "border-border")}
            >
              <option value="">Seleccionar...</option>
              <option value="Directo (Nómina local)">Directo (Nómina local)</option>
              <option value="Contractor (Prestación de servicios)">Contractor (Prestación de servicios)</option>
              <option value="EOR (Employer of Record)">EOR (Employer of Record)</option>
              <option value="No estoy seguro / Asesoría">No estoy seguro / Necesito asesoría</option>
            </select>
            {errors.contractType && <p className="text-red-500 text-xs mt-1 error-message">{errors.contractType}</p>}
          </div>
          <div className="group md:col-span-2">
            <label className="block text-sm font-semibold text-brand-900 mb-1.5">Tiempo estimado de contratación *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <select
                name="hiringTimeline"
                value={formData.hiringTimeline}
                onChange={handleChange}
                className={cn("w-full pl-10 pr-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all cursor-pointer", errors.hiringTimeline ? "border-red-300" : "border-border")}
              >
                <option value="">Seleccionar...</option>
                <option value="Inmediato (ASAP)">Inmediato (ASAP)</option>
                <option value="En 2-4 semanas">En 2-4 semanas</option>
                <option value="1-3 meses">1-3 meses</option>
                <option value="Solo explorando">Solo explorando opciones</option>
              </select>
            </div>
            {errors.hiringTimeline && <p className="text-red-500 text-xs mt-1 error-message">{errors.hiringTimeline}</p>}
          </div>
        </div>

        <div className="group mb-6">
          <label className="block text-sm font-semibold text-brand-900 mb-1.5">Descripción breve del perfil / requerimiento *</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={4}
            className={cn("w-full px-4 py-3 rounded-xl border bg-background-soft focus:bg-background outline-none transition-all resize-none", errors.shortDescription ? "border-red-300" : "border-border")}
            placeholder="Describe brevemente qué buscas, tecnologías clave, responsabilidades principales..."
          />
          {errors.shortDescription && <p className="text-red-500 text-xs mt-1 error-message">{errors.shortDescription}</p>}
        </div>

        <div className="group">


        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group relative mb-8">
          <div className="relative flex items-center pt-0.5">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-border checked:border-brand-600 checked:bg-brand-600 focus:ring-4 focus:ring-brand-100 transition-all bg-background"
            />
            <Check className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white w-3.5 h-3.5 left-[3px] top-[5px] transition-opacity" strokeWidth={3} />
          </div>
          <span className="text-sm text-muted leading-snug group-hover:text-brand-900 transition-colors select-none">
            Acepto los términos y condiciones y la política de privacidad de Closer Connected. Entiendo que seré contactado por el equipo. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.termsAccepted && <p className="text-red-500 text-xs -mt-6 mb-6 ml-8 error-message">{errors.termsAccepted}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-accent-200/50 hover:shadow-xl hover:shadow-accent-300/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 active:scale-[0.98] text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Enviando Solicitud...
            </>
          ) : (
            <>
              Enviar Solicitud
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

    </form>
  );
};

// --- Final CTA Form ---
interface FinalCtaFormData {
  fullName: string;
  phone: string;
  email: string;
  role: string;
  agreed: boolean;
}

interface FinalCtaFormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  role?: string;
  agreed?: string;
}

export const FinalCtaForm = () => {
  const [formData, setFormData] = useState<FinalCtaFormData>({
    fullName: '',
    phone: '',
    email: '',
    role: '',
    agreed: false,
  });

  const [errors, setErrors] = useState<FinalCtaFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FinalCtaFormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del correo no es válido';
    }
    if (!formData.role) newErrors.role = 'Por favor selecciona una opción';
    if (!formData.agreed) newErrors.agreed = 'Debes aceptar los términos y condiciones';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof FinalCtaFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    const message = `📩 Nuevo mensaje de contacto (Home) - Closer Connected
    
👤 Nombre: ${formData.fullName}
📞 Teléfono: ${formData.phone}
✉️ Email: ${formData.email}
🏷️ Rol: ${formData.role}

— Enviado desde la web`;

    const WHATSAPP_NUMBER = "15856766514";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    await new Promise(resolve => setTimeout(resolve, 800));

    console.log('Form payload:', formData);
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      role: '',
      agreed: false,
    });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        <div className="pt-8 animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-white shadow-sm mb-8">
            <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">CONTÁCTANOS</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            <span className="bg-gray-100 px-2 py-1 decoration-clone box-decoration-clone leading-[1.4]">
              Estamos listos para ayudarte.
            </span>
          </h1>
          
          <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
            Ya seas un agente buscando crecimiento o una empresa buscando resultados. Completa el formulario y nos pondremos en contacto contigo lo antes posible para discutir cómo podemos colaborar.
          </p>
          
          <div className="border-t border-gray-200 w-full mb-10"></div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 text-blue-500 group-hover:bg-blue-100 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Correo electrónico</h4>
                <a href="mailto:closerconnected12345@gmail.com" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors block break-all">
                  closerconnected12345@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 text-blue-500 group-hover:bg-blue-100 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Teléfono</h4>
                <a href="tel:+15856766514" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  +1 585-676-6514
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative animate-in fade-in slide-in-from-right-6 duration-700 delay-100">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          
          <div className="p-6 md:p-10">
            {isSuccess ? (
              <div className="text-center py-16 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">¡Mensaje Listo!</h4>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Te estamos redirigiendo a WhatsApp para enviar tu mensaje a nuestro equipo.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  Volver al formulario
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h3>
                  <p className="text-sm text-gray-400">Los campos marcados con <span className="text-red-500">*</span> son obligatorios</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all",
                        errors.fullName ? "border-red-300 focus:border-red-400" : "border-gray-200"
                      )}
                      placeholder="Ej. Juan Pérez"
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Teléfono <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all",
                          errors.phone ? "border-red-300 focus:border-red-400" : "border-gray-200"
                        )}
                        placeholder="+57 300..."
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all",
                          errors.email ? "border-red-300 focus:border-red-400" : "border-gray-200"
                        )}
                        placeholder="tu@correo.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">¿Eres un...? <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer",
                          errors.role ? "border-red-300 focus:border-red-400" : "border-gray-200"
                        )}
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="Empresa">Empresa</option>
                        <option value="Profesional">Profesional</option>
                        <option value="Aliado">Aliado</option>
                        <option value="Otro">Otro</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                    </div>
                    {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                  </div>

                  <div className="flex items-start gap-3 mt-4">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="agreed"
                        type="checkbox"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                      Acepto los términos y condiciones. Al proporcionar mi número, acepto recibir mensajes de texto. <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.agreed && <p className="text-xs text-red-500 ml-7">{errors.agreed}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
