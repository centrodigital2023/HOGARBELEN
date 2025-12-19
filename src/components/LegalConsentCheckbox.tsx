import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

interface LegalConsentCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onLegalClick?: (page: 'terminos-condiciones' | 'politica-privacidad') => void;
  required?: boolean;
}

/**
 * Legal consent checkbox component
 * Required for all forms per legal compliance requirements
 */
const LegalConsentCheckbox = ({ 
  checked, 
  onCheckedChange, 
  onLegalClick,
  required = true 
}: LegalConsentCheckboxProps) => {
  const handleLinkClick = (e: React.MouseEvent, page: 'terminos-condiciones' | 'politica-privacidad') => {
    e.preventDefault();
    if (onLegalClick) {
      onLegalClick(page);
    }
  };

  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <Checkbox
        id="legal-consent"
        checked={checked}
        onCheckedChange={onCheckedChange}
        required={required}
        className="mt-1"
      />
      <div className="flex-1">
        <Label
          htmlFor="legal-consent"
          className="text-sm text-gray-700 leading-relaxed cursor-pointer"
        >
          Acepto la{' '}
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'politica-privacidad')}
            className="text-primary-600 hover:text-primary-700 underline font-medium"
          >
            política de datos
          </button>
          {' '}y{' '}
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'terminos-condiciones')}
            className="text-primary-600 hover:text-primary-700 underline font-medium"
          >
            términos de servicio
          </button>
          . Autorizo a Hogar Belén Buesaco S.A.S. el tratamiento de mis datos 
          personales y el contacto vía llamada, correo o WhatsApp.
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
    </div>
  );
};

export default LegalConsentCheckbox;
