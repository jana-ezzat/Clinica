import WelcomeBanner from "@/modules/dashboard/components/molecules/WelcomeBanner";
import ReportsFilters from "@/modules/dashboard/reports/components/organisms/ReportsFilters";
import ReportsTable from "@/modules/dashboard/reports/components/organisms/ReportsTable";
import StatsGrid from "@/shared/components/molecules/StatsGrid";
import { reportStatIcons } from "@/modules/dashboard/reports/lib/statIcons";
import type { StatCardData } from "@/modules/dashboard/lib/mockData";
import { getLocale, getTranslations } from "next-intl/server";

interface ReportsTemplateProps {
  doctorName: string;
  stats: StatCardData[];
}

const ReportsTemplate = async ({ doctorName, stats }: ReportsTemplateProps) => {
  const t = await getTranslations("dashboard");
  const locale = await getLocale();
  const tStats = await getTranslations("dashboard.home.stats");
  const translatedStats = stats.map(({ labelKey, ...stat }) => ({
    ...stat,
    label: tStats(labelKey),
  }));

  return (
    <div className="space-y-9">
      <WelcomeBanner doctorName={doctorName} />
      <StatsGrid
        stats={translatedStats}
        icons={reportStatIcons}
        comparisonLabel={t("lastMonth")}
        locale={locale}
      />
      <ReportsFilters />
      <ReportsTable />
    </div>
  );
};

export default ReportsTemplate;
