/**
 * Legal Documents Version Management
 * 
 * Manages versioning for legal documents (Terms and Privacy Policy)
 * and tracks when users need to re-accept updated versions.
 */

export const LEGAL_VERSIONS = {
  TERMS: '1.0',
  PRIVACY: '1.0',
  LAST_UPDATED: '2026-01-19'
} as const;

export interface LegalVersion {
  version: string;
  effectiveDate: string;
  changelog?: string[];
}

export const TERMS_HISTORY: LegalVersion[] = [
  {
    version: '1.0',
    effectiveDate: '2026-01-19',
    changelog: [
      'Versión inicial de Términos y Condiciones',
      'Cumplimiento con normativa colombiana',
      'Definición de responsabilidades de usuarios'
    ]
  }
];

export const PRIVACY_HISTORY: LegalVersion[] = [
  {
    version: '1.0',
    effectiveDate: '2026-01-19',
    changelog: [
      'Versión inicial de Política de Privacidad',
      'Cumplimiento con Ley 1581 de 2012 (Colombia)',
      'Definición de tratamiento de datos personales'
    ]
  }
];

/**
 * Get current version of legal documents
 */
export function getCurrentLegalVersions() {
  return {
    terms: LEGAL_VERSIONS.TERMS,
    privacy: LEGAL_VERSIONS.PRIVACY,
    lastUpdated: LEGAL_VERSIONS.LAST_UPDATED
  };
}

/**
 * Get complete version history for a document type
 */
export function getVersionHistory(documentType: 'terms' | 'privacy'): LegalVersion[] {
  return documentType === 'terms' ? TERMS_HISTORY : PRIVACY_HISTORY;
}

/**
 * Get the latest version for a specific document
 */
export function getLatestVersion(documentType: 'terms' | 'privacy'): string {
  return documentType === 'terms' ? LEGAL_VERSIONS.TERMS : LEGAL_VERSIONS.PRIVACY;
}

/**
 * Compare version numbers
 * Returns: -1 if v1 < v2, 0 if equal, 1 if v1 > v2
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;
    
    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }
  
  return 0;
}

/**
 * Check if a user's accepted version is outdated
 */
export function isVersionOutdated(
  acceptedVersion: string,
  currentVersion: string
): boolean {
  return compareVersions(acceptedVersion, currentVersion) < 0;
}
