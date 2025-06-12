import React, { useState, useEffect } from 'react';
import ResourceTypeModal from './ResourceTypeModal';
import { useAuth } from '@/contexts/auth-context';
import { getResourceTypes, addLearningResource, updateLearningResource } from '../services/learning-resources-service';
import { Button } from './ui/button';

interface ResourceType {
  id: string;
  name: string;
  units: string;
}

interface LearningResource {
  id: string;
  title: string;
  typeId: string;
  typeName?: string;
  totalUnits: number;
  progress: number;
  status: 'Not-Started' | 'In-Progress' | 'Done' | 'On-Hold';
}

interface ResourceModalProps {
  open: boolean;
  onClose: () => void;
  onResourceAdded?: () => void;
  resource?: LearningResource | null;
  goalId?: string | number;
}

const STATUSES = ['Not-Started', 'In-Progress', 'Done', 'On-Hold'] as const;

export default function ResourceModal({ open, onClose, onResourceAdded, resource, goalId }: ResourceModalProps) {
  const { user } = useAuth();
  const learnerId = user?.id;

  const [form, setForm] = useState({
    title: '',
    typeId: '',
    totalUnits: '',
    progress: '',
    status: 'Not-Started',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [newTypeId, setNewTypeId] = useState<string | null>(null);

  useEffect(() => {
    if (resource) {
      setForm({
        title: resource.title,
        typeId: resource.typeId,
        totalUnits: resource.totalUnits.toString(),
        progress: resource.progress.toString(),
        status: resource.status,
      });
    } else {
      setForm({ title: '', typeId: '', totalUnits: '', progress: '', status: 'Not-Started' });
    }
  }, [resource, open]);

  // جلب الأنواع
  const fetchTypes = async () => {
    if (!learnerId) return;
    try {
      const data = await getResourceTypes(learnerId);
      setTypes(Array.isArray(data) ? data : []);
      // إذا أضفت نوع جديد، اختاره تلقائيًا
      if (newTypeId) {
        setForm((prev) => ({ ...prev, typeId: newTypeId }));
        setNewTypeId(null);
      }
    } catch {
      setTypes([]);
    }
  };

  useEffect(() => {
    if (open) fetchTypes();
    // eslint-disable-next-line
  }, [learnerId, open, typeModalOpen]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!learnerId) throw new Error('No learnerId');
      const body: any = {
        title: form.title,
        typeId: form.typeId,
        totalUnits: Number(form.totalUnits),
        progress: Number(form.progress),
        status: form.status,
      };
      if (goalId) body.goalId = Number(goalId);
      if (resource) {
        await updateLearningResource(learnerId, resource.id, body);
      } else {
        await addLearningResource(learnerId, body);
      }
      if (onResourceAdded) onResourceAdded();
      onClose();
    } catch (err) {
      setError('Failed to save resource');
    } finally {
      setLoading(false);
    }
  };

  // عند إضافة نوع جديد، خزنه ليتم اختياره تلقائيًا
  const handleTypeAdded = (typeId: string) => {
    setTypeModalOpen(false);
    setNewTypeId(typeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="bg-background text-foreground rounded-2xl shadow-xl w-full p-6 relative border border-border">
          <h2 className="text-lg font-bold mb-6">{resource ? 'Edit Learning Resource' : 'Create Learning Resources'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Title of your Learning Resources"
                maxLength={100}
                required
              />
              <div className="text-xs text-muted-foreground text-right mt-1">{form.title.length}/100</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <div className="relative">
                <select
                  name="typeId"
                  value={form.typeId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                  required
                >
                  <option value="">Select type...</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-primary font-medium !no-underline hover:!no-underline focus:!no-underline active:!no-underline hover:cursor-pointer"
                  onClick={() => setTypeModalOpen(true)}
                >
                  <span className="text-lg font-bold">+</span>
                  <span>Create new resources type</span>
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Units</label>
              <input
                name="totalUnits"
                value={form.totalUnits}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="ex. How many hours of the tutorial ?"
                type="number"
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Progress</label>
              <input
                name="progress"
                value={form.progress}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="ex. How many of them did you finish?"
                type="number"
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
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
                {loading ? (resource ? 'Saving...' : 'Creating...') : (resource ? 'Save' : 'Create')}
              </Button>
            </div>
          </form>
          <ResourceTypeModal open={typeModalOpen} onClose={() => setTypeModalOpen(false)} onTypeAdded={handleTypeAdded} />
        </div>
      </div>
    </div>
  );
} 