import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import { showProjects } from "@/config/content";

export default function ProjectsPage() {
  // Hidden until real tracks are added. Flip `showProjects` in config/content.ts to bring it back.
  if (!showProjects) notFound();
  return <Projects />;
}
