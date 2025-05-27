
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BlogCategory } from '@/types/blog';
import { Filter, RotateCcw } from 'lucide-react';

interface BlogFiltersProps {
  categories: BlogCategory[];
  selectedCategory: string;
  selectedYear: string;
  selectedReadTime: string;
  onCategoryChange: (category: string) => void;
  onYearChange: (year: string) => void;
  onReadTimeChange: (readTime: string) => void;
  onReset: () => void;
}

const BlogFilters = ({
  categories,
  selectedCategory,
  selectedYear,
  selectedReadTime,
  onCategoryChange,
  onYearChange,
  onReadTimeChange,
  onReset
}: BlogFiltersProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os anos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os anos</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Leitura</label>
          <Select value={selectedReadTime} onValueChange={onReadTimeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer duração" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer duração</SelectItem>
              <SelectItem value="quick">Rápida (1-3 min)</SelectItem>
              <SelectItem value="medium">Média (4-7 min)</SelectItem>
              <SelectItem value="long">Longa (8+ min)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;
