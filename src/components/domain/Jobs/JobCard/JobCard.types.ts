export interface JobCardProps {
  role: string;
  company: string;
  info: string;
  badge: string;
  badgeBg: string;
  isWishlist?: boolean;
  onClick?: () => void;
}