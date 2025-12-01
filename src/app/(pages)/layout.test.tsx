import ReactDOMServer from 'react-dom/server';
import RootLayout from './layout';
import '@/app/__mocks__/__shared-components__/globalMocks';

describe(RootLayout.name, () => {
  it('Renders layout structure with mocked components', () => {
    ReactDOMServer.renderToString(
      <RootLayout>
        <div data-testid="page-content">Contenido de la página</div>
      </RootLayout>
    );

  });
});
