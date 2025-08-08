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
  slideshow?: string[];
  awards?: {
    description: string;
  };
}
