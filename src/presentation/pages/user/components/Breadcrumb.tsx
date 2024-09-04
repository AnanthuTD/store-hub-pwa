import React from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  links: Array<{ label: string; href: string }>; // Array of objects with label and href properties.  e.g., [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }]  // required
}

// Breadcrumb component definition
const Breadcrumb = ({ links }: BreadcrumbProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        {links.map((link, index) => (
          <Link
            key={index}
            color={index === links.length - 1 ? 'text.primary' : 'inherit'}
            href={link.href}
            underline="hover"
            sx={{ fontWeight: index === links.length - 1 ? 'bold' : 'normal' }}
          >
            {link.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
