import { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, LockKey, AlertTriangle } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface Admin2FAProps {
  setPage: (page: string) => void;
}

const Admin2FA = ({ setPage }: Admin2FAProps) => {
  const { verifyTOTP, totpRequired, isAuthenticated } = useAdminAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!totpRequired) {
      setPage('admin-login');
    }
  }, [totpRequired]);

  useEffect(() => {
    if (isAuthenticated) {
      setPage('admin-dashboard');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    const nextEmptyIndex = newCode.findIndex(c => !c);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Por favor ingrese el código completo');
      return;
    }

    if (attempts >= 3) {
      setError('Demasiados intentos fallidos. Por favor inicie sesión nuevamente.');
      setTimeout(() => setPage('admin-login'), 2000);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await verifyTOTP(fullCode);
      
      if (!result.success) {
        setAttempts(prev => prev + 1);
        setError(result.error || 'Código inválido');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        toast.error(result.error || 'Código inválido');
        return;
      }

      toast.success('Autenticación exitosa');
      setPage('admin-dashboard');
    } catch (err) {
      setError('Error inesperado al verificar código');
      toast.error('Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative z-10 border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <LockKey size={24} weight="bold" className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Verificación de Doble Factor
          </CardTitle>
          <CardDescription className="text-gray-400">
            Ingrese el código de 6 dígitos desde su aplicación de autenticación
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-200">
                <AlertTriangle size={16} className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-900/50 border-2 border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  disabled={loading}
                />
              ))}
            </div>

            {attempts > 0 && (
              <div className="text-center text-sm text-amber-400">
                Intentos restantes: {3 - attempts}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || code.some(c => !c)}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Verificando...
                </>
              ) : (
                <>
                  <Shield size={16} className="mr-2" />
                  Verificar Código
                </>
              )}
            </Button>

            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <Shield size={14} className="mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-gray-300">Aplicaciones compatibles:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Google Authenticator</li>
                    <li>Microsoft Authenticator</li>
                    <li>Authy</li>
                    <li>1Password</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-gray-400 hover:text-gray-300"
              onClick={() => setPage('admin-login')}
            >
              Volver al inicio de sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin2FA;
