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
  const [paymentOption, setPaymentOption] = useState<'spei' | 'mercadopago' | 'whatsapp'>('spei');
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
        `Hola, El Señor de los Arcanos / ARCANO. Me he registrado en la Academia Esotérica con el correo *${email}* para el curso: *${selectedCourse?.category} — ${selectedCourse?.title}* ($799 MXN). Solicito los datos de depósito/SPEI para activar mi acceso al aula virtual.`
      );
      window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${msg}`, '_blank');
    }

    setIsLoading(false);
    // Redirigir directamente a la sección de avance (panel del estudiante)
    router.push('/academia/mi-panel?bienvenido=1');
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
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-parchment">
          Inscripción a la Academia
        </h2>
        <p className="text-xs text-parchment-dim font-light max-w-sm mx-auto">
          Crea tu cuenta de estudiante y activa tu acceso al aula virtual con lecciones en video y manuales sagrados.
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
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-parchment-muted px-1">
            <span>
              Inversión: <strong className="text-gold">$799 MXN</strong>
            </span>
            {selectedCourse?.slug.includes('05') ? (
              <span className="text-gold font-semibold">★ Desbloquea Web con Dominio</span>
            ) : null}
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
            Método de Pago Preferido ($799 MXN)
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPaymentOption('spei')}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentOption === 'spei'
                  ? 'bg-gold/20 border-gold text-gold-light'
                  : 'bg-black/40 border-charcoal-border text-parchment-muted hover:border-gold/30'
              }`}
            >
              <div className="font-semibold text-xs">🏪 Spin OXXO</div>
              <div className="text-[10px] text-parchment-dim mt-0.5">Tienda / SPEI</div>
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
              <div className="font-semibold text-xs">💳 Mercado Pago</div>
              <div className="text-[10px] text-parchment-dim mt-0.5">SPEI / Saldo</div>
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
              <div className="font-semibold text-xs">🟢 WhatsApp</div>
              <div className="text-[10px] text-parchment-dim mt-0.5">Atención humana</div>
            </button>
          </div>

          {/* Ficha dinámica de datos bancarios oficiales */}
          <div className="mt-3 p-3.5 rounded-2xl bg-black/70 border border-gold/30 text-xs space-y-1.5 font-sans">
            {paymentOption === 'spei' && (
              <>
                <div className="font-serif font-bold text-gold-light flex items-center gap-1.5">
                  <span>🏪</span> Spin by OXXO ({brandConfig.payments.spinOxxo.modalidad})
                </div>
                <div className="text-parchment-dim text-[11px] font-mono space-y-1 pt-1">
                  <div><span className="text-parchment-muted font-sans">Número de Cuenta / Tarjeta:</span> <strong className="text-gold select-all font-bold">{brandConfig.payments.spinOxxo.cuenta}</strong></div>
                  <div><span className="text-parchment-muted font-sans">Titular / Beneficiario:</span> <strong className="text-parchment font-sans">{brandConfig.payments.titular}</strong></div>
                  <div><span className="text-parchment-muted font-sans">Monto exacto:</span> <strong className="text-emerald-400 font-sans">{brandConfig.payments.formattedPrice}</strong></div>
                  <div><span className="text-parchment-muted font-sans">Concepto del pago:</span> <strong className="text-gold-light font-sans">{selectedCourse?.title}</strong></div>
                </div>
              </>
            )}

            {paymentOption === 'mercadopago' && (
              <>
                <div className="font-serif font-bold text-gold-light flex items-center gap-1.5">
                  <span>💳</span> {brandConfig.payments.mercadoPago.banco} (Transferencia SPEI)
                </div>
                <div className="text-parchment-dim text-[11px] font-mono space-y-1 pt-1">
                  <div><span className="text-parchment-muted font-sans">Banco Destinatario:</span> {brandConfig.payments.mercadoPago.banco}</div>
                  <div><span className="text-parchment-muted font-sans">CLABE Interbancaria:</span> <strong className="text-gold select-all font-bold">{brandConfig.payments.mercadoPago.clabe}</strong></div>
                  <div><span className="text-parchment-muted font-sans">Titular / Beneficiario:</span> <strong className="text-parchment font-sans">{brandConfig.payments.titular}</strong></div>
                  <div><span className="text-parchment-muted font-sans">Monto exacto:</span> <strong className="text-emerald-400 font-sans">{brandConfig.payments.formattedPrice}</strong></div>
                  <div><span className="text-parchment-muted font-sans">Concepto del pago:</span> <strong className="text-gold-light font-sans">{selectedCourse?.title}</strong></div>
                </div>
              </>
            )}

            {paymentOption === 'whatsapp' && (
              <>
                <div className="font-serif font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>🟢</span> Registro y Validación por WhatsApp
                </div>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed pt-1">
                  Al completar tu registro se abrirá un chat directo con {brandConfig.payments.titular} solicitando la activación del curso <strong>{selectedCourse?.title}</strong> ({brandConfig.payments.formattedPrice}).
                </p>
              </>
            )}
          </div>

          <p className="text-[11px] text-parchment-muted/80 mt-2 leading-relaxed">
            * El pago es obligatorio para activar tu acceso a las clases. Tras completar tu registro, podrás ingresar al panel para confirmar tu pago y validar tu comprobante.
          </p>
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-3.5 rounded-2xl font-serif font-bold text-xs uppercase tracking-widest active:scale-98 transition-all disabled:opacity-50 bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian shadow-[0_0_25px_rgba(198,160,82,0.4)] hover:brightness-110"
        >
          {isLoading
            ? 'Registrando Estudiante...'
            : 'Registrarme y Proceder al Pago ($799 MXN) →'}
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
            href="/academia/login/"
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
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="sr-only">Inscripción a la Academia Esotérica — ARCANO</h1>
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
