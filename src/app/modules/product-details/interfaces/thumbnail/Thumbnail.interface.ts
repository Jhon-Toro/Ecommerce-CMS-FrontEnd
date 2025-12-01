export interface ThumbnailProps {
    image: string;
    isSelected: boolean;
    onSelect: () => void;
    alt: string;
    ariaLabel: string;
    width?: number;
    height?: number;
}