# Guía Rápida: Cómo Agregar SEO a Cualquier Página

## 🚀 Pasos para Implementar SEO en una Página

### 1. Importar los Componentes Necesarios

Al inicio del archivo, agregar:

```typescript
import { SEOHead } from '@/components/SEOHead';
import { SEO_CONFIG } from '@/lib/seo-config';
```

### 2. Agregar el Componente SEOHead

Dentro del `return()`, justo después del `<div>` principal:

```typescript
return (
  <div className="min-h-screen">
    <SEOHead
      title={SEO_CONFIG.nombreDePagina.title}
      description={SEO_CONFIG.nombreDePagina.description}
      keywords={SEO_CONFIG.nombreDePagina.keywords}
      canonical={SEO_CONFIG.nombreDePagina.canonical}
      ogImage={SEO_CONFIG.nombreDePagina.ogImage}
      schema={SEO_CONFIG.nombreDePagina.schema}
    />
    
    {/* Resto del contenido */}
  </div>
);
```

### 3. Actualizar el H1

El H1 debe coincidir con el configurado en `SEO_CONFIG`:

```typescript
<h1 className="text-4xl md:text-6xl font-bold">
  {SEO_CONFIG.nombreDePagina.h1}
</h1>
```

O copiar el texto del H1 desde la configuración.

### 4. Agregar Contenido SEO Local

En alguna parte visible de la página, incluir:

```typescript
<p className="text-lg text-gray-700">
  Hogar Belén es un referente en cuidado de adultos mayores en Buesaco 
  y municipios cercanos como Pasto, La Unión y San Lorenzo.
</p>
```

### 5. Optimizar CTAs

Usar los CTAs optimizados:

```typescript
<Button onClick={handleWhatsApp}>
  Agenda tu visita sin compromiso
</Button>

<p className="text-sm text-gray-500">
  Respondemos en menos de 5 minutos
</p>
```

## 📋 Template Completo para Copiar/Pegar

```typescript
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { SEO_CONFIG } from '@/lib/seo-config';

interface MiPaginaProps {
  setPage: (page: string) => void;
}

const MiPagina = ({ setPage }: MiPaginaProps) => {
  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/573215708655?text=Hola, me gustaría conocer más sobre [NOMBRE DEL SERVICIO]',
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50">
      <SEOHead
        title={SEO_CONFIG.nombrePagina.title}
        description={SEO_CONFIG.nombrePagina.description}
        keywords={SEO_CONFIG.nombrePagina.keywords}
        canonical={SEO_CONFIG.nombrePagina.canonical}
        ogImage={SEO_CONFIG.nombrePagina.ogImage}
        schema={SEO_CONFIG.nombrePagina.schema}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            [TÍTULO H1 DESDE SEO_CONFIG]
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            [DESCRIPCIÓN OPTIMIZADA CON KEYWORDS]
          </p>
        </div>

        {/* Contenido Principal con H2 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            [H2 ESTRATÉGICO CON KEYWORDS]
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Contenido que incluye naturalmente las keywords principales...
          </p>
        </div>

        {/* Sección con H3 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            [H3 CON KEYWORD SECUNDARIA]
          </h3>
          <p className="text-gray-700">
            Más contenido descriptivo...
          </p>
        </div>

        {/* Contenido SEO Local */}
        <div className="bg-primary-50 rounded-2xl p-8 mb-16">
          <p className="text-lg text-gray-800 text-center">
            Hogar Belén es un referente en cuidado de adultos mayores en Buesaco 
            y municipios cercanos como Pasto, La Unión y San Lorenzo. 
            Ubicados en el corazón de Nariño, ofrecemos servicios profesionales 
            en un entorno natural privilegiado.
          </p>
        </div>

        {/* CTA Final Optimizado */}
        <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            [CTA TITLE - del SEO_CONFIG]
          </h2>
          <p className="text-xl mb-4">
            [Descripción persuasiva]
          </p>
          <p className="text-sm text-primary-100 mb-8">
            📞 Respondemos en menos de 5 minutos<br />
            Tu tranquilidad empieza con una conversación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Agenda tu visita sin compromiso
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsApp}
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-600"
            >
              Habla con nosotros por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPagina;
```

## 🎯 Checklist de SEO por Página

Antes de considerar una página "SEO completa", verificar:

- [ ] SEOHead component implementado
- [ ] Title optimizado (<60 caracteres)
- [ ] Meta description (<160 caracteres)
- [ ] H1 único y descriptivo con keyword principal
- [ ] Al menos 2-3 H2 con keywords secundarias
- [ ] Al menos 2-3 H3 con variaciones de keywords
- [ ] Contenido SEO local incluido (mención de Buesaco, Nariño, ciudades cercanas)
- [ ] CTAs optimizados con microcopys
- [ ] Links a WhatsApp con mensaje pre-filled
- [ ] Imágenes con ALT text descriptivo
- [ ] Contenido mínimo de 500-800 palabras
- [ ] Keywords integradas naturalmente (densidad 1-2%)
- [ ] Schema JSON-LD implementado

## 🔍 Keywords por Tipo de Página

### Páginas de Servicios/Planes
- **Primaria**: [nombre del plan/servicio] + [ubicación]
  - Ejemplo: "centro vida adultos mayores Buesaco"
- **Secundarias**: 
  - [tipo de servicio] + Nariño
  - [beneficio] + adultos mayores
  - [característica] + tercera edad

### Página Principal
- **Primaria**: hogar geriátrico Buesaco
- **Secundarias**: 
  - centro vida adultos mayores Nariño
  - cuidado adulto mayor
  - atención geriátrica

### Páginas Informativas
- **Primaria**: [tema] + [ubicación]
- **Secundarias**: variaciones del tema + adultos mayores

## 💡 Tips para Contenido SEO Natural

1. **Mencionar la ubicación en el primer párrafo**
   ✅ "En Hogar Belén, ubicado en Buesaco, Nariño..."
   
2. **Usar sinónimos naturalmente**
   - Adultos mayores = tercera edad = personas mayores = abuelos
   - Hogar geriátrico = centro de vida = residencia = hogar

3. **Incluir preguntas que los usuarios buscan**
   - "¿Buscas un centro de vida en Buesaco?"
   - "¿Necesitas cuidado profesional para adultos mayores?"

4. **Mencionar ciudades cercanas**
   - "Servimos a familias de Buesaco, Pasto, La Unión y San Lorenzo"

5. **Usar números y datos**
   - "Más de 2 años de experiencia"
   - "Atención 24/7"

## 📞 Información de Contacto (Usar Consistentemente)

```typescript
const CONTACT_INFO = {
  phone: '+57 321 570 8655',
  email: 'hogarbelen2022@gmail.com',
  whatsapp: 'https://wa.me/573215708655',
  address: 'Buesaco, Nariño, Colombia',
  name: 'Hogar Belén'
};
```

## 🎨 CTAs Aprobados (Usar Estos)

### Alta Conversión
- "Agenda tu visita sin compromiso"
- "Habla con nosotros por WhatsApp"
- "Escríbenos ahora"
- "Conecta hoy por WhatsApp"

### Media Conversión
- "Ver próximas salidas"
- "Solicitar información"
- "Conocer más"
- "Reserva tu estancia"

### Microcopys (Siempre Incluir)
- "Respondemos en menos de 5 minutos"
- "Tu tranquilidad empieza con una conversación"
- "Habla con una persona, no con un bot"

---

**¿Necesitas ayuda?**
Revisa `SEO_CONFIG` en `/src/lib/seo-config.ts` para ver todos los metadatos configurados.
