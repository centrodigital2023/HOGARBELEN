import ServicesPage from '../pages/ServicesPage';

interface PáginaDeServiciosWrapperProps {
  setPage?: (page: string) => void;
}

const PáginaDeServiciosWrapper = ({ setPage }: PáginaDeServiciosWrapperProps = {}) => {
  return <ServicesPage setPage={setPage} />;
};

export default PáginaDeServiciosWrapper;
