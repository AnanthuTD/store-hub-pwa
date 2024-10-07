import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>,
  );
}

export default render;
