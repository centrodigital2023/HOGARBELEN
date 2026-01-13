export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin';
  totp_enabled: boolean;
  totp_secret?: string;
  last_login?: string;
  created_at: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expires_at: number;
  totp_verified: boolean;
}

export interface LoginAttempt {
  email: string;
  ip_address: string;
  timestamp: number;
  success: boolean;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  category: string;
  city: string;
  phone: string;
  email: string;
  photo_url?: string;
  description: string;
  years_experience: number;
  available_days: string[];
  schedule: string;
  rate_per_hour: number;
  documents: {
    cv?: string;
    id_doc?: string;
    certificates?: string[];
    professional_card?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'deleted';
  verified: boolean;
  approval_date?: string;
  approved_by?: string;
  rejection_reason?: string;
  confidence_level?: 'high' | 'medium' | 'low';
  ai_alerts: any[];
  ai_score?: number;
  ai_label?: string;
  created_at: string;
  updated_at: string;
}

export interface JobOffer {
  id: string;
  user_id?: string;
  title: string;
  service_type: string;
  location: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  contact: string;
  status: 'pending' | 'approved' | 'rejected';
  urgency: 'normal' | 'urgent';
  active: boolean;
  expires_at?: string;
  views: number;
  ai_review?: {
    score: number;
    legal_check: boolean;
    language_check: boolean;
    concerns: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  source_page: string;
  source_url: string;
  type: 'contact' | 'professional_signup' | 'offer_interest' | 'subscription' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  data: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    [key: string]: any;
  };
  ai_classification?: {
    priority_score: number;
    intent: string;
    sentiment: string;
    urgency: string;
  };
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AIAlert {
  id: string;
  type: 'suspicious_profile' | 'high_risk_lead' | 'content_violation' | 'fraud_detection' | 'system';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resource_type: 'professional' | 'offer' | 'lead' | 'system';
  resource_id?: string;
  details: any;
  resolved: boolean;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_email: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface AdminSettings {
  id: string;
  category: 'legal' | 'content' | 'ai' | 'system' | 'integrations';
  key: string;
  value: any;
  description?: string;
  updated_by: string;
  updated_at: string;
}

export interface DashboardMetrics {
  professionals: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    verified: number;
  };
  offers: {
    total: number;
    active: number;
    pending: number;
    expired: number;
  };
  leads: {
    total: number;
    thisMonth: number;
    byPriority: {
      low: number;
      medium: number;
      high: number;
      critical: number;
    };
    byStatus: {
      new: number;
      contacted: number;
      qualified: number;
      converted: number;
      lost: number;
    };
  };
  alerts: {
    total: number;
    unresolved: number;
    bySeverity: {
      low: number;
      medium: number;
      high: number;
      critical: number;
    };
  };
}

export interface DashboardKPIs {
  total_professionals: number;
  pending_approvals: number;
  active_jobs: number;
  total_leads: number;
  leads_this_month: number;
  ai_alerts: number;
}
