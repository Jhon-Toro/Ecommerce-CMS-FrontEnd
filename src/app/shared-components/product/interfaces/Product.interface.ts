export interface Product {
    date?: number;
    id: number;
    name: string;
    price: number;
    discountPrice?: number | null | undefined;
    rating: number;
    image: string;
    category?: string;
    discount?: number;
    color?: string;
    size?: string;
    dressStyle?: string;
}