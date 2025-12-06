import LoginPage from '../pages/LoginPage';

interface BelenConectaLoginProps {
  setPage: (page: string) => void;
}

const BelenConectaLogin = ({ setPage }: BelenConectaLoginProps) => {
  return <LoginPage setPage={setPage} setUser={() => {}} />;
};

export default BelenConectaLogin;
