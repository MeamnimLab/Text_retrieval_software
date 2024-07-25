import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { WordInGroup } from '../../../types/songDTO';
import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledContainer = styled(Container)({
  padding: '20px',
  backgroundColor: '#f9f9f9',
  color: '#333',
});

const GroupCard = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  color: '#333',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const GroupTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#FF69B4',
});

const WordList = styled(Box)({
  maxHeight: '200px',
  overflowY: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f1f1f1',
});

const WordItem = styled(Box)({
  backgroundColor: '#fff',
  color: '#333',
  padding: '5px 10px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

// Component
const GroupList: React.FC = () => {
    const [groups, setGroups] = useState<WordInGroup[]>([]);
    const { getData } = apiService();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getData('api/groups/groupWithWords');
                setGroups(response?.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);


    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#FF69B4' , fontFamily: 'Pacifico, cursive',fontSize: '2.5rem',}}>
                Groups
            </Typography>
            {groups.map(group => (
                <GroupCard key={group.groupName}>
                    <GroupTitle variant="h6" style={{fontFamily: 'Pacifico, cursive'}}>{group.groupName}</GroupTitle>
                    <WordList>
                        {group.wordName.map((word, index) => (
                            <WordItem key={index}>{word}</WordItem>
                        ))}
                    </WordList>
                </GroupCard>
            ))}
        </StyledContainer>
    );
};

export default GroupList;
