import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { addResourceType } from '../services/learning-resources-service';
import { Button } from './ui/button';

interface ResourceTypeModalProps {
  open: boolean;
  onClose: () => void;
  onTypeAdded?: (typeId: string) => void;
}

export default function ResourceTypeModal({ open, onClose, onTypeAdded }: ResourceTypeModalProps) {
  const { user } = useAuth();
  const learnerId = user?.id;
  const [form, setForm] = useState({ name: '', units: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!learnerId) throw new Error('No learnerId');
      const res = await addResourceType(learnerId, { name: form.name, UnitType: form.units });
      if (onTypeAdded && res?.id) onTypeAdded(res.id);
      onClose();
    } catch (err: any) {
      console.error('Failed to add resource type:', err);
      setError('Failed to add resource type. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background text-foreground rounded-2xl shadow-xl w-full max-w-sm p-6 relative border border-border">
        <h2 className="text-lg font-bold mb-6">Create Resource Type</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Title of your Learning Resources"
              maxLength={100}
              required
            />
            <div className="text-xs text-muted-foreground text-right mt-1">{form.name.length}/100</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Units</label>
            <input
              name="units"
              value={form.units}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="ex. Hours, Chapters..."
              maxLength={100}
              required
            />
            <div className="text-xs text-muted-foreground text-right mt-1">{form.units.length}/100</div>
          </div>
          {error && <div className="text-destructive text-xs text-center mt-2">{error}</div>}
          <div className="flex justify-between gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="w-1/2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-1/2"
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 