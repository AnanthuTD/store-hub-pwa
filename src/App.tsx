import React, { Fragment, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';

import { store } from './infrastructure/redux/store';
import { Provider } from 'react-redux';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Pages = React.lazy(() => import('@/presentation/routes/Pages'));

const BASE_URL = import.meta.env.BASE_URL || '';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <GoogleOAuthProvider clientId="73723652828-ntcsstkv6qssa4na759lgkr5pmdh3pbb.apps.googleusercontent.com">
        <Provider store={store}>
          {/* Using LocalizationProvider only when necessary */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter basename={BASE_URL}>
              <Suspense fallback={<div>Loading...</div>}>
                <Pages />
              </Suspense>
            </BrowserRouter>
          </LocalizationProvider>
        </Provider>
      </GoogleOAuthProvider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
