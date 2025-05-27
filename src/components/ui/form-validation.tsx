
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormValidationProps {
  errors: Record<string, any>;
  field: string;
  successMessage?: string;
  showSuccess?: boolean;
}

const FormValidation: React.FC<FormValidationProps> = ({
  errors,
  field,
  successMessage,
  showSuccess = false
}) => {
  const hasError = errors[field];
  
  if (hasError) {
    return (
      <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
        <AlertCircle className="h-3 w-3" />
        <span>{hasError.message}</span>
      </div>
    );
  }
  
  if (showSuccess && successMessage) {
    return (
      <div className="flex items-center space-x-1 text-green-500 text-xs mt-1">
        <CheckCircle className="h-3 w-3" />
        <span>{successMessage}</span>
      </div>
    );
  }
  
  return null;
};

export default FormValidation;
