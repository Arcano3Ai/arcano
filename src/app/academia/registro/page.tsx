'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';
import { LMS_COURSES } from '@/lib/academy/courseRepository';
import { brandConfig } from '@/config/brandConfig';

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCourseParam = searchParams.get('curso') || '';

  const { student, register } = useStudent();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(
    initialCourseParam || LMS_COURSES[0]?.id || 'tarot-01'
  );
  const [paymentOption, setPaymentOption] = useState<'spei' | 'mercadopago' | 'whatsapp' | 'demo'>('spei');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Si ya está autenticado, redirigir al panel o aula
  useEffect(() => {
    if (student) {
      router.push('/academia/mi-panel');
    }
  }, [student, router]);

  // Si el query param cambia, actualizar selección
  useEffect(() => {
    if (initialCourseParam && LMS_COURSES.some((c) => c.id === initialCourseParam)) {
      setSelectedCourseId(initialCourseParam);
    }
  }, [initialCourseParam]);

  const selectedCourse = LMS_COURSES.find((c) => c.id === selectedCourseId) || LMS_COURSES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Por favor, ingresa tu nombre completo.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    const result = await register(email, password, fullName, selectedCourseId);

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'No se pudo crear la cuenta.');
      return;
    }

    // Si eligió WhatsApp, abrimos la conversación con los datos
    if (paymentOption === 'whatsapp') {
      const msg = encodeURIComponent(
        `Hola, El Señor de los Arcanos / ARCANO. Me he registrado en la Academia Esotérica con el correo *${email}* para el curso: *${selectedCourse?.category} — ${selectedCourse?.title}* ($799 MXN). Solicito los datos de depósito para activar mi constelación.`
      );
      window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${msg}`, '_blank');
    }

    setIsLoading(false);
    // Redirigir al aula virtual del curso seleccionado
    router.push(`/academia/cursos/${selectedCourseId}/aprender`);
  };

  return (
    <div className="w-full max-w-lg bg-[#0c0916]/95 border border-gold/40 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(198,160,82,0.18)] relative overflow-hidden">
      {/* Resplandor áureo místico */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-gold/10 blur-3xl pointer-events-none" />

      {/* Cabecera */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-gold font-semibold block">
          ✦ INICIACIÓN EN ARCANO ✦
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-parchment">
          Inscripción a la Academia
        </h1>
        <p className="text-xs text-parchment-dim font-light max-w-sm mx-auto">
          Crea tu cuenta de estudiante y accede al aula virtual con lecciones en video y manuales sagrados.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs text-center font-sans">
          {errorMessage}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selector de Curso */}
        <div>
          <label className="block text-xs font-serif text-gold-light mb-1.5 uppercase tracking-wider">
            Curso de Inscripción
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-black/70 border border-gold/30 text-parchment text-sm focus:outline-none focus:border-gold transition-colors"
          >
            {LMS_COURSES.map((course) => (
              <option key={course.id} value={course.id} className="bg-obsidian-deep text-parchment">
                {course.category} — {course.title} ($799 MXN)
              </option>
            ))}
          </select>
          <div className="mt-1 flex items-center justify-between text-[11px] text-parchment-muted px-1">
            <span>Inversión universal: <strong className="text-gold">$799 MXN</strong></span>
            {selectedCourse?.slug.includes('05') && (
              <span className="text-gold font-semibold">★ Desbloquea Web Gratis</span>
            )}
          </div>
        </div>

        {/* Nombre Completo */}
        <div>
          <label className="block text-xs font-serif text-parchment-dim mb-1.5 uppercase tracking-wider">
            Nombre Completo
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ej. Valentina Morales"
            required
            className="w-full px-4 py-3 rounded-2xl bg-black/70 border border-gold/25 text-parchment text-sm placeholder-parchment-dim/40 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-xs font-serif text-parchment-dim mb-1.5 uppercase tracking-wider">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu-correo@ejemplo.com"
            required
            className="w-full px-4 py-3 rounded-2xl bg-black/70 border border-gold/25 text-parchment text-sm placeholder-parchment-dim/40 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-xs font-serif text-parchment-dim mb-1.5 uppercase tracking-wider">
            Contraseña Segura
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
            className="w-full px-4 py-3 rounded-2xl bg-black/70 border border-gold/25 text-parchment text-sm placeholder-parchment-dim/40 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Opciones de Modalidad / Pago */}
        <div className="pt-2">
          <label className="block text-xs font-serif text-parchment-dim mb-2 uppercase tracking-wider">
            Forma de Activación
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPaymentOption('spei')}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentOption === 'spei'
                  ? 'bg-gold/20 border-gold text-gold-light'
                  : 'bg-black/40 border-charcoal-border text-parchment-muted hover:border-gold/30'
              }`}
            >
              <div className="font-semibold">🏦 SPEI / OXXO</div>
              <div className="text-[10px] text-parchment-dim">Transferencia directa</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentOption('mercadopago')}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentOption === 'mercadopago'
                  ? 'bg-gold/20 border-gold text-gold-light'
                  : 'bg-black/40 border-charcoal-border text-parchment-muted hover:border-gold/30'
              }`}
            >
              <div className="font-semibold">💳 Mercado Pago</div>
              <div className="text-[10px] text-parchment-dim">Tarjetas y saldo</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentOption('whatsapp')}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentOption === 'whatsapp'
                  ? 'bg-gold/20 border-gold text-gold-light'
                  : 'bg-black/40 border-charcoal-border text-parchment-muted hover:border-gold/30'
              }`}
            >
              <div className="font-semibold">🟢 WhatsApp Tutor</div>
              <div className="text-[10px] text-parchment-dim">Atención humana</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentOption('demo')}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentOption === 'demo'
                  ? 'bg-gold/20 border-gold text-gold-light'
                  : 'bg-black/40 border-charcoal-border text-parchment-muted hover:border-gold/30'
              }`}
            >
              <div className="font-semibold">⚡ Pase de Cortesía</div>
              <div className="text-[10px] text-parchment-dim">Entrada inmediata</div>
            </button>
          </div>
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian font-serif font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(198,160,82,0.4)] hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Consagrando Alumno en el Templo...' : 'Completar Inscripción e Ingresar'}
        </button>
      </form>

      {/* Beneficio destacado del Nivel 5 */}
      <div className="mt-6 p-3.5 rounded-2xl bg-gold/10 border border-gold/30 flex items-center gap-3">
        <span className="text-2xl">🎁</span>
        <p className="text-[11px] text-parchment-dim leading-snug">
          <strong className="text-gold-light">Hito de Graduación:</strong> Al completar los 5 niveles de tu senda esotérica, recibes tu <strong>página web profesional con dominio propio incluido</strong> por 1 año.
        </p>
      </div>

      {/* Enlace a Login */}
      <div className="mt-6 text-center pt-4 border-t border-charcoal-border/60">
        <p className="text-xs text-parchment-muted">
          ¿Ya eres estudiante de ARCANO?{' '}
          <Link
            href="/academia/login"
            className="text-gold hover:text-gold-light font-serif font-semibold underline underline-offset-4 ml-1"
          >
            Iniciar Sesión →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-10 text-center text-gold font-serif">
            Cargando templo de iniciación...
          </div>
        }
      >
        <RegisterFormContent />
      </Suspense>
    </div>
  );
}
