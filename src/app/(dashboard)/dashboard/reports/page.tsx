import { reportStatCards } from "@/modules/dashboard/lib/mockData";
import ReportsTemplate from "@/modules/dashboard/reports/template/ReportsTemplate";

const Page = () => {
  return <ReportsTemplate doctorName="د/ أحمد محمد" stats={reportStatCards} />;
};

export default Page;
