import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import { getPageHeight } from './utils';
import CheckUserExist from '@/presentation/pages/user/CheckUserExist';

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component, isProtected }) => {
          return (
            <Route
              key={path}
              path={path}
              element={isProtected ? <CheckUserExist component={Component} /> : <Component />}
            />
          );
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
