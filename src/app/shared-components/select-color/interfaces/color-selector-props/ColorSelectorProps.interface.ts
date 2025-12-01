import { Color } from "../color/Color.interface";

export interface ColorSelectorProps {
    colors: Color[];
    selectedColor: string;
    onColorChange: (colorName: string) => void;
}