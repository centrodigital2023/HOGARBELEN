import { Toaster as Sonner } from 'sonner';

const Tostadora = () => {
  return (
    <Sonner 
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    />
  );
};

export default Tostadora;
