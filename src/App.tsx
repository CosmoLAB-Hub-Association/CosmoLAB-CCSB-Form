/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Target, 
  Heart, 
  Share2, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Link as LinkIcon,
  Atom,
  Cpu,
  Zap,
  Leaf,
  Coins,
  Palette,
  Send
} from 'lucide-react';
import { supabase } from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import CosmoLABHubLogo from './assets/CosmoLABHubLogo.png';

// --- Types ---
interface FormData {
  fullName: string;
  gender: string;
  country: string;
  city: string;
  nationality: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  educationLevel: string;
  fieldOfStudy: string;
  currentOrganization: string;
  currentRole: string;
  yearsExperience: string;
  expertiseDomains: string[];
  technicalSkills: string;
  previousProjectTypes: string[];
  relevantExperience: string;
  contributionTypes: string[];
  availability: string;
  motivation: string;
  values: string;
  interests: string[];
  cvLink: string;
  publicationsLinks: string;
  consent: boolean[];
}

const INITIAL_DATA: FormData = {
  fullName: '',
  gender: '',
  country: '',
  city: '',
  nationality: '',
  email: '',
  phone: '',
  linkedin: '',
  website: '',
  educationLevel: '',
  fieldOfStudy: '',
  currentOrganization: '',
  currentRole: '',
  yearsExperience: '',
  expertiseDomains: [],
  technicalSkills: '',
  previousProjectTypes: [],
  relevantExperience: '',
  contributionTypes: [],
  availability: '',
  motivation: '',
  values: '',
  interests: [],
  cvLink: '',
  publicationsLinks: '',
  consent: [],
};

const SECTIONS = [
  { id: 1, title: 'Informations personnelles', icon: User },
  { id: 2, title: 'Profil académique et professionnel', icon: GraduationCap },
  { id: 3, title: 'Domaines d’expertise', icon: Briefcase },
  { id: 4, title: 'Compétences techniques', icon: Wrench },
  { id: 5, title: 'Expériences et contributions', icon: Target },
  { id: 6, title: 'Contribution CosmoLAB', icon: Atom },
  { id: 7, title: 'Motivation', icon: Heart },
  { id: 8, title: 'Réseau et collaboration', icon: Share2 },
  { id: 9, title: 'Documents optionnels', icon: FileText },
  { id: 10, title: 'Consentement', icon: CheckCircle },
];

const EXPERTISE_OPTIONS = [
  "Intelligence artificielle", "Machine learning", "Data science", "Analyse de données satellites",
  "Sciences de l’atmosphère", "Climatologie", "Environnement et pollution", "Océanographie",
  "Agriculture durable", "Santé environnementale", "Robotique", "Mécatronique", "IoT",
  "Systèmes embarqués", "Développement logiciel", "Cloud computing", "Cybersécurité",
  "Blockchain", "FinTech", "Microfinance", "Analyse financière", "Entrepreneuriat",
  "Business development", "Innovation management", "Ingénierie industrielle", "Plasturgie",
  "Science des matériaux", "Économie circulaire", "Recyclage", "Éducation STEAM",
  "Ingénierie pédagogique", "E-learning", "VR éducative", "Conception de jeux vidéo",
  "Animation 2D/3D", "Illustration", "Storytelling", "UX/UI design", "Communication scientifique",
  "Marketing digital", "Relations publiques", "Propriété intellectuelle", "Droit numérique",
  "Coopération internationale", "Gestion de projets", "Organisation d’événements scientifiques"
];

const PROJECT_TYPES = [
  "Innovation technologique", "Intelligence artificielle", "Climat / environnement",
  "Éducation STEAM", "Startups / incubation", "Recherche scientifique", "Robotique",
  "Jeux vidéo", "Industrie créative", "FinTech", "Développement durable"
];

const CONTRIBUTION_TYPES = [
  "Conseil stratégique", "Recherche scientifique", "Développement technologique",
  "Formation et mentorat", "Conception pédagogique", "Développement logiciel",
  "Développement IA", "Design et création", "Business development",
  "Recherche de financement", "Communication scientifique", "Partenariats internationaux"
];

const INTEREST_OPTIONS = [
  "Collaboration scientifique", "Co-développement de technologies", "Co-publications scientifiques",
  "Développement de projets internationaux", "Mentorat des jeunes", "Programmes éducatifs", "Innovation sociale"
];

