export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin_secundario';
  full_name: string;
  created_at: string;
  last_login?: string;
  totp_enabled: boolean;
  totp_secret?: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expires_at: number;
  totp_verified: boolean;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_email: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details: Record<string, any>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
}

export interface LoginAttempt {
  email: string;
  ip_address: string;
  timestamp: number;
  success: boolean;
}

export interface TOTPSetup {
  secret: string;
  qrCode: string;
  manual_entry_key: string;
}

export interface DashboardKPIs {
  total_professionals: number;
  pending_approvals: number;
  active_jobs: number;
  total_leads: number;
  leads_this_month: number;
  ai_alerts: number;
}

export interface Professional {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  specialization: string;
  experience_years?: number;
  verified: boolean;
  approved: boolean;
  blue_check: boolean;
  photo_url?: string;
  documents?: string[];
  created_at: string;
  ai_risk_score?: number;
  ai_classification?: string;
}

export interface JobOffer {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary_range?: string;
  employment_type: 'full_time' | 'part_time' | 'contract';
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source_page: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  ai_priority?: 'low' | 'medium' | 'high';
  ai_recommendations?: string[];
  created_at: string;
  assigned_to?: string;
}
