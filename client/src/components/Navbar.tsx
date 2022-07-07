import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import AccountPopover from './AccountPopover';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

const Navbar = () => {

  const { auth } = useSelector((state: RootState) => state);

  return (
    <NavbarRoot>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2
        }}
      >
        <IconButton sx={{ ml: 1 }}>
          <Avatar src='https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/b9ykawulidxbxjlso6h9' alt="logoURL" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {auth.access_token && <AccountPopover />}
      </Toolbar>
    </NavbarRoot>
  );
};

export default Navbar;
