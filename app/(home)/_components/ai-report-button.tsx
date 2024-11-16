import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";

import { BotIcon } from "lucide-react";

const AiReportButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 border-none bg-transparent pr-4 text-sm font-bold"
        >
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatório com insights
            sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button>Gerar relatório</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
