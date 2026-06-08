import { JobBoard } from '@/components/domain/Jobs/Board/JobBoard';
import { StatsSection } from '@/components/domain/Jobs/StatsSection';
import { Header } from '@/components/layout/Header/Header';
import { HomeContainer } from '@/components/ui/Container/HomeContainer';
import { useDashboard } from '@/hooks/useDashboard';

export function Home() {

  const { stateDashboard } = useDashboard();
  console.log(stateDashboard);

  return (
    <HomeContainer>
     <Header />
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <StatsSection />

        <JobBoard />
      </div>
    </HomeContainer>
  );
}