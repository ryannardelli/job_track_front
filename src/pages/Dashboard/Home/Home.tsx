import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { JobBoard } from "@/components/domain/Jobs/Board/JobBoard";
import { StatsSection } from "@/components/domain/Jobs/StatsSection";
import { Header } from "@/components/layout/Header/Header";
import { HomeContainer } from "@/components/ui/Container/HomeContainer";
import { ModalCreateBase } from "@/components/ui/Modal/ModalCreateBase";

import { useApplications } from "@/hooks/useApplications";
import { ApplicationSchema, ApplicationFormData } from "@/schemas/Applications/ApplicationsSchema";
import { showMessage } from "@/adapters/showMessage";

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { create } = useApplications();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      status: "WISHLIST",
      applicationDate: new Date().toISOString().split("T")[0],
    },
  });

  const onFormSubmit = async (data: ApplicationFormData) => {
    try {
      setLoading(true);

      const response = await create({
        company: data.company,
        position: data.position,
        vacancyUrl: data.vacancyUrl || undefined,
        status: data.status,
        applicationDate: data.applicationDate,
        notes: data.notes || undefined,
      });

      reset();
      setIsOpen(false);

      showMessage.success(response.message);
    } catch (err) {
      showMessage.error(
        err instanceof Error ? err.message : "Erro ao criar candidatura"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeContainer>
      <Header onOpenModal={() => setIsOpen(true)} />

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <StatsSection />
        <JobBoard />
      </div>

      <ModalCreateBase
        title="Adicionar nova vaga"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleSubmit(onFormSubmit)}
        isLoading={loading}
      >
       <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Empresa
            </label>

            <input
              {...register("company")}
              placeholder="Ex: Google"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.company && (
              <span className="text-sm text-red-500">
                {errors.company.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Cargo
            </label>

            <input
              {...register("position")}
              placeholder="Ex: Desenvolvedor Full Stack"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.position && (
              <span className="text-sm text-red-500">
                {errors.position.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Link da vaga (opcional)
            </label>

            <input
              type="url"
              {...register("vacancyUrl")}
              placeholder="https://careers.empresa.com/vaga"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.vacancyUrl && (
              <span className="text-sm text-red-500">
                {errors.vacancyUrl.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Status
              </label>

              <select
                {...register("status")}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WISHLIST">Wishlist</option>
                <option value="APPLIED">Aplicada</option>
                <option value="INTERVIEW">Entrevista</option>
                <option value="OFFER">Proposta</option>
                <option value="REJECTED">Rejeitada</option>
              </select>

              {errors.status && (
                <span className="text-sm text-red-500">
                  {errors.status.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Data da candidatura
              </label>

              <input
                type="date"
                {...register("applicationDate")}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.applicationDate && (
                <span className="text-sm text-red-500">
                  {errors.applicationDate.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Observações (opcional)
            </label>

            <textarea
              {...register("notes")}
              rows={4}
              placeholder="Ex: Vaga encontrada pelo LinkedIn..."
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {errors.notes && (
              <span className="text-sm text-red-500">
                {errors.notes.message}
              </span>
            )}
          </div>
        </form>
      </ModalCreateBase>
    </HomeContainer>
  );
}