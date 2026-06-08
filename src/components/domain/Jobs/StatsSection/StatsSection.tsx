import { StatsCard } from "@/components/domain/Jobs/StatsCard";
import { StatCardSkeleton } from "@/components/ui/Loading/StatCardSkeleton";
import { useDashboard } from "@/hooks/useDashboard";

const mapStatsToUI = (stats: any) => {
  if (!stats) return [];

  return [
    {
      label: "Total de Vagas",
      value: stats.total,
      sub: "Todas as candidaturas",
      icon: "💼",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Aplicadas",
      value: stats.applied.count,
      sub: `${stats.applied.percent}% do total`,
      icon: "🚀",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Entrevistas",
      value: stats.interview.count,
      sub: `${stats.interview.percent}% do total`,
      icon: "👥",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Propostas",
      value: stats.offer.count,
      sub: `${stats.offer.percent}% do total`,
      icon: "⭐",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Rejeitadas",
      value: stats.rejected.count,
      sub: `${stats.rejected.percent}% do total`,
      icon: "❌",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];
};

export function StatsSection() {
  const { stateDashboard } = useDashboard();

  const stats = mapStatsToUI(stateDashboard.studentStats);

  const isLoading = stateDashboard.loading;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}

      {!isLoading &&
        stats.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            sub={stat.sub}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
    </div>
  );
}