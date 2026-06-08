import { useState } from "react";
import { ModalShowBase } from "@/components/ui/Modal/ModalShowBase";
import { formatDate } from "@/utils/formatDate";
import { 
  Briefcase, Calendar, Link2, FileText, CheckCircle, 
  Fingerprint, User, Clock, Edit2, Trash2, X, Save 
} from "lucide-react";

interface ApplicationData {
  uuid: string;
  company: string;
  position: string;
  vacancyUrl: string | null;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | string;
  applicationDate: string | null;
  notes: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  application: ApplicationData | null;
  onClose: () => void;
  onEdit: (updatedData: ApplicationData) => void;
  onDelete: (uuid: string) => void;
}

const getStatusBadgeConfig = (status: string) => {
  switch (status?.toUpperCase()) {
    case "OFFER":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
    case "REJECTED":
      return "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900";
    case "INTERVIEW":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900";
  }
};

export function ApplicationDetailsModal({
  isOpen,
  application,
  onClose,
  onEdit,
  onDelete,
}: ApplicationDetailsModalProps) {
  if (!application) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ApplicationData>({ ...application });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClose = () => {
    setIsEditing(false);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value === "" ? null : value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui dispara a função que vem do componente pai para atualizar na API
    onEdit(formData);
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    // Aqui dispara a função que vem do componente pai para deletar na API
    onDelete(application.uuid);
    handleClose();
  };

  return (
    <ModalShowBase isOpen={isOpen} title={isEditing ? "Editar Candidatura" : application.position} onClose={handleClose}>
      
      {/* HEADER DE AÇÕES DO MODAL (UX Fluida para alternar estados) */}
      <div className="flex justify-end gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-zinc-800">
        {!isEditing && !showDeleteConfirm && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> Editar
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 dark:text-rose-400 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Excluir
            </button>
          </>
        )}
      </div>

      {/* TELA DE CONFIRMAÇÃO DE EXCLUSÃO (Segurança de UX) */}
      {showDeleteConfirm ? (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-rose-900 dark:text-rose-400">Tem certeza que deseja excluir?</h4>
            <p className="text-xs text-rose-700 dark:text-rose-300/80 mt-1">
              Esta ação não poderá ser desfeita. A candidatura para <span className="font-bold">{application.company}</span> será permanentemente removida.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 dark:bg-zinc-800 dark:text-gray-300 dark:border-zinc-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600"
            >
              Confirmar Exclusão
            </button>
          </div>
        </div>
      ) : isEditing ? (
        
        /* -----------------------------------------
           MODO EDIÇÃO (Formulário pronto para API)
           ----------------------------------------- */
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Cargo</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Empresa</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="APPLIED">APPLIED</option>
                <option value="INTERVIEW">INTERVIEW</option>
                <option value="OFFER">OFFER</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Data da Candidatura</label>
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate ? formData.applicationDate.split("T")[0] : ""}
                onChange={handleInputChange}
                className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Link da Vaga</label>
            <input
              type="url"
              name="vacancyUrl"
              value={formData.vacancyUrl || ""}
              onChange={handleInputChange}
              placeholder="https://..."
              className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Observações</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes || ""}
              onChange={handleInputChange}
              className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => { setIsEditing(false); setFormData({ ...application }); }}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" /> Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" /> Salvar Alterações
            </button>
          </div>
        </form>
      ) : (
        
        /* -----------------------------------------
           MODO VISUALIZAÇÃO (Todos os dados exibidos)
           ----------------------------------------- */
        <div className="space-y-5">
          {/* Dados Principais do Negócio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800/80">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-gray-500 border border-gray-100 dark:border-zinc-700">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Empresa</span>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{application.company}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-gray-500 border border-gray-100 dark:border-zinc-700">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mt-0.5 ${getStatusBadgeConfig(application.status)}`}>
                  {application.status}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-gray-500 border border-gray-100 dark:border-zinc-700">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Data da candidatura</span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {application.applicationDate ? formatDate(application.applicationDate) : "Não informada"}
                </p>
              </div>
            </div>
          </div>

          {/* Link da Vaga */}
          <div className="px-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Link2 className="w-3.5 h-3.5" /> Link da vaga
            </h4>
            {application.vacancyUrl ? (
              <a
                href={application.vacancyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
              >
                Abrir link de origem do anúncio
              </a>
            ) : (
              <p className="text-sm text-gray-400 italic">Nenhum link adicionado.</p>
            )}
          </div>

          {/* Observações */}
          <div className="px-1 border-t border-gray-100 dark:border-zinc-800 pt-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5" /> Observações
            </h4>
            {application.notes ? (
              <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50/60 dark:bg-zinc-900/40 p-3 rounded-lg leading-relaxed whitespace-pre-line border border-gray-100/50 dark:border-zinc-800/50">
                {application.notes}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">Sem observações.</p>
            )}
          </div>

          {/* -----------------------------------------
             DADOS TÉCNICOS/SISTEMA (Exibindo o restante do JSON)
             ----------------------------------------- */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-2.5 bg-gray-50/40 dark:bg-zinc-900/20 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Metadados do Registro</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <Fingerprint className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span className="truncate"><strong>UUID:</strong> {application.uuid}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <User className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span className="truncate"><strong>User ID:</strong> {application.userId}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-[11px] sm:col-span-2 justify-between mt-1 pt-2 border-t border-dashed border-gray-200 dark:border-zinc-800">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Criado em: {formatDate(application.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Atualizado em: {formatDate(application.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalShowBase>
  );
}