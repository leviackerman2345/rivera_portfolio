export interface HeroLink {
  label: string;
  href: string;
  external: boolean;
}

export interface HeroContent {
  systemVersion: string;
  latency: string;
  environment: string;
  firstName: string;
  lastName: string;
  subtitleLeftLine1: string;
  subtitleLeftLine2: string;
  subtitleRight: string;
  imagePath: string;
  projectImagePath: string;
  socialLinks: HeroLink[];
}

export const heroContent: HeroContent = {
  systemVersion: "PR_SYS // V2.8_HUD",
  latency: "11ms",
  environment: "PROD",
  firstName: "PSALM",
  lastName: "RIVERA",
  subtitleLeftLine1: "Game & Systems",
  subtitleLeftLine2: "Logic Developer",
  subtitleRight: "IT Student & Game Dev",
  imagePath: "/assets/hero_image.jpeg",
  projectImagePath: "/assets/game_project.png",
  socialLinks: [
    { label: "/GitHub", href: "https://github.com/Yeast123", external: true },
    { label: "/LinkedIn", href: "https://linkedin.com", external: true },
    { label: "/Itch.io", href: "https://itch.io", external: true },
    { label: "/Email", href: "mailto:psalm.rivera@example.com", external: true },
  ],
};
