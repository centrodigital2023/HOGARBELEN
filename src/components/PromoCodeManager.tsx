import { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, CheckCircle, XCircle, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';

interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string;
  expiryDate: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  applicablePlans: string[];
  createdDate: string;
}

export default function PromoCodeManager() {
  const [promoCodes, setPromoCodes] = useKV<PromoCode[]>('hogar-belen-promo-codes', []);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    description: '',
    expiryDate: '',
    maxUses: '',
    applicablePlans: 'all'
  });

  const resetForm = () => {
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      description: '',
      expiryDate: '',
      maxUses: '',
      applicablePlans: 'all'
    });
    setEditingCode(null);
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code }));
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.discountValue || !formData.expiryDate) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const discountNum = parseFloat(formData.discountValue);
    if (isNaN(discountNum) || discountNum <= 0) {
      toast.error('El valor del descuento debe ser mayor a 0');
      return;
    }

    if (formData.discountType === 'percentage' && discountNum > 100) {
      toast.error('El porcentaje de descuento no puede ser mayor a 100%');
      return;
    }

    const plans = formData.applicablePlans === 'all' 
      ? ['Esencial', 'Familiar', 'Premium'] 
      : [formData.applicablePlans];

    if (editingCode) {
      setPromoCodes(current =>
        (current || []).map(code =>
          code.id === editingCode.id
            ? {
                ...code,
                code: formData.code.toUpperCase(),
                discountType: formData.discountType,
                discountValue: discountNum,
                description: formData.description,
                expiryDate: formData.expiryDate,
                maxUses: parseInt(formData.maxUses) || 999,
                applicablePlans: plans
              }
            : code
        )
      );
      toast.success('Código promocional actualizado');
    } else {
      const newCode: PromoCode = {
        id: `PROMO-${Date.now()}`,
        code: formData.code.toUpperCase(),
        discountType: formData.discountType,
        discountValue: discountNum,
        description: formData.description,
        expiryDate: formData.expiryDate,
        maxUses: parseInt(formData.maxUses) || 999,
        usedCount: 0,
        isActive: true,
        applicablePlans: plans,
        createdDate: new Date().toISOString()
      };

      setPromoCodes(current => [...(current || []), newCode]);
      toast.success('Código promocional creado');
    }

    setIsCreateOpen(false);
    resetForm();
  };

  const handleEdit = (code: PromoCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      discountType: code.discountType,
      discountValue: code.discountValue.toString(),
      description: code.description,
      expiryDate: code.expiryDate,
      maxUses: code.maxUses.toString(),
      applicablePlans: code.applicablePlans.length === 3 ? 'all' : code.applicablePlans[0]
    });
    setIsCreateOpen(true);
  };

  const handleDelete = (id: string) => {
    setPromoCodes(current => (current || []).filter(code => code.id !== id));
    toast.success('Código promocional eliminado');
  };

  const toggleActive = (id: string) => {
    setPromoCodes(current =>
      (current || []).map(code =>
        code.id === id ? { ...code, isActive: !code.isActive } : code
      )
    );
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getDiscountDisplay = (code: PromoCode) => {
    if (code.discountType === 'percentage') {
      return `${code.discountValue}% OFF`;
    } else {
      return `$${code.discountValue.toLocaleString()} COP OFF`;
    }
  };

  const sortedCodes = [...(promoCodes || [])].sort((a, b) => {
    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Códigos Promocionales</h2>
          <p className="text-muted-foreground">
            Gestiona descuentos y cupones para tus planes
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Crear Código
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingCode ? 'Editar Código Promocional' : 'Crear Código Promocional'}
              </DialogTitle>
              <DialogDescription>
                Configura los detalles del código de descuento
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Código Promocional</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    placeholder="VERANO2024"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    maxLength={20}
                    className="font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateCode}
                  >
                    Generar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountType">Tipo de Descuento</Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value: 'percentage' | 'fixed') =>
                      setFormData({ ...formData, discountType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                      <SelectItem value="fixed">Monto Fijo (COP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discountValue">Valor</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    placeholder={formData.discountType === 'percentage' ? '15' : '50000'}
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  placeholder="Descuento de verano"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="maxUses">Usos Máximos</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    placeholder="100"
                    value={formData.maxUses}
                    onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="applicablePlans">Planes Aplicables</Label>
                <Select
                  value={formData.applicablePlans}
                  onValueChange={(value) => setFormData({ ...formData, applicablePlans: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los planes</SelectItem>
                    <SelectItem value="Esencial">Solo Plan Esencial</SelectItem>
                    <SelectItem value="Familiar">Solo Plan Familiar</SelectItem>
                    <SelectItem value="Premium">Solo Plan Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateOpen(false);
                    resetForm();
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  {editingCode ? 'Actualizar' : 'Crear Código'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sortedCodes.length === 0 ? (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hay códigos promocionales</h3>
            <p className="text-muted-foreground mb-6">
              Crea tu primer código de descuento para atraer más clientes
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Primer Código
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCodes.map((code) => {
            const expired = isExpired(code.expiryDate);
            const exhausted = code.usedCount >= code.maxUses;
            const inactive = !code.isActive || expired || exhausted;

            return (
              <Card
                key={code.id}
                className={`relative ${inactive ? 'opacity-60' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg font-mono">
                          {code.code}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(code.code, code.id)}
                          className="h-7 w-7 p-0"
                        >
                          {copiedId === code.id ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <CardDescription className="text-xs">
                        {code.description || 'Sin descripción'}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        inactive
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-green-100 text-green-700'
                      }
                    >
                      {expired ? 'Vencido' : exhausted ? 'Agotado' : code.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-primary">
                      {getDiscountDisplay(code)}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usos:</span>
                      <span className="font-semibold">
                        {code.usedCount} / {code.maxUses}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vence:</span>
                      <span className={`font-semibold ${expired ? 'text-destructive' : ''}`}>
                        {formatDate(code.expiryDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Planes:</span>
                      <span className="font-semibold">
                        {code.applicablePlans.length === 3
                          ? 'Todos'
                          : code.applicablePlans.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(code.id)}
                      className="flex-1"
                      disabled={expired || exhausted}
                    >
                      {code.isActive ? (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Activar
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(code)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(code.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
