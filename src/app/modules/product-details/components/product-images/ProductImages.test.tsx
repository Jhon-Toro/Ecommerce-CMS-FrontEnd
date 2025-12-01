import { render } from '@testing-library/react';
import ProductImages from './ProductImages';
import '@testing-library/jest-dom';
import { AdditionalImagesProps } from '../../interfaces/additional-images/AdditionalImages.interface';
import { MainImageProps } from '../../interfaces/main-image/MainImage.interface';

jest.mock('../../constants/ImageConfig.constant', () => ({
    IMAGE_CONFIG: {
        IS_MOBILE: 768,
    },
}));

jest.mock('../main-image/MainImage', () => {
    const Mock = ({ currentMainImage }: MainImageProps) => (
        <div data-testid="main-image">MainImage: {currentMainImage}</div>
    );
    Mock.displayName = 'MainImage';
    return Mock;
});

jest.mock('../additional-images/AdditionalImages', () => {
    const Mock = ({ additionalImages }: AdditionalImagesProps) => (
        <div data-testid="additional-images">
            AdditionalImages: {additionalImages.join(', ')}
        </div>
    );
    Mock.displayName = 'AdditionalImages';
    return Mock;
});


describe(ProductImages.name, () => {
    const mainImage = '/main.jpg';
    const additionalImages = ['/1.jpg', '/2.jpg'];

    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });

    it('renders MainImage and AdditionalImages with correct props on desktop', () => {
        const { getByTestId } = render(
            <ProductImages mainImage={mainImage} additionalImages={additionalImages} />
        );

        expect(getByTestId('main-image')).toHaveTextContent(mainImage);
        expect(getByTestId('additional-images')).toHaveTextContent('AdditionalImages: /1.jpg, /2.jpg');
    });

    it('sets isMobile true on small screen', () => {
        window.innerWidth = 600;
        window.dispatchEvent(new Event('resize'));

        const { getByTestId } = render(
            <ProductImages mainImage={mainImage} additionalImages={additionalImages} />
        );
        expect(getByTestId('main-image')).toHaveTextContent(mainImage);
    });
});
