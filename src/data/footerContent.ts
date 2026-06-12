export interface FooterSocialLink {
  label: string;
  href: string;
  platform: string;
}

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterContent {
  systemModule: string;
  systemVersion: string;
  resumeDownloadText: string;
  resumeUrl: string;
  copyrightText: string;
  copyrightHolder: string;
  navLinks: FooterNavLink[];
  socialLinks: FooterSocialLink[];
}

export const footerContent: FooterContent = {
  systemModule: "SYS_MODULE: FOOTER_ARCH",
  systemVersion: "v2.0.26-STABLE",
  resumeDownloadText: "DOWNLOAD_SYS_LOG",
  resumeUrl: "/resume.pdf",
  copyrightText: "ALL SYSTEM PROCESSES LOGGED // INTEGRITY VERIFIED.",
  copyrightHolder: "PSALM RIVERA",
  navLinks: [
    { label: "/HOME", href: "#hero" },
    { label: "/ABOUT", href: "#about" },
    { label: "/SKILLS", href: "#skills" },
    { label: "/PROJECTS", href: "#projects" },
    { label: "/CONTACT", href: "#contact" },
  ],
  socialLinks: [
    { label: "/GITHUB", href: "https://github.com/Yeast123", platform: "GitHub" },
    { label: "/LINKEDIN", href: "https://linkedin.com", platform: "LinkedIn" },
    { label: "/ITCH.IO", href: "https://itch.io", platform: "Itch.io" },
  ],
};
