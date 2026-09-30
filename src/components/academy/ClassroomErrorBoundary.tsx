'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  slug?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ClassroomErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Aula Virtual — Excepción capturada en cliente:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07050d] text-parchment flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0e091b] border border-amber-500/40 text-center space-y-4 shadow-[0_0_50px_rgba(198,160,82,0.2)]">
            <span className="text-4xl block">✦</span>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Sincronización del Aula en Curso
            </h2>
            <p className="text-xs text-parchment-dim leading-relaxed">
              Hemos registrado tu avance correctamente. Presiona continuar para refrescar la lección activa en tu aula virtual.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
              >
                Continuar Estudiando ✦
              </button>
              <Link
                href="/academia/mi-panel/"
                className="w-full py-2.5 rounded-xl border border-charcoal-border hover:border-amber-500/40 text-xs font-serif text-parchment-muted hover:text-amber-200 transition-colors"
              >
                Volver a Mi Panel de Avance
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
