import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export const Breadcrumbs = ({ items, onNavigate }: BreadcrumbsProps) => {
  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.path && { "item": `https://www.hogarbelen.org${item.path}` })
    }))
  };

  // Inject schema into head
  if (typeof document !== 'undefined') {
    let scriptTag = document.querySelector('script[data-schema="breadcrumb"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(breadcrumbSchema);
  }

  const handleClick = (e: React.MouseEvent, path?: string) => {
    if (path && onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-gray-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home icon for first item */}
          <li className="flex items-center">
            <a
              href="/"
              onClick={(e) => handleClick(e, '/')}
              className="text-gray-500 hover:text-primary-600 transition-colors"
              aria-label="Inicio"
            >
              <Home className="h-4 w-4" />
            </a>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
              {item.path && index < items.length - 1 ? (
                <a
                  href={item.path}
                  onClick={(e) => handleClick(e, item.path)}
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <span 
                  className="text-gray-900 font-semibold" 
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
