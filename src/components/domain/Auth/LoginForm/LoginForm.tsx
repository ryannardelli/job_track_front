import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

import { RouterLink } from '@/components/ui/Navigation/RouterLink';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
       navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-8 transition-all">

        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/img/logo.png"
            alt="JobTrack Logo"
            className="h-40 w-40 object-contain"
          />
          <p className="text-sm text-slate-500">
            Gerencie suas candidaturas e conquiste sua próxima vaga.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              E-mail
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>

              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Senha
              </label>

              <RouterLink
                href="#"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Esqueceu a senha?
              </RouterLink>
            </div>

            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-600/10 transition-all mt-2 cursor-pointer"
          >
            {state.loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Entrar na plataforma
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Não tem uma conta?{' '}
            <RouterLink
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Cadastre-se grátis
            </RouterLink>
          </p>
        </div>

      </div>
    </div>
  );
}