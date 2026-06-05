import { ModalCreateBase } from "@/components/ui/Modal/ModalCreateBase";
import { MotionContainer } from "@/components/ui/Motion/MotionContainer";
import { useState } from "react";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    company: string;
    position: string;
    link?: string;
  }) => void;
  isLoading?: boolean;
}

export function CreateJobModal({
  isOpen,
  onClose,
  onCreate,
  isLoading,
}: CreateJobModalProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [link, setLink] = useState("");

  const handleCreate = () => {
    if (!company.trim() || !position.trim()) return;

    onCreate({
      company,
      position,
      link: link || undefined,
    });

    setCompany("");
    setPosition("");
    setLink("");
  };

  return (
    <ModalCreateBase
      isOpen={isOpen}
      title="Adicionar nova vaga"
      onClose={onClose}
      onCreate={handleCreate}
      isLoading={isLoading}
    >
      <MotionContainer
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600 dark:text-slate-300">
            Empresa
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Ex: Google"
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600 dark:text-slate-300">
            Cargo
          </label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Ex: Front-end Developer"
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600 dark:text-slate-300">
            Link da vaga (opcional)
          </label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </MotionContainer>
    </ModalCreateBase>
  );
}