import React from 'react';
import { Popover } from '@mui/material';

interface MenuPopoverProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLButtonElement | null;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({ children, open, onClose, anchorEl }) => {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
        >

            {children}
        </Popover>
    );
}

export default MenuPopover;