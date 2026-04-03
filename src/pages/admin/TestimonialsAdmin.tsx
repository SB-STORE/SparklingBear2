import { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAdminTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '@/hooks/use-admin';
import { toast } from 'sonner';

export default function TestimonialsAdmin() {
  const { data: testimonials, isLoading } = useAdminTestimonials();
  const createItem = useCreateTestimonial();
  const updateItem = useUpdateTestimonial();
  const deleteItem = useDeleteTestimonial();
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ customer_name: '', rating: 5, text: '', is_featured: false });

  const openNew = () => {
    setEditing(null);
    setForm({ customer_name: '', rating: 5, text: '', is_featured: false });
    setEditOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ customer_name: item.customer_name, rating: item.rating, text: item.text, is_featured: item.is_featured });
    setEditOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = { ...form, is_active: true };
      if (editing) {
        await updateItem.mutateAsync({ id: editing.id, ...payload });
        toast.success('Testimonial updated');
      } else {
        await createItem.mutateAsync(payload);
        toast.success('Testimonial created');
      }
      setEditOpen(false);
    } catch { toast.error('Failed to save testimonial'); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem.mutateAsync(id);
      toast.success('Testimonial deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit' : 'Add'} Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Customer Name</Label>
                <Input value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="bg-background border-border mt-1" />
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                      <Star className={`h-6 w-6 ${n <= form.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Review Text</Label>
                <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="bg-background border-border mt-1" rows={4} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} />
                <Label>Featured</Label>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleSave}>
                {editing ? 'Save Changes' : 'Create Testimonial'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : (
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Rating</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Review</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Featured</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials?.map((t: any) => (
                  <tr key={t.id} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground font-medium">{t.customer_name}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">{t.text}</td>
                    <td className="py-3 px-4 text-center">
                      <Switch
                        checked={t.is_featured}
                        onCheckedChange={async (v) => {
                          await updateItem.mutateAsync({ id: t.id, is_featured: v });
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(t.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
