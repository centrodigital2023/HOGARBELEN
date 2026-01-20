/**
 * Security Utilities
 * 
 * Provides security-related functions including IP hashing
 * and secure data handling for privacy compliance.
 */

/**
 * Hash an IP address using SHA-256
 * This ensures IP addresses are not stored in plain text for privacy
 * 
 * @param ip - The IP address to hash
 * @returns Promise resolving to the SHA-256 hash of the IP
 */
export async function hashIP(ip: string): Promise<string> {
  // Convert string to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  
  // Hash using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Get client IP address
 * Attempts to get the real IP considering proxies and load balancers
 * 
 * @returns The client IP address or null if not available
 */
export function getClientIP(): string | null {
  // In browser environment, we can't directly access the client IP
  // This would need to be retrieved from the server side
  // For now, return a placeholder that will be replaced server-side
  
  // In a real implementation with a backend:
  // - Check X-Forwarded-For header
  // - Check X-Real-IP header
  // - Fall back to request.connection.remoteAddress
  
  return 'client-ip-placeholder';
}

/**
 * Sanitize user input to prevent XSS attacks
 * 
 * @param input - The user input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Validate email format
 * 
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a secure random token
 * 
 * @param length - Length of the token (default: 32)
 * @returns Random token string
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Mask sensitive data for display
 * Shows only first and last few characters
 * 
 * @param data - The sensitive data to mask
 * @param visibleChars - Number of characters to show at start/end (default: 4)
 * @returns Masked string
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (data.length <= visibleChars * 2) {
    return '*'.repeat(data.length);
  }
  
  const start = data.substring(0, visibleChars);
  const end = data.substring(data.length - visibleChars);
  const middle = '*'.repeat(Math.max(data.length - (visibleChars * 2), 3));
  
  return `${start}${middle}${end}`;
}

/**
 * Rate limiting helper
 * Tracks attempts and enforces limits
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(
    private maxAttempts: number,
    private windowMs: number
  ) {}
  
  /**
   * Check if identifier has exceeded rate limit
   * 
   * @param identifier - Unique identifier (e.g., IP, user ID)
   * @returns true if rate limit exceeded
   */
  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return false;
    }
    
    if (record.count >= this.maxAttempts) {
      return true;
    }
    
    record.count++;
    return false;
  }
  
  /**
   * Reset rate limit for identifier
   * 
   * @param identifier - Unique identifier to reset
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
  
  /**
   * Get remaining attempts for identifier
   * 
   * @param identifier - Unique identifier
   * @returns Number of remaining attempts
   */
  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record || Date.now() > record.resetTime) {
      return this.maxAttempts;
    }
    return Math.max(0, this.maxAttempts - record.count);
  }
}
