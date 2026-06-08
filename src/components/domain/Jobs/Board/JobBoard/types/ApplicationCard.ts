export type ApplicationCard = {
  uuid: string;
  company: string;
  position: string;
  vacancyUrl: string | null;
  status: "WISHLIST" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  applicationDate: string | null;
  notes: string | null;
};
