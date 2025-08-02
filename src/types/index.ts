export interface ProjectData {
  id: string;
  title: string;
  subtitle?: string; // Optional subtitle for additional context
  description: string;
  technologies: { icon: React.ReactNode; title: string }[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  image?: string;
}