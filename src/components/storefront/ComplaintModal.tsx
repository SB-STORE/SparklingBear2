import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import { useCreateTicket } from '@/hooks/use-admin';
import { toast } from 'sonner';

interface ComplaintModalProps {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
}

export function ComplaintModal({
  open,
  onClose,
  orderNumber,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
}: ComplaintModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const createTicket = useCreateTicket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await createTicket.mutateAsync({
        type: 'complaint',
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        order_id: orderId,
        order_number: orderNumber,
        subject,
        message,
      });
      toast.success('Complaint submitted! We\'ll get back to you soon.');
      setSubject('');
      setMessage('');
      onClose();
    } catch {
      toast.error('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            Report Issue — Order #{orderNumber}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Wrong item received, Damaged product..."
              required
              className="bg-card border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Describe the issue</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your issue in detail..."
              required
              rows={4}
              className="bg-card border-border"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={createTicket.isPending}
          >
            {createTicket.isPending ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
