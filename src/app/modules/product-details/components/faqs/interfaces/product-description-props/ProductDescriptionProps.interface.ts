export interface ProductDescriptionProps {
    description: {
      overview: string;
      features: string[];
      origin: string;
      company: {
        name: string;
        description: string;
      };
      careInstructions: string;
    };
}