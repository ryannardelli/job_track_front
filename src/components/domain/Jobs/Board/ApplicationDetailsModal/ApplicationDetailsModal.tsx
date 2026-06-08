import { ModalShowBase } from "@/components/ui/Modal/ModalShowBase";
import { formatDate } from "@/utils/formatDate";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  application: any | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ApplicationDetailsModal({
  isOpen,
  application,
  onClose,
  onEdit,
  onDelete,
}: ApplicationDetailsModalProps) {
  if (!application) return null;

  return (
    <ModalShowBase
      isOpen={isOpen}
      title={application.position}
      onClose={onClose}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold">Empresa</h4>
          <p>{application.company}</p>
        </div>

        <div>
          <h4 className="font-semibold">Status</h4>
          <p>{application.status}</p>
        </div>

        <div>
          <h4 className="font-semibold">Data da candidatura</h4>
          <p>
            {application.applicationDate
              ? formatDate(application.applicationDate)
              : "-"}
          </p>
        </div>

        {application.vacancyUrl && (
          <div>
            <h4 className="font-semibold">Link da vaga</h4>

            <a
              href={application.vacancyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Abrir vaga
            </a>
          </div>
        )}

        {application.notes && (
          <div>
            <h4 className="font-semibold">Observações</h4>
            <p>{application.notes}</p>
          </div>
        )}
      </div>
    </ModalShowBase>
  );
}