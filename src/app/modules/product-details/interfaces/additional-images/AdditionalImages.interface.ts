export interface AdditionalImagesProps {
    currentMainImage: string;
    mainImage: string;
    setCurrentMainImage: React.Dispatch<React.SetStateAction<string>>;
    additionalImages: string[];
}