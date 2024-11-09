import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

const SummaryCards = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <WalletIcon size={16} />
          <p className="text-white opacity-70">Saldo</p>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">R$2.700</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3">
        <SummaryCard
          icon={<PiggyBankIcon size={14} />}
          title="Saldo"
          amount={12500}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={14} />}
          title="Investido"
          amount={2500}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={14} />}
          title="Despesa"
          amount={2500}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
