/**
 * Google OAuth 2.0 Helper
 * Implements secure Google Sign-In using the new Google Identity Services
 * Does NOT expose client secrets in frontend
 */

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}

export interface GoogleAuthResponse {
  credential: string; // JWT ID token
  select_by?: string;
}

/**
 * Initialize Google Sign-In button
 * Call this after the DOM is loaded
 */
export const initializeGoogleSignIn = (
  onSuccess: (response: GoogleAuthResponse) => void,
  onError?: (error: any) => void
) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    console.error('VITE_GOOGLE_CLIENT_ID not configured');
    return;
  }

  // Load Google Identity Services library
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  
  script.onload = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: onSuccess,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  };
  
  script.onerror = (error) => {
    console.error('Failed to load Google Sign-In script', error);
    if (onError) onError(error);
  };
  
  document.head.appendChild(script);
};

/**
 * Render Google Sign-In button
 * @param elementId - ID of the HTML element to render the button
 * @param options - Google button customization options
 */
export const renderGoogleButton = (
  elementId: string,
  options?: {
    type?: 'standard' | 'icon';
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    logo_alignment?: 'left' | 'center';
    width?: number;
  }
) => {
  if (window.google) {
    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        type: options?.type || 'standard',
        theme: options?.theme || 'outline',
        size: options?.size || 'large',
        text: options?.text || 'signin_with',
        shape: options?.shape || 'rectangular',
        logo_alignment: options?.logo_alignment || 'left',
        width: options?.width,
      }
    );
  }
};

/**
 * Parse JWT token to extract user information
 * NOTE: This is for display purposes only. Backend MUST validate the token.
 * @param credential - JWT ID token from Google
 */
export const parseJWT = (credential: string): GoogleUser | null => {
  try {
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified,
    };
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

/**
 * Sign out from Google
 */
export const signOutGoogle = () => {
  if (window.google) {
    window.google.accounts.id.disableAutoSelect();
  }
};

// Type definitions for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleAuthResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: {
              type?: string;
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              logo_alignment?: string;
              width?: number;
            }
          ) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export default {
  initializeGoogleSignIn,
  renderGoogleButton,
  parseJWT,
  signOutGoogle,
};
