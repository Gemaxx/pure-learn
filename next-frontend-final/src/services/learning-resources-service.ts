// خدمات API للـ Learning Resources
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_BASE is not defined. Please set it in your .env.local file.');
}

export async function getLearningResources(learnerId: string) {
  const res = await fetch(`${API_BASE}/api/learners/${learnerId}/LearningResources`);
  if (!res.ok) {
    if (res.status === 404 || res.status === 204) return [];
    throw new Error('Failed to load resources');
  }
  return res.json();
}

export async function addLearningResource(learnerId: string, data: any) {
  const res = await fetch(`${API_BASE}/api/learners/${learnerId}/LearningResources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const errorText = await res.text();
  if (!res.ok) {
    console.error('Failed to add learning resource:', errorText, 'Status:', res.status);
    throw new Error('Failed to add resource');
  }
  return JSON.parse(errorText);
}

export async function updateLearningResource(learnerId: string, id: string, data: any) {
  const res = await fetch(`${API_BASE}/api/learners/${learnerId}/LearningResources/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update resource');
  return res.json();
}

export async function deleteLearningResource(learnerId: string, id: string) {
  const res = await fetch(`${API_BASE}/api/learners/${learnerId}/LearningResources/${id}/soft-delete`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete resource');
}

export async function getResourceTypes(learnerId: string) {
  const res = await fetch(`${API_BASE}/api/learners/${learnerId}/learningResourceTypes`);
  if (!res.ok) return [];
  return res.json();
}

export async function addResourceType(learnerId: string, data: any) {
  const res = await fetch(`${API_BASE}/api/learners/${learnerId}/learningResourceTypes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const errorText = await res.text();
  if (!res.ok) {
    console.error('Failed to add resource type:', errorText, 'Status:', res.status);
    throw new Error('Failed to add resource type');
  }
  return JSON.parse(errorText);
} 