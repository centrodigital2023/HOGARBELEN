import { useState } from 'react';
import { LOCAL_SEO } from '../lib/seo-config';

interface LegalCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

export const LegalCheckbox = ({ 
  checked, 
  onChange, 
  error,
  onTermsClick,
  onPrivacyClick 
}: LegalCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="legal-checkbox"
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="legal-checkbox" className="text-gray-700">
            Acepto la{' '}
            <button
              type="button"
              onClick={onPrivacyClick}
              className="text-primary-600 hover:text-primary-800 underline font-medium"
            >
              política de datos
            </button>
            {' '}y{' '}
            <button
              type="button"
              onClick={onTermsClick}
              className="text-primary-600 hover:text-primary-800 underline font-medium"
            >
              términos de servicio
            </button>
            :
          </label>
          <p className="text-xs text-gray-600 mt-1">
            {LOCAL_SEO.legalCheckboxText}
          </p>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

// Hook personalizado para manejar la aceptación legal
export const useLegalConsent = () => {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!accepted) {
      setError('Debe aceptar los términos y condiciones para continuar');
      return false;
    }
    setError('');
    return true;
  };

  return {
    accepted,
    setAccepted,
    error,
    validate
  };
};
