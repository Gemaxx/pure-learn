"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useParams } from 'next/navigation';
import ResourceCard from './ResourceCard';
import ResourceModal from './ResourceModal';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';
import { getLearningResources, deleteLearningResource } from '../services/learning-resources-service';

// نوع resource الأساسي
interface LearningResource {
  id: string;
  title: string;
  typeId: string;
  typeName?: string;
  totalUnits: number;
  progress: number;
  status: 'Not-Started' | 'In-Progress' | 'Done' | 'On-Hold';
}

const STATUSES = ['Not-Started', 'In-Progress', 'Done', 'On-Hold'] as const;

type StatusType = typeof STATUSES[number];

export default function LearningResourcesBoard() {
  const { user } = useAuth();
  const params = useParams();
  const goalId = params.id as string;
  const learnerId = user?.id;

  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editResource, setEditResource] = useState<LearningResource | null>(null);

  // جلب الموارد من الـ API
  const fetchResources = async () => {
    if (!learnerId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getLearningResources(learnerId);
      setResources(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('A server error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [learnerId]);

  // إضافة resource جديد
  const handleResourceAdded = () => {
    fetchResources();
    setModalOpen(false);
    setEditResource(null);
  };

  // تعديل resource
  const handleEdit = (resource: LearningResource) => {
    setEditResource(resource);
    setModalOpen(true);
  };

  // حذف resource
  const handleDelete = async (id: string) => {
    if (!learnerId) return;
    setLoading(true);
    try {
      await deleteLearningResource(learnerId, id);
      fetchResources();
    } catch {
      setError('A server error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Resources</h1>
        <Button onClick={() => { setEditResource(null); setModalOpen(true); }}>
          + New Resource
        </Button>
      </div>
      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading...</div>
      ) : resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No resources yet</h2>
          <p className="text-muted-foreground mb-6">Create your first resource to start documenting your learning journey.</p>
          <Button onClick={() => { setEditResource(null); setModalOpen(true); }}>
            + Create Your First Resource
          </Button>
        </div>
      ) : error ? (
        <div className="text-center text-destructive py-12">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={() => handleEdit(resource)}
              onDelete={() => handleDelete(resource.id)}
            />
          ))}
        </div>
      )}
      <ResourceModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditResource(null); }}
        onResourceAdded={handleResourceAdded}
        resource={editResource}
        goalId={goalId}
      />
    </div>
  );
} 