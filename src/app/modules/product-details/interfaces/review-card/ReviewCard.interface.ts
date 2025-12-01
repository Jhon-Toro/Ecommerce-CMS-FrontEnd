export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
    verified: boolean;
}
  
  
export interface ReviewCardProps {
    review: Review;
}
