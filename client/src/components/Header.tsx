import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledButton = styled(Button)({
  color: '#00CED1',
  '&:hover': {
    color: '#FF69B4',
  },
});

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" style={{ color: '#00CED1', flexGrow: 1 }}>
          My Music App
        </Typography>
        <StyledButton href="/">Home</StyledButton>
        <StyledButton href="/uploadSong">Upload Song</StyledButton>
        <StyledButton href="/songList">Song List</StyledButton>
        <StyledButton href="/createGroup">Create Group</StyledButton>
        <StyledButton href="/addWords">Words group</StyledButton>
        <StyledButton href="/CreateExpression">Create Expression</StyledButton>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
