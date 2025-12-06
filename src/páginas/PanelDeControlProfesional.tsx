import FamilyDashboard from '../pages/FamilyDashboard';

interface PanelDeControlProfesionalProps {
  user: any;
  userData?: any;
}

const PanelDeControlProfesional = ({ user, userData }: PanelDeControlProfesionalProps) => {
  return <FamilyDashboard user={user} setPage={() => {}} />;
};

export default PanelDeControlProfesional;
