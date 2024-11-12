import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_componens/summary-cards";
import TimeSelect from "./_componens/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_componens/transaction-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_componens/expenses-per-category";
import LastTransactions from "./_componens/last-transactions";
import { Button } from "../_components/ui/button";
import { FileText } from "lucide-react";

interface HomeProps {
  searchParams: {
    month: string;
  };
}
const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboardData = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <Button className="gap-2 border-none bg-transparent pr-4 text-sm font-bold">
              Relatório IA
              <FileText />
            </Button>

            <TimeSelect />
          </div>
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboardData} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionPieChart {...dashboardData} />
              <ExpensesPerCategory
                expensesPerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>

          <LastTransactions lastTransactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
