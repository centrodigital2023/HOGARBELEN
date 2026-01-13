import { AdminUser } from '@/types/admin';

export const ADMIN_CREDENTIALS = {
  email: 'josefabian1212@gmail.com',
  password: '@Sara2918+',
  totpSecret: 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',
};

export const setupAdminUser = async (): Promise<void> => {
  const adminUser: AdminUser = {
    id: 'admin-001',
    email: ADMIN_CREDENTIALS.email,
    role: 'super_admin',
    full_name: 'José Fabián',
    created_at: new Date().toISOString(),
    totp_enabled: true,
    totp_secret: ADMIN_CREDENTIALS.totpSecret,
  };

  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
  adminUsers[adminUser.id] = adminUser;
  await window.spark.kv.set('admin-users', adminUsers);

  const adminPasswords = await window.spark.kv.get<Record<string, string>>('admin-passwords') ?? {};
  adminPasswords[adminUser.id] = ADMIN_CREDENTIALS.password;
  await window.spark.kv.set('admin-passwords', adminPasswords);

  console.log('✅ Admin user configured with credentials');
};

export const verifyAdminSetup = async (): Promise<boolean> => {
  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
  const adminPasswords = await window.spark.kv.get<Record<string, string>>('admin-passwords') ?? {};
  
  const adminUser = Object.values(adminUsers).find(u => u.email === ADMIN_CREDENTIALS.email);
  
  if (!adminUser) {
    console.log('❌ Admin user not found, will initialize...');
    return false;
  }

  if (!adminPasswords[adminUser.id]) {
    console.log('❌ Admin password not configured, will initialize...');
    return false;
  }

  if (!adminUser.totp_enabled || !adminUser.totp_secret) {
    console.log('❌ 2FA not configured, will initialize...');
    return false;
  }

  console.log('✅ Admin setup verified');
  console.log(`📧 Admin Email: ${adminUser.email}`);
  console.log(`👤 Admin Name: ${adminUser.full_name}`);
  console.log(`🔐 2FA Status: ${adminUser.totp_enabled ? 'Enabled' : 'Disabled'}`);
  console.log(`🔑 2FA Code: 123012`);
  return true;
};

export const getAdminInfo = async (): Promise<void> => {
  const adminUsers = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
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















