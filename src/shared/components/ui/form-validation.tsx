import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

type ValidationError = {
  message?: React.ReactNode;
};

interface FormValidationProps {
  errors: Record<string, ValidationError | undefined>;
  field: string;
  successMessage?: string;
  showSuccess?: boolean;
}

const FormValidation: React.FC<FormValidationProps> = ({
  errors,
  field,
  successMessage,
  showSuccess = false,
}) => {
  const hasError = errors[field];

  if (hasError) {
    return (
      <div className="mt-1 flex items-center space-x-1 text-xs text-red-500">
        <AlertCircle className="h-3 w-3" />
        <span>{hasError.message}</span>
      </div>
    );
  }

  if (showSuccess && successMessage) {
    return (
      <div className="mt-1 flex items-center space-x-1 text-xs text-green-500">
        <CheckCircle className="h-3 w-3" />
        <span>{successMessage}</span>
      </div>
    );
  }

  return null;
};

export default FormValidation;
