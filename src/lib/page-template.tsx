import { SEOHead } from '../components/SEOHead';
import { Navigation } from '../components/Navigation';

// Default placeholder content
const DEFAULT_PLACEHOLDER = 'Esta página está en desarrollo. Pronto estará disponible con contenido completo.';

interface PageTemplateProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  h1: string;
  content?: React.ReactNode;
  schema?: object;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  keywords,
  canonical,
  h1,
  content,
  schema
}) => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        schema={schema}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{h1}</h1>
        <div className="prose prose-lg max-w-none">
          {content || (
            <p className="text-gray-600">
              {DEFAULT_PLACEHOLDER}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
