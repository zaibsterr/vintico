'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CreditPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreditPopup({ open, onOpenChange }: CreditPopupProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/dashboard/pricing');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Credits Exhausted</DialogTitle>
          <DialogDescription className="text-center">
            👉 You have used all your free credits.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button 
            onClick={handleUpgrade}
            className="w-full"
          >
            👉 Start with our plan
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
