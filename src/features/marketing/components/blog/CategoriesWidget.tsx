
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Folder, ChevronRight } from 'lucide-react';
import { BlogCategory } from '@/shared/types/blog';

interface CategoriesWidgetProps {
  categories: BlogCategory[];
}

const CategoriesWidget = ({ categories }: CategoriesWidgetProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Folder className="h-5 w-5 mr-2 text-blue-900" />
          Categorias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/categoria/${category.slug}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                  {category.name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-900" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesWidget;

