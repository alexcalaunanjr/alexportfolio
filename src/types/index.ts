export interface ProjectData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: { icon: React.ReactNode; title: string }[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  image?: string;
  awards?: {
    description: string;
  };
}
