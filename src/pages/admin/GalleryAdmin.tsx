import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAdminGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem } from '@/hooks/use-admin';
import { toast } from 'sonner';

export default function GalleryAdmin() {
  const { data: items, isLoading } = useAdminGallery();
  const createItem = useCreateGalleryItem();
  const updateItem = useUpdateGalleryItem();
  const deleteItem = useDeleteGalleryItem();
  const [editOpen, setEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({ title: '', type: 'image' as string, thumbnail_url: '', media_url: '', display_order: 0 });

  const openNew = () => {
    setEditingItem(null);
    setForm({ title: '', type: 'image', thumbnail_url: '', media_url: '', display_order: 0 });
    setEditOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      type: item.type,
      thumbnail_url: item.thumbnail_url || '',
      media_url: item.media_url || '',
      display_order: item.display_order,
    });
    setEditOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: form.title,
        type: form.type,
        thumbnail_url: form.thumbnail_url || null,
        media_url: form.media_url || null,
        slide_urls: [],
        display_order: form.display_order,
        is_active: true,
      };
      if (editingItem) {
        await updateItem.mutateAsync({ id: editingItem.id, ...payload });
        toast.success('Gallery item updated');
      } else {
        await createItem.mutateAsync(payload);
        toast.success('Gallery item created');
      }
      setEditOpen(false);
    } catch { toast.error('Failed to save gallery item'); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem.mutateAsync(id);
      toast.success('Gallery item deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Gallery Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-background border-border mt-1" />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="bg-background border-border mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="slideshow">Slideshow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Thumbnail URL</Label>
                <Input value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} className="bg-background border-border mt-1" />
              </div>
              <div>
                <Label>Media URL</Label>
                <Input value={form.media_url} onChange={(e) => setForm({ ...form, media_url: e.target.value })} className="bg-background border-border mt-1" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="bg-background border-border mt-1" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleSave}>
                {editingItem ? 'Save Changes' : 'Create Item'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-lg" />)}
        </div>
      ) : items && items.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item: any) => (
            <Card key={item.id} className="bg-card border-border overflow-hidden">
              <div className="h-40 bg-muted flex items-center justify-center">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-sm">No thumbnail</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm truncate">{item.title}</h3>
                  <Badge variant="outline" className="text-xs">{item.type}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                    <Pencil className="h-3 w-3 mr-1" />Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-3 w-3 mr-1" />Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-12">No gallery items yet</p>
      )}
    </div>
  );
}
