import { Gamepad2, Code2, Layout, GitFork, Radio, Braces } from "lucide-react";
import React from "react";

export interface Skill {
  name: string;
  proficiency: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "green" | "red";
}

export const skillsContent: Skill[] = [
  {
    name: "Godot Engine",
    proficiency: 85,
    description: "Architecting modular, high-performance gameplay systems and custom 2D/3D interactive prototypes.",
    icon: Gamepad2,
    accentColor: "green",
  },
  {
    name: "C# Language",
    proficiency: 75,
    description: "Writing object-oriented, typed logic and state machine architectures for robust codebase management.",
    icon: Code2,
    accentColor: "red",
  },
  {
    name: "HTML5 & CSS3",
    proficiency: 55,
    description: "Crafting semantic web structures and modern, highly responsive user interfaces with premium styling.",
    icon: Layout,
    accentColor: "green",
  },
  {
    name: "TypeScript",
    proficiency: 60,
    description: "Developing type-safe frontend components and reactive data structures to prevent runtime bugs.",
    icon: Braces,
    accentColor: "red",
  },
  {
    name: "Git & GitHub",
    proficiency: 70,
    description: "Managing project histories, collaborative branches, and seamless deployment integrations.",
    icon: GitFork,
    accentColor: "green",
  },
  {
    name: "WebSockets",
    proficiency: 65,
    description: "Configuring real-time duplex communication for multiplayer networking and instant state updates.",
    icon: Radio,
    accentColor: "red",
  },
];
