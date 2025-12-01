import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetails from "./ProductDetails";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        newArrivals: [],
        topSelling: [],
      }),
  } as Response)
);

jest.mock(
  "@/app/shared-components/product/interfaces/Product.interface",
  () => ({
    Product: jest.fn().mockReturnValue({
      id: "1",
      name: "Mock Product",
      price: 100,
      rating: 4.5,
      reviewsCount: 150,
      discountPrice: 80,
      discount: 20,
      description: {
        overview: "Overview of the product",
        features: ["Feature 1", "Feature 2"],
        origin: "USA",
        company: {
          name: "Mock Company",
          description: "Company description",
        },
        careInstructions: "Care instructions",
      },
      mainImage: "mock-image.jpg",
      additionalImages: ["image1.jpg", "image2.jpg"],
      colors: [{ name: "Red", hex: "#FF0000" }],
      sizes: ["M", "L", "XL"],
    }),
  })
);

jest.mock("@/app/modules/product-details/components/faqs/Faqs", () => {
  const Faqs = () => <div>FAQs Component</div>;
  Faqs.displayName = "Faqs";
  return Faqs;
});

jest.mock("@/app/modules/product-details/components/reviews/Reviews", () => {
  const Reviews = () => <div>Reviews Component</div>;
  Reviews.displayName = "Reviews";
  return Reviews;
});

jest.mock(
  "@/app/modules/product-details/components/product-info/ProductInfo",
  () => {
    const ProductInfo = () => <div>ProductInfo Component</div>;
    ProductInfo.displayName = "ProductInfo";
    return ProductInfo;
  }
);

jest.mock(
  "@/app/modules/product-details/components/product-images/ProductImages",
  () => {
    const ProductImages = () => <div>ProductImages Component</div>;
    ProductImages.displayName = "ProductImages";
    return ProductImages;
  }
);

jest.mock("@/app/modules/product-details/components/tabs/Tabs", () => {
  interface TabsProps {
    onTabChange: (tab: string) => void;
  }

  const Tabs: React.FC<TabsProps> = ({ onTabChange }) => (
    <button onClick={() => onTabChange("FAQs")}>Switch to FAQs</button>
  );
  Tabs.displayName = "Tabs";
  return Tabs;
});

describe("ProductDetails", () => {
  it("renders product details", async () => {
    render(<ProductDetails />);

    expect(await screen.findByText(/YOU MIGHT ALSO LIKE/i)).toBeInTheDocument();
  });

  it("renders ProductDetails and changes tabs correctly", async () => {
    render(<ProductDetails />);

    expect(
      await screen.findByText("ProductInfo Component")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("ProductImages Component")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Switch to FAQs"));
    await waitFor(() =>
      expect(screen.getByText("FAQs Component")).toBeInTheDocument()
    );
  });
});
