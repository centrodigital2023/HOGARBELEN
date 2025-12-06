import PricingPage from '../pages/PricingPage';

interface PáginaDePrecios {
  setPage?: (page: string) => void;
}

const PáginaDePreciosWrapper = ({ setPage }: PáginaDePrecios) => {
  return <PricingPage setPage={setPage || (() => {})} />;
};

export default PáginaDePreciosWrapper;
