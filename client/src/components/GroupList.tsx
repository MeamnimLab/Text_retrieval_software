import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { WordInGroup } from '../../../types/songDTO';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

export interface WordIndex {
    Line: number;
    WordIndex: number;
}
  
export interface WordIndicesMap {
    [word: string]: WordIndex[];
}

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
  flexDirection: 'column',
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
    const [wordIndices, setWordIndices] = useState<WordIndicesMap>({});
    const [selectedGroupID, setSelectedGroupID] = useState<string>('');
    const [visibleIndicesGroup, setVisibleIndicesGroup] = useState<string | null>(null);
    const { getData } = apiService();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getData('api/groups/groupWithWords');
                setGroups(response?.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    const fetchWordIndices = async (groupID: string) => {
        try {
            const response = await getData(`api/groups/${groupID}/wordIndices`);
            setWordIndices(response?.data);
        } catch (error) {
            console.error('Error fetching word indices:', error);
        }
    };

    const handleShowIndices = async (groupID: string) => {
        if (visibleIndicesGroup === groupID) {
            // Hide the indices if already visible
            setVisibleIndicesGroup(null);
        } else {
            // Show indices for the selected group
            await fetchWordIndices(groupID);
            setVisibleIndicesGroup(groupID);
        }
    };

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#FF69B4', fontFamily: 'Pacifico, cursive', fontSize: '2.5rem' }}>
                Groups
            </Typography>
            {groups.map(group => (
                <GroupCard key={group.groupName}>
                    <GroupTitle variant="h6" style={{ fontFamily: 'Pacifico, cursive' }}>{group.groupName}</GroupTitle>
                    <WordList>
                        {group.wordName.map((word, index) => (
                            <WordItem key={index}>{word}</WordItem>
                        ))}
                    </WordList>
                    <Button
                        variant="contained"
                        onClick={() => handleShowIndices(group.groupID)}
                        style={{ marginTop: '10px', color: 'white',backgroundColor:'#00CED1', borderColor:'#FF69B4'
                        }}
                    >
                        {visibleIndicesGroup === group.groupID ? 'Hide Indices' : 'Show Indices'}
                    </Button>
                    {visibleIndicesGroup === group.groupID && (
                        <Box style={{ marginTop: '20px' }}>
                            <Typography variant="h6" style={{ color: '#FF69B4' }}>Word Indices for Group {group.groupName}</Typography>
                            <Box>
                                {Object.entries(wordIndices).map(([word, indices]) => (
                                    <Box key={word}>
                                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>{word}:</Typography>
                                        <Typography variant="body2">
                                            {indices.map((index, idx) => (
                                                <span key={idx}>
                                                    ({index.Line}, {index.WordIndex}){idx < indices.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </GroupCard>
            ))}
        </StyledContainer>
    );
};

export default GroupList;
