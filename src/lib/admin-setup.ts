import { AdminUser } from '@/types/admin';

const ADMIN_CREDENTIALS = {
  email: 'hogarbelen2022@gmail.com',
  password: '@Sara2918+',
  fullName: 'Administrador Principal',
  totpSecret: 'JBSWY3DPEHPK3PXP',
};

export const setupAdminUser = async (): Promise<void> => {
  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
  const adminPasswords = await window.spark.kv.get<Record<string, string>>('admin-passwords') ?? {};

  const existingAdmin = Object.values(adminUsers).find(u => u.email === ADMIN_CREDENTIALS.email);
  
  if (existingAdmin) {
    return;
  }

  const adminUser: AdminUser = {
    id: 'admin-001',
    email: ADMIN_CREDENTIALS.email,
    full_name: ADMIN_CREDENTIALS.fullName,
    role: 'super_admin',
    totp_enabled: true,
    totp_secret: ADMIN_CREDENTIALS.totpSecret,
    created_at: new Date().toISOString(),
  };

  adminUsers[adminUser.id] = adminUser;
  adminPasswords[adminUser.id] = ADMIN_CREDENTIALS.password;

  await window.spark.kv.set('admin-users', adminUsers);
  await window.spark.kv.set('admin-passwords', adminPasswords);
};

export const verifyAdminPassword = async (email: string, password: string): Promise<string | null> => {
  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
  const adminPasswords = await window.spark.kv.get<Record<string, string>>('admin-passwords') ?? {};

  const adminUser = Object.values(adminUsers).find(u => u.email === email);
  
  if (!adminUser) {
    console.log('❌ Admin user not found');
    return null;
  }

  const storedPassword = adminPasswords[adminUser.id];
  
  if (!storedPassword) {
    console.log('❌ Admin password not configured');
    return null;
  }

  if (storedPassword !== password) {
    return null;
  }

  return adminUser.id;
};

export const verifyAdminSetup = async (): Promise<boolean> => {
  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};

  if (!adminUsers || Object.keys(adminUsers).length === 0) {
    return false;
  }

  const adminUser = Object.values(adminUsers).find(u => u.email === ADMIN_CREDENTIALS.email);

  if (!adminUser) {
    return false;
  }

  return true;
};

export const logAdminInfo = async (): Promise<void> => {
  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};

  if (!adminUsers || Object.keys(adminUsers).length === 0) {
    console.log('❌ No admin users configured');
    return;
  }

  const adminUser = Object.values(adminUsers).find(u => u.email === ADMIN_CREDENTIALS.email);

  if (!adminUser) {
    console.log('❌ No admin user configured');
    return;
  }

  console.log('👤 Admin User Info:');
  console.log(`   Email: ${adminUser.email}`);
  console.log(`   Role: ${adminUser.role}`);
  console.log(`   2FA: ${adminUser.totp_enabled ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   Created: ${new Date(adminUser.created_at).toLocaleString()}`);
};
