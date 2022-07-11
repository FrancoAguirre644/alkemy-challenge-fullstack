import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutRoot = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar />
    </>
  );
};
