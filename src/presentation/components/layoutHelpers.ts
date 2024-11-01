import React from 'react';

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any[],
) {
  return {
    key,
    icon,
    children,
    label,
  };
}