const Logo = () => (
  <div className="flex flex-col items-center mb-12">
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 drop-shadow-[0_0_15px_rgba(227,38,38,0.3)]">
      {/* Planet */}
      <circle cx="50" cy="50" r="22" fill="#e32626" />
      {/* Rings */}
      <ellipse cx="50" cy="50" rx="45" ry="12" stroke="#e32626" strokeWidth="2.5" transform="rotate(-30 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="12" stroke="#e32626" strokeWidth="2.5" transform="rotate(30 50 50)" />
      {/* Orbiting bodies */}
      <circle cx="15" cy="30" r="3" fill="#e32626" />
      <circle cx="85" cy="30" r="2" fill="#e32626" />
      <circle cx="20" cy="70" r="4" fill="#e32626" />
      <circle cx="80" cy="80" r="5" fill="#e32626" />
      <circle cx="50" cy="10" r="3" fill="#e32626" />
    </svg>
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-[0.2em] text-[#3498db] uppercase font-display">Cosmo Lab</h1>
      <h2 className="text-xl font-bold tracking-[0.5em] text-zinc-400 uppercase font-display mt-1">Hub</h2>
    </div>
  </div>
);

const HeaderLogo = () => (
  <div className="flex items-center gap-3">
    <img
      src={CosmoLABHubLogo}
      alt="CosmoLAB Hub Association"
      className="h-10 w-auto object-contain"
    />
    <div>
      <h1 className="text-lg font-display font-bold tracking-tight leading-none">
        <span className="text-[#3498db]">CosmoLAB</span> <span className="text-zinc-900">Hub</span>
      </h1>
      <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Association</p>
    </div>
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const ADMIN_EMAIL = "comolabmagazine@gmail.com";

  useEffect(() => {
    // Check if URL has ?admin=1 or similar
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin')) {
      setIsAdminMode(true);
    }

    let cancelled = false;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('Supabase getSession error:', error);
          return;
        }
        const currentUser = data.session?.user ?? null;
        setUser(currentUser);
        setIsAdmin(currentUser?.email === ADMIN_EMAIL);
      })
      .catch((err) => {
        if (!cancelled) console.error('Supabase getSession failed:', err);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAdmin(currentUser?.email === ADMIN_EMAIL);
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAdmin && showAdminPanel) {
      let active = true;

      const mapRowToView = (row: any) => ({
        id: row.id,
        status: row.status ?? 'pending',
        submittedAt: row.submitted_at ? new Date(row.submitted_at) : null,
        fullName: row.full_name ?? '',
        gender: row.gender ?? '',
        country: row.country ?? '',
        city: row.city ?? '',
        nationality: row.nationality ?? '',
        email: row.email ?? '',
        phone: row.phone ?? '',
        linkedin: row.linkedin ?? '',
        website: row.website ?? '',
        educationLevel: row.education_level ?? '',
        fieldOfStudy: row.field_of_study ?? '',
        currentOrganization: row.current_organization ?? '',
        currentRole: row.current_role ?? '',
        yearsExperience: row.years_experience ?? '',
        expertiseDomains: row.expertise_domains ?? [],
        technicalSkills: row.technical_skills ?? '',
        previousProjectTypes: row.previous_project_types ?? [],
        relevantExperience: row.relevant_experience ?? '',
        contributionTypes: row.contribution_types ?? [],
        availability: row.availability ?? '',
        motivation: row.motivation ?? '',
        values: row.values ?? '',
        interests: row.interests ?? [],
        cvLink: row.cv_link ?? '',
        publicationsLinks: row.publications_links ?? '',
        consent: row.consent ?? [],
      });

      const loadApplications = async () => {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (!active) return;

        if (error) {
          console.error('Erreur Supabase (applications):', error);
          return;
        }

        setApplications((data ?? []).map(mapRowToView));
      };

      void loadApplications();

      const channel = supabase
        .channel('applications-admin')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'applications' },
          () => void loadApplications(),
        )
        .subscribe();

      return () => {
        active = false;
        supabase.removeChannel(channel);
      };
    }
  }, [isAdmin, showAdminPanel]);

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        },
      });
    } catch (err) {
      console.error("Erreur de connexion:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setShowAdminPanel(false);
    } catch (err) {
      console.error("Erreur de déconnexion:", err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Le fichier est trop volumineux (max 5Mo)");
      return;
    }

    setCvFileName(file.name);
    setUploadProgress(1);

    const safeName = file.name.replace(/[^\w.\-]+/g, '_');
    const filePath = `cv/${Date.now()}_${crypto.randomUUID()}_${safeName}`;

    void (async () => {
      const { error } = await supabase.storage.from('cvs').upload(filePath, file, {
        upsert: false,
        contentType: file.type || undefined,
      });

      if (error) {
        console.error('Upload error:', error);
        setError("Erreur lors de l'upload du fichier.");
        setUploadProgress(null);
        return;
      }

      const { data } = supabase.storage.from('cvs').getPublicUrl(filePath);
      updateField('cvLink', data.publicUrl);
      setUploadProgress(100);
      window.setTimeout(() => setUploadProgress(null), 300);
    })().catch((err) => {
      console.error('Upload failed:', err);
      setError("Erreur lors de l'upload du fichier.");
      setUploadProgress(null);
    });
  };

  const handleNext = () => {
    if (step < SECTIONS.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const current = formData[field] as string[];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updateField(field, updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.from('applications').insert({
        status: 'pending',
        full_name: formData.fullName,
        gender: formData.gender,
        country: formData.country,
        city: formData.city,
        nationality: formData.nationality,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        website: formData.website,
        education_level: formData.educationLevel,
        field_of_study: formData.fieldOfStudy,
        current_organization: formData.currentOrganization,
        current_role: formData.currentRole,
        years_experience: formData.yearsExperience,
        expertise_domains: formData.expertiseDomains,
        technical_skills: formData.technicalSkills,
        previous_project_types: formData.previousProjectTypes,
        relevant_experience: formData.relevantExperience,
        contribution_types: formData.contributionTypes,
        availability: formData.availability,
        motivation: formData.motivation,
        values: formData.values,
        interests: formData.interests,
        cv_link: formData.cvLink,
        publications_links: formData.publicationsLinks,
        consent: formData.consent,
      });

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting application:", err);
      setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / SECTIONS.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full glass p-12 rounded-3xl text-center space-y-8 neon-border"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold text-zinc-900">Merci pour votre candidature !</h1>
          <p className="text-zinc-600 text-lg leading-relaxed">
            Notre équipe examinera votre profil et vous contactera si votre expertise correspond aux besoins des projets de CosmoLAB Hub Association.
          </p>
          <div className="pt-8 border-t border-zinc-200">
            <p className="text-red-500 font-medium italic">
              Ensemble, accélérons l’innovation scientifique, technologique et éducative.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-full hover:bg-red-500 transition-all duration-300"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-red-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-200 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <HeaderLogo />
          
          <div className="flex items-center gap-6">
            {isAdmin && (
              <button 
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                {showAdminPanel ? "Formulaire" : "Panel Admin"}
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-zinc-200" />
                <button onClick={handleLogout} className="text-zinc-500 hover:text-red-600 transition-colors">
                  <Zap className="w-5 h-5" />
                </button>
              </div>
            ) : isAdminMode ? (
              <button 
                onClick={handleLogin}
                className="px-6 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-600 transition-all"
              >
                Connexion Admin
              </button>
            ) : null}

            <div className="hidden md:block text-right border-l border-zinc-200 pl-6">
              <p className="text-xs text-zinc-400 uppercase tracking-widest">Temps estimé</p>
              <p className="text-sm font-medium">5 à 10 minutes</p>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {showAdminPanel && isAdmin ? (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-bold text-zinc-900">Candidatures</h2>
                    <p className="text-zinc-500 mt-2">Gestion des membres et consultants CCSB</p>
                  </div>
                  <div className="glass px-6 py-3 rounded-2xl">
                    <span className="text-2xl font-bold text-red-600">{applications.length}</span>
                    <span className="text-xs text-zinc-400 uppercase tracking-widest ml-3">Total</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {applications.map((app) => (
                    <div key={app.id} className="glass p-6 rounded-3xl hover:border-red-500/30 transition-all group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-zinc-900">{app.fullName}</h3>
                          <p className="text-zinc-500 text-sm">{app.email} • {app.currentRole} @ {app.currentOrganization}</p>
                        </div>
                        <div className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {app.status}
                        </div>
                      </div>
                      
                      <div className="mt-4 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-zinc-50 rounded-2xl">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Expertise</p>
                          <div className="flex flex-wrap gap-1">
                            {app.expertiseDomains?.slice(0, 3).map((d: string) => (
                              <span key={d} className="text-[10px] bg-white px-2 py-0.5 rounded border border-zinc-200">{d}</span>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-zinc-50 rounded-2xl">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Expérience</p>
                          <p className="text-xs font-medium">{app.yearsExperience}</p>
                        </div>
                        <div className="p-4 bg-zinc-50 rounded-2xl">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Contact</p>
                          <p className="text-xs font-medium">{app.phone}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between items-center">
                        <p className="text-[10px] text-zinc-400">
                          Soumis le {app.submittedAt ? app.submittedAt.toLocaleDateString() : ''}
                        </p>
                        <div className="flex gap-2">
                          {app.cvLink && (
                            <a href={app.cvLink} target="_blank" rel="noreferrer" className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                              <FileText className="w-4 h-4 text-zinc-500" />
                            </a>
                          )}
                          {app.linkedin && (
                            <a href={app.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                              <Linkedin className="w-4 h-4 text-zinc-500" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="text-center py-20 glass rounded-3xl">
                      <p className="text-zinc-400">Aucune candidature pour le moment.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : step === 0 ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-display font-bold leading-none">
                    Rejoignez le réseau <span className="text-red-500">CCSB</span>
                  </h2>
                  <p className="text-xl text-zinc-600 max-w-2xl">
                    Consultants Collaboratifs Spécialisés Bénévoles de CosmoLAB Hub Association.
                  </p>
                </div>

                <div className="glass p-8 rounded-3xl space-y-6">
                  <p className="text-lg leading-relaxed text-zinc-700">
                    Dans le cadre de sa politique d’ouverture à l’international, CosmoLAB Hub mobilise des experts volontaires afin d’accélérer le développement, l’implémentation et l’adoption de projets innovants.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { icon: Cpu, label: 'IA' },
                      { icon: Zap, label: 'STEAM' },
                      { icon: Leaf, label: 'Climat' },
                      { icon: Coins, label: 'FinTech' },
                      { icon: Palette, label: 'Créatif' },
                      { icon: Globe, label: 'Innovation' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-zinc-100 rounded-2xl border border-zinc-200">
                        <item.icon className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="group flex items-center gap-3 px-10 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all duration-300 transform hover:scale-105 shadow-[0_10px_20px_rgba(227,38,38,0.2)]"
                >
                  Commencer le formulaire
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* Section Header */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    {React.createElement(SECTIONS[step - 1].icon, { className: "w-7 h-7 text-red-500" })}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold mb-1">Section {step} / {SECTIONS.length}</p>
                    <h3 className="text-2xl md:text-3xl font-display font-bold truncate">{SECTIONS[step - 1].title}</h3>
                  </div>
                </div>

                <form onSubmit={step === SECTIONS.length ? handleSubmit : (e) => e.preventDefault()} className="space-y-8">
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <div className="grid gap-6">
                      <Field label="Nom et prénom" required>
                        <input 
                          type="text" 
                          value={formData.fullName} 
                          onChange={e => updateField('fullName', e.target.value)}
                          className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="Votre réponse"
                        />
                      </Field>
                      <Field label="Sexe">
                        <div className="flex flex-wrap gap-4">
                          {['Homme', 'Femme', 'Préfère ne pas préciser'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateField('gender', opt)}
                              className={`px-6 py-3 rounded-xl border transition-all ${formData.gender === opt ? 'bg-red-600 border-red-600 text-white font-bold' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Pays de résidence">
                          <input type="text" value={formData.country} onChange={e => updateField('country', e.target.value)} className="input-style" placeholder="Ex: France" />
                        </Field>
                        <Field label="Ville">
                          <input type="text" value={formData.city} onChange={e => updateField('city', e.target.value)} className="input-style" placeholder="Ex: Paris" />
                        </Field>
                      </div>
                      <Field label="Nationalité">
                        <input type="text" value={formData.nationality} onChange={e => updateField('nationality', e.target.value)} className="input-style" />
                      </Field>
                      <Field label="Adresse email" required>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
                          <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} className="input-style !pl-14" placeholder="email@exemple.com" />
                        </div>
                      </Field>
                      <Field label="Numéro WhatsApp / Téléphone">
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
                          <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="input-style !pl-14" placeholder="+33 6 ..." />
                        </div>
                      </Field>
                      <Field label="Profil LinkedIn">
                        <div className="relative">
                          <Linkedin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
                          <input type="url" value={formData.linkedin} onChange={e => updateField('linkedin', e.target.value)} className="input-style !pl-14" placeholder="https://linkedin.com/in/..." />
                        </div>
                      </Field>
                      <Field label="Site web ou portfolio">
                        <div className="relative">
                          <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
                          <input type="url" value={formData.website} onChange={e => updateField('website', e.target.value)} className="input-style !pl-14" placeholder="https://..." />
                        </div>
                      </Field>
                    </div>
                  )}

                  {/* Step 2: Academic & Professional */}
                  {step === 2 && (
                    <div className="grid gap-6">
                      <Field label="Niveau d’études">
                        <div className="flex flex-wrap gap-3">
                          {['Licence', 'Master', 'Doctorat (PhD)', 'Post-doctorat', 'Autre'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateField('educationLevel', opt)}
                              className={`px-5 py-3 rounded-xl border transition-all ${formData.educationLevel === opt ? 'bg-red-600 border-red-600 text-white font-bold' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Domaine principal de formation" description="Ex: Informatique, climatologie, ingénierie, finance, robotique, éducation, etc.">
                        <input type="text" value={formData.fieldOfStudy} onChange={e => updateField('fieldOfStudy', e.target.value)} className="input-style" />
                      </Field>
                      <Field label="Organisation actuelle">
                        <input type="text" value={formData.currentOrganization} onChange={e => updateField('currentOrganization', e.target.value)} className="input-style" />
                      </Field>
                      <Field label="Fonction actuelle" description="Ex: Chercheur, Ingénieur IA, Professeur, Entrepreneur, Consultant">
                        <input type="text" value={formData.currentRole} onChange={e => updateField('currentRole', e.target.value)} className="input-style" />
                      </Field>
                      <Field label="Nombre d’années d’expérience professionnelle">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['0 – 2 ans', '3 – 5 ans', '6 – 10 ans', '10 – 15 ans', '15 ans et plus'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateField('yearsExperience', opt)}
                              className={`px-4 py-3 rounded-xl border text-sm transition-all ${formData.yearsExperience === opt ? 'bg-red-600 border-red-600 text-white font-bold' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  )}

                  {/* Step 3: Expertise Domains */}
                  {step === 3 && (
                    <div className="grid gap-4">
                      <p className="text-sm text-zinc-500 mb-2 italic">Sélectionnez tous les domaines pertinents</p>
                      <div className="grid md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {EXPERTISE_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleArrayItem('expertiseDomains', opt)}
                            className={`flex items-center gap-3 p-4 rounded-2xl border text-left text-sm transition-all ${formData.expertiseDomains.includes(opt) ? 'bg-red-500/10 border-red-500 text-red-600' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200'}`}
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${formData.expertiseDomains.includes(opt) ? 'bg-red-500 border-red-500' : 'border-zinc-300'}`}>
                              {formData.expertiseDomains.includes(opt) && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Technical Skills */}
                  {step === 4 && (
                    <Field label="Quelles compétences techniques possédez-vous ?" description="Exemples : Python, TensorFlow, Unity, Arduino, SolidWorks, Data analytics, Simulation climatique, UX design, etc.">
                      <textarea 
                        value={formData.technicalSkills} 
                        onChange={e => updateField('technicalSkills', e.target.value)}
                        className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors min-h-[200px]"
                        placeholder="Détaillez vos compétences..."
                      />
                    </Field>
                  )}

                  {/* Step 5: Experiences */}
                  {step === 5 && (
                    <div className="grid gap-8">
                      <Field label="Avez-vous déjà travaillé sur des projets liés à :">
                        <div className="grid grid-cols-2 gap-3">
                          {PROJECT_TYPES.map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleArrayItem('previousProjectTypes', opt)}
                              className={`flex items-center gap-3 p-4 rounded-2xl border text-left text-sm transition-all ${formData.previousProjectTypes.includes(opt) ? 'bg-red-500/10 border-red-500 text-red-600' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}
                            >
                              <div className={`w-5 h-5 rounded flex items-center justify-center border ${formData.previousProjectTypes.includes(opt) ? 'bg-red-500 border-red-500' : 'border-zinc-300'}`}>
                                {formData.previousProjectTypes.includes(opt) && <CheckCircle className="w-3 h-3 text-white" />}
                              </div>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Décrivez brièvement votre expérience la plus pertinente">
                        <textarea 
                          value={formData.relevantExperience} 
                          onChange={e => updateField('relevantExperience', e.target.value)}
                          className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors min-h-[150px]"
                        />
                      </Field>
                    </div>
                  )}

                  {/* Step 6: Contribution */}
                  {step === 6 && (
                    <div className="grid gap-8">
                      <Field label="Sous quelle forme souhaitez-vous contribuer ?">
                        <div className="grid grid-cols-2 gap-3">
                          {CONTRIBUTION_TYPES.map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleArrayItem('contributionTypes', opt)}
                              className={`flex items-center gap-3 p-4 rounded-2xl border text-left text-sm transition-all ${formData.contributionTypes.includes(opt) ? 'bg-red-500/10 border-red-500 text-red-600' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}
                            >
                              <div className={`w-5 h-5 rounded flex items-center justify-center border ${formData.contributionTypes.includes(opt) ? 'bg-red-500 border-red-500' : 'border-zinc-300'}`}>
                                {formData.contributionTypes.includes(opt) && <CheckCircle className="w-3 h-3 text-white" />}
                              </div>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Combien de temps pouvez-vous consacrer à ces activités ?">
                        <div className="grid gap-3">
                          {['Contribution ponctuelle', '2 à 4 heures par mois', '5 à 10 heures par mois', 'Participation à des projets spécifiques'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateField('availability', opt)}
                              className={`px-6 py-4 rounded-2xl border text-left transition-all ${formData.availability === opt ? 'bg-red-600 border-red-600 text-white font-bold' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  )}

                  {/* Step 7: Motivation */}
                  {step === 7 && (
                    <div className="grid gap-8">
                      <Field label="Pourquoi souhaitez-vous rejoindre CosmoLAB Hub Association ?">
                        <textarea 
                          value={formData.motivation} 
                          onChange={e => updateField('motivation', e.target.value)}
                          className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors min-h-[150px]"
                        />
                      </Field>
                      <Field label="Quelles valeurs souhaitez-vous promouvoir à travers cette collaboration ?">
                        <textarea 
                          value={formData.values} 
                          onChange={e => updateField('values', e.target.value)}
                          className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors min-h-[150px]"
                        />
                      </Field>
                    </div>
                  )}

                  {/* Step 8: Network */}
                  {step === 8 && (
                    <Field label="Êtes-vous intéressé par :">
                      <div className="grid gap-3">
                        {INTEREST_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleArrayItem('interests', opt)}
                            className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${formData.interests.includes(opt) ? 'bg-red-500/10 border-red-500 text-red-600' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}
                          >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${formData.interests.includes(opt) ? 'bg-red-500 border-red-500' : 'border-zinc-300'}`}>
                              {formData.interests.includes(opt) && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                            <span className="font-medium">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </Field>
                  )}

                  {/* Step 9: Documents */}
                  {step === 9 && (
                    <div className="grid gap-8">
                      <Field label="CV ou résumé professionnel" description="Téléchargez votre CV (PDF, DOCX, max 5Mo) ou fournissez un lien.">
                        <div className="space-y-4">
                          {/* File Upload Area */}
                          <div className="relative group">
                            <input 
                              type="file" 
                              onChange={handleFileUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              accept=".pdf,.doc,.docx"
                            />
                            <div className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${uploadProgress !== null ? 'border-red-500 bg-red-500/5' : 'border-zinc-200 bg-zinc-100 group-hover:border-red-500/50 group-hover:bg-zinc-200'}`}>
                              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                                <FileText className={`w-6 h-6 ${uploadProgress !== null ? 'text-red-500 animate-pulse' : 'text-zinc-400'}`} />
                              </div>
                              <p className="text-sm font-medium text-zinc-700">
                                {cvFileName ? cvFileName : "Cliquez ou glissez votre CV ici"}
                              </p>
                              <p className="text-xs text-zinc-400 mt-1">PDF, DOCX jusqu'à 5Mo</p>
                              
                              {uploadProgress !== null && (
                                <div className="w-full max-w-xs mt-4">
                                  <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-red-500 transition-all duration-300" 
                                      style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-[10px] text-red-500 mt-2 text-center font-bold uppercase tracking-widest">Upload {Math.round(uploadProgress)}%</p>
                                </div>
                              )}

                              {formData.cvLink && uploadProgress === null && (
                                <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                                  <CheckCircle className="w-4 h-4" />
                                  Fichier prêt
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="h-px bg-zinc-200 flex-grow"></div>
                            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">OU</span>
                            <div className="h-px bg-zinc-200 flex-grow"></div>
                          </div>

                          {/* URL Input */}
                          <div className="relative">
                            <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
                            <input 
                              type="url" 
                              value={formData.cvLink} 
                              onChange={e => updateField('cvLink', e.target.value)} 
                              className="input-style !pl-14" 
                              placeholder="Lien vers votre CV (Google Drive, etc.)" 
                            />
                          </div>
                        </div>
                      </Field>
                      <Field label="Publications, projets ou réalisations (liens)">
                        <textarea 
                          value={formData.publicationsLinks} 
                          onChange={e => updateField('publicationsLinks', e.target.value)}
                          className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors min-h-[150px]"
                          placeholder="Listez les liens vers vos travaux..."
                        />
                      </Field>
                    </div>
                  )}

                  {/* Step 10: Consent */}
                  {step === 10 && (
                    <div className="space-y-8">
                      <div className="glass p-8 rounded-3xl space-y-6">
                        <h4 className="text-xl font-bold">Consentement</h4>
                        <div className="space-y-4">
                          {[
                            "Je confirme que mes informations sont exactes",
                            "Je souhaite rejoindre le réseau Consultants Collaboratifs Spécialisés Bénévoles (CCSB)",
                            "J’accepte de devenir membre de CosmoLAB Hub Association"
                          ].map((text, i) => (
                            <label key={i} className="flex items-start gap-4 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                checked={formData.consent[i] || false}
                                onChange={(e) => {
                                  const newConsent = [...formData.consent];
                                  newConsent[i] = e.target.checked;
                                  updateField('consent', newConsent);
                                }}
                                className="mt-1 w-5 h-5 rounded border-zinc-300 bg-zinc-100 text-red-500 focus:ring-red-500"
                              />
                              <span className="text-zinc-700 group-hover:text-zinc-900 transition-colors">{text}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm">
                          {error}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-10">
                    <button
                      type="button"
                      onClick={handleBack}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Précédent
                    </button>

                    {step === SECTIONS.length ? (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.consent.every(v => v === true)}
                        className={`flex items-center gap-3 px-10 py-4 bg-red-600 text-white font-bold rounded-full transition-all ${isSubmitting || !formData.consent.every(v => v === true) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500 hover:scale-105 shadow-[0_10px_20px_rgba(227,38,38,0.2)]'}`}
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Soumettre ma candidature'}
                        <Send className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-10 py-4 bg-zinc-900 text-white font-bold rounded-full hover:bg-red-600 transition-all duration-300 group"
                      >
                        Suivant
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-center pointer-events-none">
        <div className="glass px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold pointer-events-auto">
          &copy; 2026 CosmoLAB Hub Association
        </div>
      </footer>

      <style>{`
        .input-style {
          width: 100%;
          background-color: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          transition: all 0.3s ease;
          display: block;
        }
        .input-style:focus {
          outline: none;
          border-color: #e32626;
          background-color: rgba(0, 0, 0, 0.05);
          box-shadow: 0 0 15px rgba(227, 38, 38, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(227, 38, 38, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

function Field({ label, description, required, children }: { label: string, description?: string, required?: boolean, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-zinc-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>}
      {children}
    </div>
  );
}
