import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <>
      <DashboardLayoutRoot>
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
      </DashboardLayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
    </>
  );
};
