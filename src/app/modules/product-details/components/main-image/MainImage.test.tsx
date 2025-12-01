import { render, fireEvent } from "@testing-library/react";
import MainImage from "./MainImage";
import { ZoomLensProps } from "../../interfaces/zoom-lens/ZoomLens.interface";
import { ZoomedImageProps } from "../../interfaces/zoomed-image/ZoomedImage.interface";
import "@testing-library/jest-dom";

jest.mock("../zoom-lens/ZoomLens", () => {
  const ZoomLens = ({ lensPosition }: ZoomLensProps) => (
    <div data-testid="zoom-lens">
      Lens at {lensPosition.x},{lensPosition.y}
    </div>
  );

  ZoomLens.displayName = "ZoomLens";

  return ZoomLens;
});

jest.mock("../zoomed-images/ZoomedImage", () => {
  const ZoomedImage = ({ currentMainImage }: ZoomedImageProps) => (
    <div data-testid="zoomed-image">Zoomed: {currentMainImage}</div>
  );

  ZoomedImage.displayName = "ZoomedImage";

  return ZoomedImage;
});

describe(MainImage.name, () => {
  const imageUrl = "/test-image.jpg";

  it("renders main image correctly", () => {
    const { getByAltText } = render(
      <MainImage
        currentMainImage={imageUrl}
        isMobile={false}
        width={440}
        height={500}
      />
    );
    expect(getByAltText("Main product image")).toBeInTheDocument();
  });

  it("shows zoom lens and zoomed image on mouse move (desktop)", () => {
    const { getByTestId, container } = render(
      <MainImage
        currentMainImage={imageUrl}
        isMobile={false}
        width={440}
        height={500}
      />
    );
    const region = container.querySelector('[role="region"]') as HTMLElement;

    fireEvent.mouseMove(region, {
      clientX: 100,
      clientY: 100,
    });

    expect(getByTestId("zoom-lens")).toBeInTheDocument();
    expect(getByTestId("zoomed-image")).toBeInTheDocument();
  });

  it("does not zoom on mobile mouse events", () => {
    const { container, queryByTestId } = render(
      <MainImage
        currentMainImage={imageUrl}
        isMobile={true}
        width={440}
        height={500}
      />
    );
    const region = container.querySelector('[role="region"]') as HTMLElement;

    fireEvent.mouseMove(region, {
      clientX: 100,
      clientY: 100,
    });

    expect(queryByTestId("zoom-lens")).not.toBeInTheDocument();
    expect(queryByTestId("zoomed-image")).not.toBeInTheDocument();
  });

  it("shows zoom elements on touch", () => {
    const { container, getByTestId } = render(
      <MainImage
        currentMainImage={imageUrl}
        isMobile={true}
        width={440}
        height={500}
      />
    );
    const region = container.querySelector('[role="region"]') as HTMLElement;

    fireEvent.touchStart(region, {
      touches: [{ clientX: 100, clientY: 100 }],
    });

    expect(getByTestId("zoom-lens")).toBeInTheDocument();
    expect(getByTestId("zoomed-image")).toBeInTheDocument();
  });

  it("removes zoom on mouse leave or touch end", () => {
    const { container, queryByTestId } = render(
      <MainImage
        currentMainImage={imageUrl}
        isMobile={false}
        width={440}
        height={500}
      />
    );
    const region = container.querySelector('[role="region"]') as HTMLElement;

    fireEvent.mouseMove(region, {
      clientX: 100,
      clientY: 100,
    });

    expect(queryByTestId("zoom-lens")).toBeInTheDocument();

    fireEvent.mouseLeave(region);

    expect(queryByTestId("zoom-lens")).not.toBeInTheDocument();
    expect(queryByTestId("zoomed-image")).not.toBeInTheDocument();
  });
});
