/**
 * useLegalAcceptance Hook
 * 
 * Manages legal document acceptance tracking
 * Integrates with Supabase to record and verify acceptance
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentLegalVersions } from '@/lib/legalVersions';
import { hashIP, getClientIP } from '@/lib/security';

export type AcceptanceContext = 
  | 'professional_registration'
  | 'family_registration'
  | 'job_offer_publication'
  | 'profile_update';

export interface LegalAcceptance {
  id: string;
  user_id: string;
  terms_version: string;
  privacy_version: string;
  accepted_at: string;
  ip_hash: string;
  user_agent: string | null;
  acceptance_context: AcceptanceContext;
  created_at: string;
}

export interface UseLegalAcceptanceReturn {
  checkAcceptance: (userId: string) => Promise<{
    hasAccepted: boolean;
    needsNewAcceptance: boolean;
    lastAcceptance: LegalAcceptance | null;
  }>;
  recordAcceptance: (
    userId: string,
    context: AcceptanceContext
  ) => Promise<{ success: boolean; error?: string }>;
  getCurrentVersions: () => { terms: string; privacy: string; lastUpdated: string };
  loading: boolean;
  error: string | null;
}

export function useLegalAcceptance(): UseLegalAcceptanceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get current legal document versions
   */
  const getCurrentVersions = useCallback(() => {
    return getCurrentLegalVersions();
  }, []);

  /**
   * Check if user has accepted current version of legal documents
   */
  const checkAcceptance = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const currentVersions = getCurrentLegalVersions();

      // Get most recent acceptance for user
      const { data, error: queryError } = await supabase
        .from('legal_acceptances')
        .select('*')
        .eq('user_id', userId)
        .order('accepted_at', { ascending: false })
        .limit(1);

      if (queryError) {
        throw queryError;
      }

      const lastAcceptance = data && data.length > 0 ? data[0] as LegalAcceptance : null;

      if (!lastAcceptance) {
        return {
          hasAccepted: false,
          needsNewAcceptance: true,
          lastAcceptance: null
        };
      }

      // Check if versions match current versions
      const needsNewAcceptance = 
        lastAcceptance.terms_version !== currentVersions.terms ||
        lastAcceptance.privacy_version !== currentVersions.privacy;

      return {
        hasAccepted: true,
        needsNewAcceptance,
        lastAcceptance
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al verificar aceptación legal';
      setError(errorMessage);
      return {
        hasAccepted: false,
        needsNewAcceptance: true,
        lastAcceptance: null
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Record legal acceptance for user
   */
  const recordAcceptance = useCallback(async (
    userId: string,
    context: AcceptanceContext
  ) => {
    setLoading(true);
    setError(null);

    try {
      const currentVersions = getCurrentLegalVersions();
      const clientIP = getClientIP();
      const ipHashValue = clientIP ? await hashIP(clientIP) : 'unknown';

      const acceptanceData = {
        user_id: userId,
        terms_version: currentVersions.terms,
        privacy_version: currentVersions.privacy,
        ip_hash: ipHashValue,
        user_agent: navigator.userAgent,
        acceptance_context: context,
        accepted_at: new Date().toISOString()
      };

      const { error: insertError } = await supabase
        .from('legal_acceptances')
        .insert(acceptanceData);

      if (insertError) {
        throw insertError;
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar aceptación legal';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    checkAcceptance,
    recordAcceptance,
    getCurrentVersions,
    loading,
    error
  };
}
