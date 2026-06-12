export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutContent {
  narrativeParagraphs: string[];
  stats: AboutStat[];
}

export const aboutContent: AboutContent = {
  narrativeParagraphs: [
    "I am an IT student and developer specializing in Godot Engine and C# to architect modular, high-performance gameplay systems.",
    "Driven by clean logic over superficial styling, I focus on structural execution to translate complex requirements into efficient, interactive software."
  ],
  stats: [
    {
      value: 14,
      suffix: "+",
      label: "Godot Prototypes Built",
    },
    {
      value: 850,
      suffix: "+",
      label: "C# Scripts Written",
    },
    {
      value: 2,
      suffix: "nd Year",
      label: "Current Academic Year",
    },
  ],
};
