export interface Job {
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