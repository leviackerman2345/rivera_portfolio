export interface FormFieldConfig {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required: boolean;
  maxLength?: number;
}

export interface ContactSocialLink {
  label: string;
  href: string;
  platform: string;
}

export interface ContactContent {
  systemModule: string;
  headingLine1: string;
  headingAccent1: string;
  headingLine2: string;
  headingAccent2: string;
  subtext: string;
  email: string;
  locationLabel: string;
  coordinates: string;
  timezone: string;
  statusLabel: string;
  socialLinks: ContactSocialLink[];
  formFields: FormFieldConfig[];
  submitLabel: string;
  submittingLabel: string;
  successLabel: string;
}

export const contactContent: ContactContent = {
  systemModule: "SYS_MODULE: CONTACT_INTERFACE",
  headingLine1: "ESTABLISH",
  headingAccent1: "CONNECTION",
  headingLine2: "INITIATE",
  headingAccent2: "TRANSMISSION",
  subtext: "Submit transmission routing parameters to establish direct communications. System checks validation criteria prior to stream initiation.",
  email: "psalm.rivera@example.com",
  locationLabel: "HOST_LOC",
  coordinates: "SPC_CAMPUS [14.0687° N, 121.3242° E]",
  timezone: "ZONE: UTC+8 (PST)",
  statusLabel: "PORT_STATUS",
  socialLinks: [
    { label: "/GitHub", href: "https://github.com/Yeast123", platform: "GitHub" },
    { label: "/LinkedIn", href: "https://linkedin.com", platform: "LinkedIn" },
    { label: "/Itch.io", href: "https://itch.io", platform: "Itch.io" },
  ],
  formFields: [
    {
      id: "name",
      label: "SENDER_IDENTITY",
      type: "text",
      placeholder: "ENTER FULL NAME OR ORGANIZATIONAL ID",
      required: true,
      maxLength: 60,
    },
    {
      id: "email",
      label: "ROUTING_CORRESPONDENCE",
      type: "email",
      placeholder: "ENTER COMPATIBLE MAIL ROUTE (EMAIL)",
      required: true,
      maxLength: 80,
    },
    {
      id: "message",
      label: "TRANSMISSION_PAYLOAD",
      type: "textarea",
      placeholder: "INPUT ENCODED MESSAGE DETAILS...",
      required: true,
      maxLength: 1000,
    },
  ],
  submitLabel: "INITIATE_TRANSMISSION",
  submittingLabel: "ESTABLISHING_STREAM...",
  successLabel: "TRANSMISSION_STABLE // COMMS_ONLINE",
};
