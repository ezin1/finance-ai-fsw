import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";
import { redirect } from "next/navigation";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();

  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
};
