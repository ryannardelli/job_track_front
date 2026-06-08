import { useRef, useState } from "react";
import { ModalCreateBase } from "@components/ui/Modal/ModalCreateBase";
import { ButtonNewJob } from "@/components/ui/Button/ButtonNewJob";

export function CreateJobButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSaveTrigger = () => {
    if (!loading) {
      formRef.current?.requestSubmit();
    }
  };

  const onFormSubmit = async (data: {
    company: string;
    position: string;
    vacancyUrl?: string;
    status: string;
    applicationDate: string;
    notes?: string;
  }) => {
    try {
      setLoading(true);

      console.log("Nova vaga criada:", data);

      alert("Vaga criada com sucesso!");
      setIsOpen(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar vaga.";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonNewJob
        variant="dashed"
        icon={<span className="text-base font-bold">+</span>}
        onClick={() => setIsOpen(true)}
      >
        Nova Vaga
      </ButtonNewJob>

      <ModalCreateBase
        title="Adicionar nova vaga"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleSaveTrigger}
        isLoading={loading}
      >
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);

            const data = {
              company: String(formData.get("company")),
              position: String(formData.get("position")),
              vacancyUrl: String(formData.get("vacancyUrl") || ""),
              status: String(formData.get("status")),
              applicationDate: String(formData.get("applicationDate")),
              notes: String(formData.get("notes") || ""),
            };

            onFormSubmit(data);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Empresa
            </label>
            <input
              name="company"
              required
              placeholder="Ex: Google"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Cargo
            </label>
            <input
              name="position"
              required
              placeholder="Ex: Desenvolvedor Full Stack"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Link da vaga (opcional)
            </label>
            <input
              type="url"
              name="vacancyUrl"
              placeholder="https://careers.empresa.com/vaga"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Status
              </label>
              <select
                name="status"
                defaultValue="WISHLIST"
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WISHLIST">Wishlist</option>
                <option value="APPLIED">Aplicada</option>
                <option value="INTERVIEW">Entrevista</option>
                <option value="OFFER">Proposta</option>
                <option value="REJECTED">Rejeitada</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Data da candidatura
              </label>
              <input
                type="date"
                name="applicationDate"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Observações (opcional)
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Ex: Vaga encontrada pelo LinkedIn. Requisitos compatíveis com meu perfil..."
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </form>
      </ModalCreateBase>
    </>
  );
}