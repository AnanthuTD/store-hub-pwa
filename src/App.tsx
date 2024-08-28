import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/presentation/routes/Pages';
// import Notifications from '@/sections/Notifications';
import SW from '@/presentation/sections/SW';
import { store } from './infrastructure/redux/store';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      {/* <Notifications /> */}
      <SW />
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Pages />
          </BrowserRouter>
        </LocalizationProvider>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
