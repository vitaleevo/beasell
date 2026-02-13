"use client";


import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar = ({
  onSearch = () => { },
  placeholder = "Pesquisar artigos...",
  initialValue = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-white/70" />
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl focus-within:ring-2 focus-within:ring-[#F39200]/50 transition-all duration-300">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/60 pl-10 pr-4 py-3 h-auto text-lg transition-all"
        />

        {query && (
          <button
            onClick={handleClear}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <Button
          onClick={handleSearch}
          className="bg-[#F39200] hover:bg-[#d68000] text-white rounded-full px-8 py-4 h-auto font-bold shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
        >
          {query ? 'Pesquisar' : 'Explorar'}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
