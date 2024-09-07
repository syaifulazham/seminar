// app/components/StatsPanelWrapper.tsx (Server Component)
import { getParticipantStats } from '@/lib/data';
import { StatsPanel } from './StatsPanel';

export const StatsPanelWrapper = async () => {
  const { statusCount, categoryCount, totalParticipants } = await getParticipantStats();

  const statusData = {
    Pending: statusCount.find((s) => s.status === 'Pending')?._count.status || 0,
    Approved: statusCount.find((s) => s.status === 'Approved')?._count.status || 0,
    UnderReview: statusCount.find((s) => s.status === 'UnderReview')?._count.status || 0,
  };

  const categoryData = {
    WithHRDCPhysical: categoryCount.find((c) => c.category === 'With HRDC - Physical')?._count.category || 0,
    WithHRDCOnline: categoryCount.find((c) => c.category === 'With HRDC - Online')?._count.category || 0,
    WithoutHRDCPhysical: categoryCount.find((c) => c.category === 'Without HRDC - Physical')?._count.category || 0,
    WithoutHRDCOnline: categoryCount.find((c) => c.category === 'Without HRDC - Online')?._count.category || 0,
  };

  return (
    <StatsPanel
      totalParticipants={totalParticipants}
      statusData={statusData}
      categoryData={categoryData}
    />
  );
};
