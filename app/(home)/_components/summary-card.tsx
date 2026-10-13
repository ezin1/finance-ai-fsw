import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransactions?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransactions,
}: SummaryCardProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-xl lg:text-2xl" : "text-2xl sm:text-3xl lg:text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton
            userCanAddTransactions={userCanAddTransactions}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
