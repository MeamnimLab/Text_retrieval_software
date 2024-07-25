import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { apiService } from '../apiService';
import { Link } from 'react-router-dom';

// Styled components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#fff',
  padding: '2rem',
});

const StyledForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '400px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#00CED1',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF69B4',
  },
  marginTop: '1rem',
});

const StyledWhiteButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#00CED1',
  border: '2px solid #00CED1',
  '&:hover': {
    backgroundColor: '#00CED1',
    color: '#fff',
  },
  marginTop: '1rem',
  textAlign: 'center',
});

// Component
const CreateGroup: React.FC = () => {
    const [groupName, setGroupName] = useState('');
    const { postData } = apiService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postData('api/groups/createGroup', { GroupName: groupName });
            setGroupName('');
            alert('Group created successfully!');
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Error creating group');
        }
    };

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom style={{ color: '#00CED1',fontFamily: 'Pacifico, cursive' }}>
                Create New Group
            </Typography>
            <StyledForm component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Group Name"
                    variant="outlined"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <StyledButton type="submit" variant="contained">
                    Create Group
                </StyledButton>
                {/* Button to Add Words to Group */}
                <Box textAlign="center" marginTop="2rem">
                    <Link to="/addWords" style={{ textDecoration: 'none' }}>
                        <StyledWhiteButton variant="outlined">
                            Add Words to Group
                        </StyledWhiteButton>
                    </Link>
                </Box>
                <Box textAlign="center">
                <Link to="/groupList" style={{ textDecoration: 'none' }}>
                        <StyledWhiteButton variant="outlined">
                            Group List
                        </StyledWhiteButton>
                    </Link>
                </Box>
            </StyledForm>
        </StyledContainer>
    );
};

export default CreateGroup;
