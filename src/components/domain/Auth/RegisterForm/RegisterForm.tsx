import { showMessage } from "@/adapters/showMessage";
import { RouterLink } from "@/components/ui/Navigation/RouterLink";
import { useAuth } from "@/hooks/useAuth";
import { RegisterFormData, RegisterSchema } from "@/schemas/Auth/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const { registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    showMessage.dismiss();

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      showMessage.success("Conta criada com sucesso!");

      reset();
    } catch (err: any) {
      console.error(err);

      showMessage.error(
        err?.response?.data?.message ||
          "Erro ao criar conta."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Crie sua conta
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Comece a sua jornada conosco hoje mesmo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Nome completo
              </label>

              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <User size={18} />
                </div>

                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-950 dark:border-slate-700 dark:text-white"
                />
              </div>

              <p className="text-sm text-red-500 mt-2">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                E-mail
              </label>

              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>

                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-950 dark:border-slate-700 dark:text-white"
                />
              </div>

              <p className="text-sm text-red-500 mt-2">
                {errors.email?.message}
              </p>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Senha
              </label>

              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>

                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-950 dark:border-slate-700 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="text-sm text-red-500 mt-2">
                {errors.password?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Confirmar senha
              </label>

              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>

                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-950 dark:border-slate-700 dark:text-white"
                />
              </div>

              <p className="text-sm text-red-500 mt-2">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-sm shadow-indigo-600/10 cursor-pointer"
          >
            {isSubmitting ? "Criando conta..." : "Criar conta"}

            {!isSubmitting && (
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Já tem uma conta?{" "}
          <RouterLink
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Faça login
          </RouterLink>
        </p>
      </div>
    </div>
  );
}