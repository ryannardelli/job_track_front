import { ModalCreateBase } from "@/components/ui/Modal/ModalCreateBase";
import { MotionContainer } from "@/components/ui/Motion/MotionContainer";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationFormData, ApplicationSchema } from "@/schemas/Applications/ApplicationsSchema";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: ApplicationFormData) => void;
  isLoading?: boolean;
}

export function CreateJobModal({
  isOpen,
  onClose,
  onCreate,
  isLoading,
}: CreateJobModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      company: "",
      position: "",
      vacancyUrl: "",
      status: "WISHLIST",
      applicationDate: "",
      notes: "",
    },
  });

  const onFormSubmit = (data: CreateJobFormData) => {
    onCreate(data);

    reset();

    onClose();
  };

  return (
    <ModalCreateBase
      isOpen={isOpen}
      title="Adicionar nova vaga"
      onClose={onClose}
      onCreate={handleSubmit(onFormSubmit)}
      isLoading={isLoading}
    >
      <MotionContainer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">
              Empresa
            </label>

            <input
              {...register("company")}
              placeholder="Ex: Google"
              className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.company && (
              <span className="text-sm text-red-500">
                {errors.company.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">
              Cargo
            </label>

            <input
              {...register("position")}
              placeholder="Ex: Desenvolvedor Full Stack"
              className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.position && (
              <span className="text-sm text-red-500">
                {errors.position.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">
              Link da vaga (opcional)
            </label>

            <input
              type="url"
              {...register("vacancyUrl")}
              placeholder="https://careers.empresa.com/vaga"
              className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.vacancyUrl && (
              <span className="text-sm text-red-500">
                {errors.vacancyUrl.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600">
                Status
              </label>

              <select
                {...register("status")}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="text-sm text-slate-600">
                Data da candidatura
              </label>

              <input
                type="date"
                {...register("applicationDate")}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.applicationDate && (
                <span className="text-sm text-red-500">
                  {errors.applicationDate.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">
              Observações (opcional)
            </label>

            <textarea
              {...register("notes")}
              rows={4}
              placeholder="Ex: Vaga encontrada pelo LinkedIn..."
              className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {errors.notes && (
              <span className="text-sm text-red-500">
                {errors.notes.message}
              </span>
            )}
          </div>
        </form>
      </MotionContainer>
    </ModalCreateBase>
  );
}