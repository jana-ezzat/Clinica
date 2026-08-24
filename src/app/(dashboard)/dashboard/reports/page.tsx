// app/dashboard/reports/page.tsx
import StatCard from "@/modules/dashboard/components/molecules/StatCard";
import WelcomeBanner from "@/modules/dashboard/components/molecules/WelcomeBanner";
import { reportStatCards } from "@/modules/dashboard/lib/mockData";
import ReportsFilters from "@/modules/dashboard/reports/components/organisms/ReportsFilters";
import ReportsTable from "@/modules/dashboard/reports/components/organisms/ReportsTable";
import { CalendarDays, Siren, Users, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

const reportStatIcons = [
    Users,
    CalendarDays,
    Wallet,
    Siren,
];
const page = () => {
    const t = useTranslations("reports");
    return (
        <div className="space-y-9">
            <div className="flex flex-col gap-4 sm:flex-row">
                <WelcomeBanner doctorName="د/ أحمد محمد" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {reportStatCards.map((stat, i) => (
                    <StatCard
                        key={stat.label}
                        icon={reportStatIcons[i]}
                        {...stat}
                    />
                ))}
            </div>

            <ReportsFilters />
            <ReportsTable />
        </div>
    );
}

export default page;