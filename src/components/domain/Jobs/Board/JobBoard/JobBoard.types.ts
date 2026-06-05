export interface Job {
  id: string;
  role: string;
  company: string;
  info: string;
  badge: string;
  badgeBg: string;
}

export interface JobCardProps {
  job: Job;
  isWishlist?: boolean;
  onClick?: () => void;
}