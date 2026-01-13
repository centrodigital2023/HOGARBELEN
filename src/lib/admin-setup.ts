import { AdminUser } from '@/types/admin';

  password: '@Sara2918+',
};
export const setupAdminUs
    id: 'admin-001',
  

    totp_secret: ADMIN_CREDENTIALS.totpSecret,

  adminUsers[adminUs

  adminPasswords[adminUs

};
export const verifyAdmi
  const adminPasswords = await window.spark.kv
  co

    return false;

    console.log('❌ Admin password not configured');

  if (!adminUser.totp_enabled || !adminUser.totp_secret) {
    return false;



};port const getAdminInfo = async (): Promise<void> => {


  if (!adminUser) {
    console.log('❌ No admin user configured');
    return;
  }

  console.log('👤 Admin User Info:');
  console.log(`   Email: ${adminUser.email}`);
    return false;`);
  }? '✅ Enabled' : '❌ Disabled'}`);
at).toLocaleString()}`);
};















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















