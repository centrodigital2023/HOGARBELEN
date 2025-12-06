# Sistema de Descuentos y Códigos Promocionales

## Descripción General

El sistema de códigos promocionales de Hogar Belén permite crear, gestionar y aplicar descuentos a los planes de suscripción. Está diseñado para impulsar campañas de marketing, recompensar clientes, y aumentar las conversiones.

## Características Principales

### 1. Gestión de Códigos (Admin)

**Ubicación**: `PromoCodeManager.tsx`

**Funcionalidades**:
- ✅ Crear códigos promocionales personalizados
- ✅ Generar códigos aleatorios automáticamente
- ✅ Configurar descuentos por porcentaje o monto fijo
- ✅ Establecer fechas de vencimiento
- ✅ Limitar número de usos máximos
- ✅ Restringir a planes específicos
- ✅ Activar/desactivar códigos
- ✅ Editar códigos existentes
- ✅ Eliminar códigos
- ✅ Copiar códigos al portapapeles
- ✅ Visualizar uso actual vs. límite

**Estructura del Código**:
```typescript
interface PromoCode {
  id: string;              // Identificador único
  code: string;            // Código promocional (ej: VERANO2024)
  discountType: 'percentage' | 'fixed';  // Tipo de descuento
  discountValue: number;   // Valor del descuento
  description: string;     // Descripción del código
  expiryDate: string;      // Fecha de vencimiento
  maxUses: number;         // Usos máximos permitidos
  usedCount: number;       // Conteo de usos actuales
  isActive: boolean;       // Estado activo/inactivo
  applicablePlans: string[]; // Planes aplicables
  createdDate: string;     // Fecha de creación
}
```

### 2. Aplicación de Descuentos (Checkout)

**Ubicación**: `PaymentModal.tsx`

**Flujo de Aplicación**:
1. Usuario ingresa código en el campo de texto
2. Click en botón "Aplicar"
3. Sistema valida:
   - ✅ Código existe
   - ✅ Código está activo
   - ✅ No ha expirado
   - ✅ No ha alcanzado límite de usos
   - ✅ Es aplicable al plan seleccionado
4. Si válido: calcula descuento y actualiza UI
5. Si inválido: muestra mensaje de error específico

**Validaciones**:
```typescript
- Código inválido (no existe)
- Código inactivo
- Código expirado
- Límite de usos alcanzado
- No aplicable al plan seleccionado
```

**Cálculo de Descuento**:
```typescript
// Porcentaje
descuento = (precio_base * porcentaje) / 100

// Monto fijo
descuento = valor_fijo

// Precio final
precio_final = max(0, precio_base - descuento)
```

### 3. Visualización Pública

**Ubicación**: `PublicPromoCodes.tsx`

**Características**:
- Muestra solo códigos activos y válidos
- Diseño atractivo con gradientes y badges
- Indicadores de urgencia:
  - ⚡ Expira en ≤3 días
  - 🔥 Últimos cupos (≥80% de uso)
- Información clara:
  - Descuento
  - Días restantes
  - Usos disponibles
  - Planes aplicables

### 4. Almacenamiento de Datos

**Persistencia**: Spark KV Storage

**Claves utilizadas**:
```typescript
'hogar-belen-promo-codes'      // Array de códigos promocionales
'hogar-belen-subscriptions'    // Incluye campo promoCode
'hogar-belen-payment-history'  // Incluye campos promoCode y discount
```

## Componentes Creados

### 1. `PromoCodeManager.tsx`
Panel de administración completo para gestionar códigos promocionales.

**Props**: Ninguna (standalone)

**Hooks utilizados**:
- `useKV('hogar-belen-promo-codes')` - Gestión de códigos

**Características UI**:
- Grid responsivo de tarjetas
- Diálogo modal para crear/editar
- Badges de estado (Activo, Vencido, Agotado)
- Botones de acción (Editar, Eliminar, Activar/Desactivar)
- Generador de códigos aleatorios
- Validación de formularios

### 2. `PaymentModal.tsx` (Actualizado)
Modal de pago con integración de códigos promocionales.

**Nuevas características**:
- Campo de entrada para código promocional
- Botón "Aplicar" con validación
- Visualización de descuento aplicado
- Desglose de precio (Subtotal - Descuento = Total)
- Cálculo dinámico del precio final
- Tracking de uso de códigos

### 3. `PublicPromoCodes.tsx`
Sección pública para mostrar ofertas activas.

**Props**: Ninguna (standalone)

**Características**:
- Filtrado automático de códigos válidos
- Diseño premium con gradientes
- Indicadores visuales de urgencia
- Responsive (1-3 columnas)
- Información completa del descuento

### 4. `AdminPromoCodes.tsx`
Página dedicada para administración de códigos.

**Props**:
- `setPage: (page: string) => void`

