/**
 * Utilidades para validación de imágenes
 * Ayuda a manejar rutas de imágenes y fallbacks
 */

/**
 * Valida si una ruta de imagen existe en los assets
 * @param path Ruta de la imagen a validar
 * @returns true si la imagen existe, false en caso contrario
 */
export const validateImagePath = (path: string): boolean => {
  try {
    // Intenta importar dinámicamente la imagen
    const images = import.meta.glob('@/assets/images/*', { eager: true });
    const normalizedPath = path.replace('@/assets/images/', '');
    return Object.keys(images).some(key => key.includes(normalizedPath));
  } catch {
    return false;
  }
};

/**
 * Obtiene la ruta de imagen o un fallback si no existe
 * @param path Ruta de la imagen original
 * @param fallback Ruta de la imagen de respaldo
 * @returns La ruta original si existe, o el fallback
 */
export const getImageOrFallback = (path: string, fallback: string): string => {
  return validateImagePath(path) ? path : fallback;
};

/**
 * Carga una imagen de manera segura con manejo de errores
 * @param path Ruta de la imagen
 * @param onError Función a ejecutar si la imagen falla al cargar
 * @returns Promise con la URL de la imagen
 */
export const loadImageSafely = async (
  path: string,
  onError?: (error: Error) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(path);
    };
    
    img.onerror = () => {
      const error = new Error(`Failed to load image: ${path}`);
      if (onError) {
        onError(error);
      }
      reject(error);
    };
    
    img.src = path;
  });
};

/**
 * Verifica si una URL es válida
 * @param url URL a validar
 * @returns true si la URL es válida, false en caso contrario
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
