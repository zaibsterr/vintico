"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpgradePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
}

export default function UpgradePopup({
  open,
  onOpenChange,
  title = "Credits Exhausted",
  message = "You just used your free 3 messages.\nYou\u2019ve already seen how Vintico helps you recover business.\nUnlock more messages and full tools to grow faster.",
}: UpgradePopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="whitespace-pre-line pt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 pt-2">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => onOpenChange(false)}
          >
            <span>Starter</span>
            <span className="font-bold">$19/mo</span>
          </Button>
          <Button
            className="w-full justify-between bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onOpenChange(false)}
          >
            <span>Growth</span>
            <span className="font-bold">$49/mo</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => onOpenChange(false)}
          >
            <span>Pro</span>
            <span className="font-bold">$89/mo</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