**Características**:
- Botón de navegación de vuelta
- Wrapper simple para PromoCodeManager

## Integración en la Aplicación

### Rutas y Navegación

```typescript
// App.tsx - agregar casos de página
case 'admin-promo-codes': 
  return <AdminPromoCodes setPage={setCurrentPage} />;

// Navegación desde dashboard profesional
<Button onClick={() => setPage('admin-promo-codes')}>
  Gestionar Códigos Promocionales
</Button>
```

### Mostrar Ofertas en Página Principal

```tsx
// PáginaPrincipal.tsx o PáginaDePrecios.tsx
import PublicPromoCodes from '../components/PublicPromoCodes';

function PáginaDePrecios() {
  return (
    <div>
      {/* ... otros contenidos ... */}
      <PublicPromoCodes />
      {/* ... planes de precios ... */}
    </div>
  );
}
```

## Casos de Uso

### 1. Campaña de Lanzamiento
```
Código: LANZAMIENTO50
Descuento: 50%
Válido: 30 días
Usos: 100
Planes: Todos
```

### 2. Descuento Referido
```
Código: AMIGO20
Descuento: 20%
Válido: Sin vencimiento
Usos: Ilimitado
Planes: Esencial, Familiar
```

### 3. Promoción Temporal
```
Código: VERANO2024
Descuento: $50,000 COP
Válido: Hasta 31/08/2024
Usos: 50
Planes: Premium
```

### 4. Oferta Flash
```
Código: FLASH48H
Descuento: 30%
Válido: 2 días
Usos: 25
Planes: Todos
```

## Mejores Prácticas

### Para Administradores

1. **Códigos Memorables**: Usa códigos cortos y fáciles de recordar
2. **Descripciones Claras**: Explica el beneficio del código
3. **Límites Razonables**: Establece límites de uso apropiados
4. **Monitoreo**: Revisa regularmente el uso de códigos
5. **Rotación**: Crea nuevos códigos regularmente
6. **Desactivación**: Desactiva códigos obsoletos en lugar de eliminarlos

### Para Desarrolladores

1. **Validación**: Siempre valida códigos antes de aplicar descuentos
2. **Seguridad**: Nunca confíes en validación solo del cliente
3. **Atomicidad**: Incrementa `usedCount` solo después de pago exitoso
4. **Logging**: Registra uso de códigos en historial de pagos
5. **Testing**: Prueba todos los casos límite (expiry, max uses, etc.)

## Seguridad

### Consideraciones
- ✅ Los códigos se almacenan en KV (persistente)
- ✅ Validación en cada aplicación
- ✅ No se pueden usar códigos inactivos
- ✅ No se pueden usar códigos expirados
- ✅ Límite de usos estricto
- ✅ Restricción por plan

### Limitaciones Actuales
- ⚠️ No hay rate limiting (usuario podría intentar muchos códigos)
- ⚠️ No hay auditoría de intentos fallidos
- ⚠️ No hay códigos únicos por usuario (un código se puede usar múltiples veces por la misma persona hasta el límite)

### Mejoras Futuras Sugeridas
- Sistema de códigos únicos por usuario
- Rate limiting de intentos
- Panel de analytics (códigos más usados, conversión, etc.)
- Notificaciones cuando códigos están por expirar
- Códigos con condiciones avanzadas (primer pago, planes anuales, etc.)
- Exportación de reportes de uso

## Troubleshooting

### Código no se aplica
1. Verificar que el código está activo
2. Comprobar fecha de vencimiento
3. Verificar límite de usos
4. Confirmar que el plan es aplicable

### Descuento incorrecto
1. Revisar tipo de descuento (porcentaje vs. fijo)
2. Verificar valor del descuento
3. Comprobar cálculo: `max(0, base - discount)`

### Código desaparece de vista pública
1. Puede haber expirado
2. Puede haber alcanzado límite de usos
3. Puede estar desactivado

## Ejemplo de Flujo Completo

```
1. Admin crea código "BIENVENIDA30" con 30% de descuento
2. Código aparece en sección de ofertas públicas
3. Usuario ve el código en la página de precios
4. Usuario selecciona Plan Familiar
5. En checkout, ingresa "BIENVENIDA30"
6. Sistema valida y aplica 30% de descuento
7. Precio actualizado: $100,000 → $70,000
8. Usuario completa pago
9. Sistema incrementa usedCount del código
10. Suscripción almacena promoCode="BIENVENIDA30"
11. Historial de pago registra discount="$30,000 COP"
```

## Conclusión

El sistema de códigos promocionales es una herramienta poderosa para impulsar ventas y fidelizar clientes. Con una interfaz intuitiva tanto para administradores como para usuarios, y validaciones robustas, proporciona una experiencia completa de gestión de descuentos.
