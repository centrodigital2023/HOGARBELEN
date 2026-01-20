/**
 * LegalAcceptanceCheckbox Component
 * 
 * Displays a checkbox for accepting Terms and Conditions + Privacy Policy
 * Used in registration and other forms requiring legal consent
 */

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ExternalLink } from '@phosphor-icons/react';

interface LegalAcceptanceCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function LegalAcceptanceCheckbox({
  checked,
  onCheckedChange,
  required = true,
  disabled = false,
  className = ''
}: LegalAcceptanceCheckboxProps) {
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <Checkbox
        id="legal-acceptance"
        checked={checked}
        onCheckedChange={onCheckedChange}
        required={required}
        disabled={disabled}
        className="mt-1"
      />
      <Label
        htmlFor="legal-acceptance"
        className="text-sm leading-relaxed cursor-pointer"
      >
        He leído y acepto los{' '}
        <a
          href="/terminos-y-condiciones"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium inline-flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          Términos y Condiciones
          <ExternalLink size={14} weight="bold" />
        </a>
        {' '}y la{' '}
        <a
          href="/politica-de-privacidad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium inline-flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          Política de Privacidad
          <ExternalLink size={14} weight="bold" />
        </a>
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
    </div>
  );
}

export default LegalAcceptanceCheckbox;
