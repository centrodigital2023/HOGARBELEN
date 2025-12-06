import AICareAssistant from '../pages/AICareAssistant';

interface AICareAssistantWrapperProps {
  setPage: (page: string) => void;
}

const AICareAssistantWrapper = ({ setPage }: AICareAssistantWrapperProps) => {
  return <AICareAssistant setPage={setPage} />;
};

export default AICareAssistantWrapper;
