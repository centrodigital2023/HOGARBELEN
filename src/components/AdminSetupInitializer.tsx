import { useEffect, useState } from 'react';
import { setupAdminUser, verifyAdminSetup } from '@/lib/admin-setup';

const AdminSetupInitializer = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAdmin = async () => {
      const isSetup = await verifyAdminSetup();
      
      if (!isSetup) {
        console.log('🔧 Initializing admin user...');
        await setupAdminUser();
        console.log('✅ Admin user initialized successfully');
      } else {
        console.log('✅ Admin user already configured');
      }
      
      setInitialized(true);
    };

    initAdmin();
  }, []);

  return null;
};

export default AdminSetupInitializer;
