import FamilyDashboard from '../pages/FamilyDashboard';

interface FamilyDashboardWrapperProps {
  user: any;
  setPage?: (page: string) => void;
}

const FamilyDashboardWrapper = ({ user, setPage }: FamilyDashboardWrapperProps) => {
  return <FamilyDashboard user={user} setPage={setPage || (() => {})} />;
};

export default FamilyDashboardWrapper;
