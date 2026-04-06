import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle, MessageSquare, Eye } from 'lucide-react';
import { useAdminTickets, useUpdateTicket } from '@/hooks/use-admin';
import { toast } from 'sonner';

const STATUS_TABS = ['all', 'open', 'in_progress', 'resolved', 'closed'];
const STATUS_COLORS: Record<string, string> = {
  open: 'bg-red-600',
  in_progress: 'bg-yellow-600',
  resolved: 'bg-green-600',
  closed: 'bg-neutral-600',
};
const TYPE_COLORS: Record<string, string> = {
  complaint: 'bg-red-600/20 text-red-400 border-red-600/30',
  feedback: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
};

export default function TicketsAdmin() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const { data: tickets, isLoading } = useAdminTickets(
    statusFilter === 'all' ? undefined : statusFilter
  );
  const updateTicket = useUpdateTicket();

  const handleUpdate = async () => {
    if (!selectedTicket) return;
    try {
      await updateTicket.mutateAsync({
        id: selectedTicket.id,
        ...(newStatus && { status: newStatus }),
        ...(adminNotes && { admin_notes: adminNotes }),
      });
      toast.success('Ticket updated');
      setSelectedTicket(null);
      setAdminNotes('');
      setNewStatus('');
    } catch {
      toast.error('Failed to update ticket');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Tickets & Feedback</h1>
        <span className="text-sm text-muted-foreground">
          {tickets?.length || 0} ticket{(tickets?.length || 0) !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_TABS.map((s) => (
          <Badge
            key={s}
            variant={statusFilter === s ? 'default' : 'outline'}
            className="cursor-pointer capitalize"
            onClick={() => setStatusFilter(s)}
          >
            {s === 'in_progress' ? 'In Progress' : s}
          </Badge>
        ))}
      </div>

      {/* Tickets list */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : tickets && tickets.length > 0 ? (
        <div className="space-y-3">
          {tickets.map((ticket: any) => (
            <Card
              key={ticket.id}
              className="p-4 bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedTicket(ticket);
                setAdminNotes(ticket.admin_notes || '');
                setNewStatus(ticket.status);
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {ticket.type === 'complaint' ? (
                      <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    )}
                    <Badge variant="outline" className={`text-[10px] ${TYPE_COLORS[ticket.type]}`}>
                      {ticket.type}
                    </Badge>
                    <Badge className={`${STATUS_COLORS[ticket.status]} text-white text-[10px]`}>
                      {ticket.status === 'in_progress' ? 'IN PROGRESS' : ticket.status.toUpperCase()}
                    </Badge>
                    {ticket.order_number && (
                      <span className="text-xs text-muted-foreground">
                        Order #{ticket.order_number}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground truncate">{ticket.subject}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{ticket.message}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">
                    {new Date(ticket.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{ticket.customer_name}</p>
                  <Eye className="h-4 w-4 text-muted-foreground mt-1 ml-auto" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 bg-card border-border text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No tickets found</p>
        </Card>
      )}

      {/* Ticket detail dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(v) => !v && setSelectedTicket(null)}>
        <DialogContent className="sm:max-w-lg bg-background border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTicket?.type === 'complaint' ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : (
                <MessageSquare className="h-5 w-5 text-blue-400" />
              )}
              {selectedTicket?.subject}
            </DialogTitle>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">From:</span>
                  <p className="font-medium">{selectedTicket.customer_name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium capitalize">{selectedTicket.type}</p>
                </div>
                {selectedTicket.customer_email && (
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{selectedTicket.customer_email}</p>
                  </div>
                )}
                {selectedTicket.customer_phone && (
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium">{selectedTicket.customer_phone}</p>
                  </div>
                )}
                {selectedTicket.order_number && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Order:</span>
                    <p className="font-medium">#{selectedTicket.order_number}</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Message:</span>
                <p className="text-sm text-foreground mt-1 bg-muted/30 p-3 rounded-lg whitespace-pre-wrap">
                  {selectedTicket.message}
                </p>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Update Status:</span>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="mt-1 bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Admin Notes:</span>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  className="mt-1 bg-card border-border"
                  rows={3}
                />
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleUpdate}
                disabled={updateTicket.isPending}
              >
                {updateTicket.isPending ? 'Updating...' : 'Update Ticket'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
