export interface ButtonProps {
    type: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text' | 'large';
    text: string;
    onClick?: () => void;
    className?: string;
    size: 'extra-small'| 'extra-small-product' | 'extra-small-filter' | 'small' | 'medium' | 'large' | 'extra-large' | 'small-pagination' | 'filter';
    margin?: 'zero';
    icon?: 'chevron-left' | 'chevron-right';
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    typeAttribute : 'button' | 'submit' | 'reset';
}