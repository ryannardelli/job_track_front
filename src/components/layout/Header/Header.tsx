import { ButtonNewJob } from "@/components/ui/Button/ButtonNewJob";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/getInitials";
import { Plus } from "lucide-react";

export function Header() {
    const { state, logout } = useAuth();
    const user = state.user;

    const name = user?.name;

    const handleLogout = () => {
        logout();
    };

    return(
         <header className="p-6 bg-slate-50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shrink-0 border-b border-slate-200/50">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 tracking-tight">Minhas Vagas</h1>
          <p className="text-sm text-slate-500">Acompanhe o andamento de todas as suas candidaturas</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <ButtonNewJob
            variant="primary"
            icon={<Plus size={14} />}
            onClick={() => setIsOpen(true)}
          >
            Nova vaga
          </ButtonNewJob>

          <div className="h-6 w-[1px] bg-slate-300 hidden sm:block" />

          <div className="flex items-center gap-3 pl-1 group relative">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-sm text-slate-600">
              {getInitials(name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{name}</p>
              <button 
                onClick={handleLogout}
                className="text-[11px] cursor-pointer text-red-500 hover:text-red-700 hover:underline font-medium block text-left transition-colors"
              >
                Sair do sistema
              </button>
            </div>
          </div>

        </div>
      </header>
    );
}