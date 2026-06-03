export type ContactInterest =
  | "individual"
  | "empresarial"
  | "workshop"
  | "consultoria"
  | "curso"
  | "outro"
  | "geral";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  interest: ContactInterest;
  message: string;
}

export interface ContactSettings {
  emailDestination: string;
  whatsappNumber: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  autoReplyMessage: string;
}

export interface ContactSubmission {
  id: string;
  data: ContactFormData;
  timestamp: string;
  status: "pending" | "processed";
}
