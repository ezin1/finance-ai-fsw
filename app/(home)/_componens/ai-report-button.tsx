import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { FileText } from "lucide-react";

const AiReportButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="gap-2 border-none bg-transparent pr-4 text-sm font-bold">
          Relatório IA
          <FileText />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default AiReportButton;
