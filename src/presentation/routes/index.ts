import userRoutes from './userRoutes';
import partnerRoutes from './partnerRoutes';
import adminRoutes from './adminRoutes';
import vendorRoutes from './vendorRoutes';

const routes = {
  ...userRoutes,
  ...partnerRoutes,
  ...adminRoutes,
  ...vendorRoutes,
};

console.log({
  ...userRoutes,
  ...partnerRoutes,
  ...adminRoutes,
  ...vendorRoutes,
});

export default routes;
