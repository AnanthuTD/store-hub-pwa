import { Toolbar, Typography, Stack, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import SearchAutocomplete from './SearchAutoComplete';
import UserMenu from './UserMenu';
import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useCartCount } from '@/presentation/layouts/UserLayout';
import { useNotification } from '@/presentation/components/NotificationContext';

const MainHeader = () => {
  const { unreadNotificationCount } = useNotification();
  const { cartCount } = useCartCount();

  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        padding: '10px 15px',
        backgroundColor: 'white',
      }}
    >
      {/* Logo */}
      <Link to={'/home'}>
        <Typography variant="h5" sx={{ color: '#1a202c', fontWeight: 700 }}>
          StoreHub
        </Typography>
      </Link>

      {/* Search Box */}

      <SearchAutocomplete />

      {/* Right Menu */}
      <Stack direction="row" spacing={2} alignItems="center">
        <UserMenu />
        <Link to={'/products/list'}>
          <Button variant="contained">Shop</Button>
        </Link>
        <Link to={'/cart'}>
          <IconButton>
            <Badge size="small" count={cartCount}>
              <ShoppingCartIcon color="action" />
            </Badge>
          </IconButton>
        </Link>
        <Link to={'/notifications'}>
          <Badge size="small" count={unreadNotificationCount}>
            <BellOutlined style={{ fontSize: 17 }} />
          </Badge>
        </Link>
        <IconButton>
          <FavoriteBorderOutlinedIcon color="action" />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

export default MainHeader;
