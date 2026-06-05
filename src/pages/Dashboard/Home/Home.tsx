import React from 'react';

// --- MOCK DATA ---
const stats = [
  { label: 'Total de Vagas', value: 18, sub: 'Todas as candidaturas', icon: '💼', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { label: 'Aplicadas', value: 8, sub: '44% do total', icon: '🚀', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  { label: 'Entrevistas', value: 4, sub: '22% do total', icon: '👥', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
  { label: 'Propostas', value: 1, sub: '6% do total', icon: '⭐', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
  { label: 'Rejeitadas', value: 5, sub: '28% do total', icon: '❌', bgColor: 'bg-red-50', textColor: 'text-red-600' },
];

const columns = [
  {
    title: 'Wishlist',
    count: 3,
    color: 'bg-blue-600',
    cards: [
      { role: 'Desenvolvedor Front-end', company: 'Google', info: 'Salvo em 02/06/2026', badge: 'G', badgeBg: 'bg-gray-100 text-gray-800' },
      { role: 'UX/UI Designer', company: 'Airbnb', info: 'Salvo em 01/06/2026', badge: 'A', badgeBg: 'bg-red-100 text-red-500' },
      { role: 'Desenvolvedor React', company: 'Microsoft', info: 'Salvo em 31/05/2026', badge: 'M', badgeBg: 'bg-blue-100 text-blue-600' },
    ]
  },
  {
    title: 'Aplicadas',
    count: 4,
    color: 'bg-amber-500',
    cards: [
      { role: 'Desenvolvedor Fullstack', company: 'Nubank', info: 'Aplicada em 01/06/2026', badge: 'Nu', badgeBg: 'bg-purple-600 text-white' },
      { role: 'Front-end Developer', company: 'Stone', info: 'Aplicada em 30/05/2026', badge: 'S', badgeBg: 'bg-green-600 text-white' },
      { role: 'Software Engineer', company: 'Globo', info: 'Aplicada em 29/05/2026', badge: 'G', badgeBg: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' },
      { role: 'React Developer', company: 'Itaú', info: 'Aplicada em 28/05/2026', badge: 'I', badgeBg: 'bg-orange-600 text-white' },
    ]
  },
  {
    title: 'Entrevistas',
    count: 3,
    color: 'bg-purple-600',
    cards: [
      { role: 'Desenvolvedor Front-end', company: 'Mercado Livre', info: 'Entrevista em 05/06/2026', badge: 'ML', badgeBg: 'bg-yellow-400 text-slate-800' },
      { role: 'Fullstack Developer', company: 'QuintoAndar', info: 'Entrevista em 06/06/2026', badge: 'Q', badgeBg: 'bg-blue-600 text-white' },
      { role: 'Software Engineer', company: 'Amazon', info: 'Entrevista em 07/06/2026', badge: 'amzn', badgeBg: 'bg-black text-amber-500 text-[10px]' },
    ]
  },
  {
    title: 'Propostas',
    count: 1,
    color: 'bg-green-600',
    cards: [
      { role: 'Desenvolvedor React', company: 'Empresa X', info: 'Proposta recebida', badge: 'X', badgeBg: 'bg-black text-white' },
    ]
  },
  {
    title: 'Rejeitadas',
    count: 5,
    color: 'bg-red-500',
    cards: [
      { role: 'Back-end Developer', company: 'Empresa Y', info: 'Rejeitada em 01/06/2026', badge: 'Y', badgeBg: 'bg-red-500 text-white' },
      { role: 'Desenvolvedor PHP', company: 'Empresa Z', info: 'Rejeitada em 30/05/2026', badge: 'Z', badgeBg: 'bg-purple-500 text-white' },
      { role: 'Analista de Sistemas', company: 'Empresa A', info: 'Rejeitada em 29/05/2026', badge: 'A', badgeBg: 'bg-blue-500 text-white' },
      { role: 'DevOps Engineer', company: 'Empresa B', info: 'Rejeitada em 28/05/2026', badge: 'B', badgeBg: 'bg-orange-500 text-white' },
      { role: 'Data Analyst', company: 'Empresa C', info: 'Rejeitada em 27/05/2026', badge: 'C', badgeBg: 'bg-teal-600 text-white' },
    ]
  },
];

export function Home() {
  const handleLogout = () => {
    alert('Desconectando do JobTrack...');
    // Lógica de logout aqui
  };

  return (
    <div className="h-screen w-full bg-slate-50 font-sans text-slate-800 flex flex-col overflow-hidden">
      
      {/* --- HEADER PRINCIPAL --- */}
      <header className="p-6 bg-slate-50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shrink-0 border-b border-slate-200/50">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 tracking-tight">Minhas Vagas</h1>
          <p className="text-sm text-slate-500">Acompanhe o andamento de todas as suas candidaturas</p>
        </div>
        
        {/* Barra de Ferramentas do Topo */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Barra de Busca */}
          <div className="relative w-64">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar vaga ou empresa..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Filtros */}
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 font-medium transition-colors">
            <span>⏳</span> Filtros
          </button>
          
          {/* Nova Vaga */}
          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <span className="text-base font-bold">+</span> Nova Vaga
          </button>

          {/* Divisor Visual */}
          <div className="h-6 w-[1px] bg-slate-300 hidden sm:block" />

          {/* --- BLOCO DE USUÁRIO COM OPÇÃO DE SAIR --- */}
          <div className="flex items-center gap-3 pl-1 group relative">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center font-bold text-sm text-slate-600">
              JS
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">João Silva</p>
              <button 
                onClick={handleLogout}
                className="text-[11px] text-red-500 hover:text-red-700 hover:underline font-medium block text-left transition-colors"
              >
                Sair do sistema
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* --- CORPO DO PAINEL (Scrollável) --- */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        
        {/* Indicadores / Estatísticas superiores */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center text-lg`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Quadro Kanban de Vagas */}
        <div className="flex gap-4 overflow-x-auto pb-4 items-start h-[calc(100vh-240px)] min-h-[450px]">
          {columns.map((col, idx) => (
            <div key={idx} className="w-[290px] bg-slate-100/70 rounded-xl p-3 flex flex-col shrink-0 h-full max-h-full">
              
              {/* Header da Coluna */}
              <div className="flex items-center justify-between mb-3 px-1 shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <span className="font-bold text-sm text-slate-800">{col.title}</span>
                </div>
                <span className="bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {col.count}
                </span>
              </div>

              {/* Área interna de Cards com Scroll Próprio */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 Custom-scrollbar">
                {col.cards.map((card, cIdx) => (
                  <div key={cIdx} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all cursor-pointer relative group">
                    <h4 className="font-bold text-[13px] text-slate-800 leading-snug pr-6">{card.role}</h4>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500">{card.company}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{card.info}</p>
                      </div>
                      
                      {/* Badge / Logo da Empresa */}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${card.badgeBg}`}>
                        {card.badge}
                      </div>
                    </div>

                    {/* Ícone de bookmark simulado na coluna Wishlist */}
                    {col.title === 'Wishlist' && (
                      <span className="absolute top-4 right-4 text-blue-500 text-xs">🔖</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Botão inferior para Adicionar Vaga */}
              <button className="mt-3 w-full py-2 bg-transparent border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-500 hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all flex items-center justify-center gap-1 shrink-0">
                <span>+</span> Adicionar vaga
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}