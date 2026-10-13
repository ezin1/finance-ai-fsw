import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transaction-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

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

  const userCanAddTransactions = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-4 md:p-6 lg:h-full lg:overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:h-full lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-6 lg:overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboardData}
              userCanAddTransactions={userCanAddTransactions}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:h-full lg:grid-rows-1 lg:overflow-hidden">
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
