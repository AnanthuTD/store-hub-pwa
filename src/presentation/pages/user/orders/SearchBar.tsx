import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => (
  <Search placeholder="Search by Order ID" onSearch={onSearch} style={{ marginBottom: '20px' }} />
);

export default SearchBar;
