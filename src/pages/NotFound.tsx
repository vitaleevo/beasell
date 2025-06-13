
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-orange-500 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {t('errors.page_not_found')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('errors.something_went_wrong')}
          </p>
        </div>
        
        <Link to="/">
          <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white">
            <Home className="mr-2 h-5 w-5" />
            {t('errors.go_home')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
