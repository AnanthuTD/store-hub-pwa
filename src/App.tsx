import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/presentation/routes/Pages';
// import Notifications from '@/sections/Notifications';
import SW from '@/presentation/sections/SW';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      {/* <Notifications /> */}
      <SW />
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
