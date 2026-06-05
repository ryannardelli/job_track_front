import { StatsCard } from "@/components/domain/Jobs/StatsCard";
import { stats } from "@/components/domain/Jobs/StatsSection/mocks/stats";

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            sub={stat.sub}
            icon={stat.icon}
            bgColor={stat.bgColor}
          />
      ))}
    </div>
  );
}