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

interface LeaveUpgradePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeaveUpgradePopup({ open, onOpenChange }: LeaveUpgradePopupProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/dashboard/pricing');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Free Limit Reached</DialogTitle>
          <DialogDescription className="text-center">
            👉 You've used all free leave requests.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button 
            onClick={handleUpgrade}
            className="w-full"
          >
            👉 Upgrade Plan
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
