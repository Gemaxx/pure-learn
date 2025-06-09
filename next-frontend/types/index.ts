export interface Resource {
  id: string
  title: string
  progress: number
  total: number
  completed: number
  status: "not-started" | "in-progress" | "done" | "on-hold"
}

export interface ResourceType {
  id: string
  name: string
  units: string
  resources: Resource[]
}

export interface Task {
  id: string
  title: string
  resourceType: string
  progress: number
  total: number
  completed: number
  status: "not-started" | "in-progress" | "done" | "on-hold"
}
export interface Resource {
  id: string;
  title: string;
  progress: number;
  total: number;
  completed: number;
  status: "not-started" | "in-progress" | "done" | "on-hold";
}

export interface ResourceType {
  id: string;
  name: string;
  units: string;
  resources: Resource[];
}

export interface Task {
  id: string;
  title: string;
  resourceType: string;
  progress: number;
  total: number;
  completed: number;
  status: "not-started" | "in-progress" | "done" | "on-hold";
}
