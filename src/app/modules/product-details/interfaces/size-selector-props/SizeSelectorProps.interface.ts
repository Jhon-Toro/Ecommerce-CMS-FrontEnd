export interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSizeChange: (size: string) => void;
}