import React, { ReactNode, useEffect } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export interface MenuItem {
  label: string;
  icon: ReactNode;
  section?: 'main' | 'accounts';
  key: string;
  href: string;
}

const Sidebar = ({
  menuItems,
  defaultSelectedKey,
}: {
  menuItems: MenuItem[];
  defaultSelectedKey?: string;
}) => {
  const location = useLocation(); // Get the current location
  const [selectedItem, setSelectedItem] = React.useState(defaultSelectedKey || '');

  // Set the selected item based on the current URL
  useEffect(() => {
    const currentPath = location.pathname; // Get the current path (e.g., "/dashboard", "/profile")
    const matchedItem = menuItems.find((item) => item.href === currentPath); // Find the menu item that matches the path
    if (matchedItem) {
      setSelectedItem(matchedItem.key); // Set the selected item key
    }
  }, [location.pathname, menuItems]); // Re-run the effect when the pathname or menuItems change

  const handleListItemClick = (key: string) => {
    setSelectedItem(key);
  };

  return (
    <Box
      sx={{
        width: 250,
        background: 'url("/side-bar.svg")',
        height: '100vh',
        color: 'white',
        paddingTop: 2,
      }}
      margin={1}
    >
      <Typography variant="h6" sx={{ marginLeft: 2, marginBottom: 1 }}>
        SHOP OWNER
      </Typography>
      <List component="nav">
        {menuItems
          .filter((item) => ['main', undefined].includes(item.section))
          .map((item) => (
            <Link
              to={item.href}
              key={item.key}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton
                key={item.label}
                selected={selectedItem === item.key}
                onClick={() => handleListItemClick(item.key)}
                sx={{
                  borderRadius: '8px',
                  margin: '4px',
                  '&.Mui-selected': { backgroundColor: '#1d2951' },
                  '&:hover': { backgroundColor: '#1d2951' },
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Box
                    component={'div'}
                    bgcolor={'#0075FF'}
                    borderRadius={'12px'}
                    width={'30px'}
                    height={'30px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    {item.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}
      </List>
      <Typography variant="h6" sx={{ marginLeft: 2, marginTop: 2 }}>
        ACCOUNT PAGES
      </Typography>
      <List component="nav" title="ACCOUNT PAGES">
        {menuItems
          .filter((item) => item.section === 'accounts')
          .map((item) => (
            <ListItemButton
              key={item.label}
              selected={selectedItem === item.key}
              onClick={() => handleListItemClick(item.key)}
              sx={{
                borderRadius: '8px',
                margin: '4px',
                '&.Mui-selected': { backgroundColor: '#1d2951' },
                '&:hover': { backgroundColor: '#1d2951' },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <Box
                  component={'div'}
                  bgcolor={'#0075FF'}
                  borderRadius={'12px'}
                  width={'30px'}
                  height={'30px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  {item.icon}
                </Box>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
};

export default Sidebar;
