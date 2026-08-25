import WelcomeBanner from "@/modules/dashboard/components/molecules/WelcomeBanner";
import ReportsFilters from "@/modules/dashboard/reports/components/organisms/ReportsFilters";
import ReportsTable from "@/modules/dashboard/reports/components/organisms/ReportsTable";
import ReportsGrid from "../components/molecules/ReportsGrid";
import type { StatCardData } from "@/modules/dashboard/lib/mockData";

interface ReportsTemplateProps {
  doctorName: string;
  stats: StatCardData[];
}

const ReportsTemplate = ({ doctorName, stats }: ReportsTemplateProps) => {
  return (
    <div className="space-y-9">
      <WelcomeBanner doctorName={doctorName} />
      <ReportsGrid stats={stats} />
      <ReportsFilters />
      <ReportsTable />
    </div>
  );
};

export default ReportsTemplate;
