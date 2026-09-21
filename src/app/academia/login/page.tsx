'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';
import { brandConfig } from '@/config/brandConfig';

export default function LoginPage() {
  const router = useRouter();
  const { student, login, loginDemo } = useStudent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Si ya está logueado, redirigir al panel del estudiante
  React.useEffect(() => {
    if (student) {
      router.push('/academia/mi-panel');
    }
  }, [student, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Credenciales incorrectas. Verifica tu correo y contraseña.');
      return;
    }

    router.push('/academia/mi-panel');
  };

  const handleDemoAccess = () => {
    setIsLoading(true);
    loginDemo();
    setIsLoading(false);
    router.push('/academia/mi-panel');
  };

  const handleForgotPass = (e: React.MouseEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola, El Señor de los Arcanos / ARCANO. Deseo solicitar el restablecimiento de mi contraseña de estudiante para la cuenta vinculada a este número.`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0c0916]/95 border border-gold/40 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(198,160,82,0.18)] relative overflow-hidden">
        {/* Resplandor áureo decorativo */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gold/10 blur-3xl pointer-events-none" />

        {/* Cabecera ceremonial */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-gold font-semibold block">
            ✦ ACADEMIA ESOTÉRICA ARCANO ✦
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-parchment">
            Portal del Estudiante
          </h1>
          <p className="text-xs text-parchment-dim font-light">
            Ingresa a tu aula virtual para continuar tus lecciones y consultar tu avance sagrado.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs text-center font-sans">
            {errorMessage}
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-serif text-parchment-dim uppercase tracking-wider">
                Contraseña
              </label>
              <button
                type="button"
                onClick={handleForgotPass}
                className="text-[11px] text-gold hover:underline"
              >
                ¿La olvidaste?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-2xl bg-black/70 border border-gold/25 text-parchment text-sm placeholder-parchment-dim/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian font-serif font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(198,160,82,0.4)] hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Accediendo al Templo...' : 'Entrar a Mi Aula'}
          </button>
        </form>

        {/* Separador */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-charcoal-border/70" />
          </div>
          <span className="relative px-3 bg-[#0c0916] text-[10px] text-parchment-muted uppercase tracking-widest font-mono">
            O PRUEBA INMEDIATA
          </span>
        </div>

        {/* Botón de Acceso Demo para Pruebas Inmediatas */}
        <button
          type="button"
          onClick={handleDemoAccess}
          disabled={isLoading}
          className="w-full py-3 rounded-2xl border border-gold/40 bg-gold/10 text-gold-light font-serif text-xs font-semibold hover:bg-gold/20 transition-all flex items-center justify-center gap-2"
        >
          <span>🗝️</span> Acceso Demostración de Alumno
        </button>

        {/* Enlace a Registro */}
        <div className="mt-8 text-center pt-4 border-t border-charcoal-border/60">
          <p className="text-xs text-parchment-muted">
            ¿Aún no eres estudiante de ARCANO?{' '}
            <Link
              href="/academia/registro/"
              className="text-gold hover:text-gold-light font-serif font-semibold underline underline-offset-4 ml-1"
            >
              Inscribirme a un Curso →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
