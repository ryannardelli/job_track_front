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
    link?: string;
  }) => {
    try {
      setLoading(true);

      // 👇 apenas simulação (MVP UI)
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
              link: String(formData.get("link") || ""),
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
              placeholder="Ex: Front-end Developer"
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Link da vaga (opcional)
            </label>
            <input
              name="link"
              placeholder="https://..."
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </ModalCreateBase>
    </>
  );
}