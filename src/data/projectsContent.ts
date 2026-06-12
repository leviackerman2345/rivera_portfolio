export interface ProjectItem {
  title: string;
  techStack?: string[];
  description?: string;
  imageUrl?: string;
  isRedirect?: boolean;
  link?: string;
}

export const projectsContent: ProjectItem[] = [
  {
    title: "Code Rift: Genesis",
    techStack: ["C#", "Unity", "Aseprite"],
    description: "A coding-based tactical RPG utilizing complex C# logic gates and custom-rendered 16-bit sprite animation sequences. Players solve algorithmic puzzles to compile spells and navigate structural dungeons.",
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Sustainable Streets Simulator",
    techStack: ["Godot Engine", "GDScript", "GIS Data"],
    description: "A traffic and environmental simulation prototype mapped to the real-world road networks of San Pablo City. Simulates real-time carbon emission reports based on modular congestion logic and traffic light timing systems.",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Aether Grid: Breach",
    techStack: ["Godot Engine", "C#", "WebSockets"],
    description: "A node-based procedural network security simulator. Players map data-flow channels and counter intrusion scripts in a stylized neon grid, powered by a C# logical state machine and multi-threaded pathfinding algorithms.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Echo-Nav: Hands-Free Workspace",
    techStack: ["React", "TypeScript", "Web Audio API"],
    description: "An accessibility-first developer assistant that parses codebases into soundscapes. Designed for visually and motor-impaired developers, allowing hands-free workspace navigation via voice controls and spatial audio feedback.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Synapse Sync: Edge Pipeline",
    techStack: ["C#", "Redis", "Docker", "gRPC"],
    description: "A low-latency, high-throughput systems integration pipeline. Handles real-time telemetry from multiple IoT sensor nodes, routing messages via gRPC streams to an in-memory Redis cluster with live diagnostic metrics monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "View All Projects",
    isRedirect: true,
    link: "https://github.com/Yeast123", // Placeholder portfolio link or similar
  },
];
