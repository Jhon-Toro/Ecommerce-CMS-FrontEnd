export interface SelectProps {
    value: string;
    options: readonly string[];
    onChange: (value: string) => void;
}