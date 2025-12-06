import RegisterPage from '../pages/RegisterPage';

interface BelenConectaRegisterProps {
  setPage: (page: string) => void;
}

const BelenConectaRegister = ({ setPage }: BelenConectaRegisterProps) => {
  return <RegisterPage setPage={setPage} setUser={() => {}} />;
};

export default BelenConectaRegister;
