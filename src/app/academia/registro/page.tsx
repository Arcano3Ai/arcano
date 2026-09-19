'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';

export default function RegisterPage() {
  const router = useRouter();
  const { student, login } = useStudent();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [discipline, setDiscipline] = useState('tarot');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Si ya está autenticado, redirigir al panel
  React.useEffect(() => {
    if (student) {
      router.push('/academia/mi-panel');
    }
  }, [student, router]);

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      login(email, fullName);
      setIsLoading(false);
      router.push('/academia/mi-panel');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
        {/* Adorno místico superior */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-amber-400 font-semibold block">
            ✦ INICIACIÓN EN ARCANO ✦
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            Registro de Estudiante
          </h1>
          <p className="text-xs text-slate-300 font-light">
            Únete a la academia esotérica y desbloquea el acceso a tus clases y guías ceremoniales.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {errorMessage}
          </div>
        )}

        {/* Formulario de Registro */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-serif text-slate-300 mb-1.5 uppercase tracking-wider">
              Nombre Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej. Sofía Valenzuela"
              required
              className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-amber-500/20 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-slate-300 mb-1.5 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@ejemplo.com"
              required
              className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-amber-500/20 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-slate-300 mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-amber-500/20 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-serif text-slate-300 mb-1.5 uppercase tracking-wider">
              Disciplina de Interés Principal
            </label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-amber-500/20 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="tarot">Tarot Profesional (Los 78 Arcanos)</option>
              <option value="astrologia">Astrología & Cartas Natales</option>
              <option value="numerologia">Numerología Sagrada</option>
              <option value="reiki">Reiki Usui & Sanación Energética</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Consagrando Cuenta...' : 'Registrarme e Ingresar'}
          </button>
        </form>

        {/* Beneficio destacado */}
        <div className="mt-6 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3">
          <span className="text-xl">🎁</span>
          <p className="text-[11px] text-amber-200 leading-snug">
            <strong>Promoción Especial:</strong> Al completar los 5 niveles de cualquier disciplina, obtienes tu propia página web profesional gratis con dominio propio.
          </p>
        </div>

        {/* Enlace a Login */}
        <div className="mt-6 text-center pt-4 border-t border-amber-500/15">
          <p className="text-xs text-slate-400">
            ¿Ya tienes cuenta registrada?{' '}
            <Link
              href="/academia/login"
              className="text-amber-300 hover:text-amber-200 font-serif font-semibold underline underline-offset-4 ml-1"
            >
              Iniciar Sesión →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
