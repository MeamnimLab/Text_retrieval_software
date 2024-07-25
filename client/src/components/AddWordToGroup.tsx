import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { Word, Group } from '../../../types/songDTO';
import { Container, Typography, Box, MenuItem, Select, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

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

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '600px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#00CED1',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF69B4',
  },
  marginTop: '1rem',
});

const StyledSelect = styled(Select)({
  marginTop: '1rem',
  width: '100%',
});

const StyledTextField = styled(TextField)({
  marginTop: '1rem',
  width: '100%',
});

const AddWordToGroup: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [words, setWords] = useState<Word[]>([]);
    const [selectedGroupID, setSelectedGroupID] = useState<number | null>(null);
    const [selectedWordID, setSelectedWordID] = useState<number | null>(null);
    const [wordText, setWordText] = useState('');
    const { getData, postData } = apiService();

    useEffect(() => {
        const fetchGroupsAndWords = async () => {
            try {
                const groupsResponse = await getData('api/groups');
                const wordsResponse = await getData('api/words');
                setGroups(groupsResponse?.data);
                setWords(wordsResponse?.data);
            } catch (error) {
                console.error('Error fetching groups and words:', error);
            }
        };
        fetchGroupsAndWords();
    }, [getData]);

    const handleAddWord = async () => {
        if (selectedGroupID && selectedWordID) {
            try {
                await postData('api/groups/addWordToGroup', {
                    GroupID: selectedGroupID,
                    WordID: selectedWordID
                });
                alert('Word added to group successfully!');
            } catch (error) {
                console.error('Error adding word to group:', error);
                alert('Error adding word to group');
            }
        }
    };

    const handleWordTextSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const word = words.find(w => w.WordText === wordText);
        if (word && selectedGroupID) {
            try {
                await postData('api/groups/addWordToGroup', {
                    GroupID: selectedGroupID,
                    WordID: word.WordID
                });
                setWordText('');
                alert('Word added to group successfully!');
            } catch (error) {
                console.error('Error adding word to group:', error);
                alert('Error adding word to group');
            }
        } else {
            alert('Word not found in the database');
        }
    };

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom style={{ color: '#00CED1' }}>
                Add Word to Group
            </Typography>
            <StyledBox>
                <Typography variant="h6" style={{ color: '#FF69B4' }}>Select Group</Typography>
                <StyledSelect
                    value={selectedGroupID ?? ''}
                    onChange={(e) => setSelectedGroupID(Number(e.target.value))}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a group</MenuItem>
                    {groups.map(group => (
                        <MenuItem key={group.GroupID} value={group.GroupID}>
                            {group.GroupName}
                        </MenuItem>
                    ))}
                </StyledSelect>

                <Typography variant="h6" style={{ color: '#FF69B4', marginTop: '1rem' }}>Select Word</Typography>
                <StyledSelect
                    value={selectedWordID ?? ''}
                    onChange={(e) => setSelectedWordID(Number(e.target.value))}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a word</MenuItem>
                    {words.map(word => (
                        <MenuItem key={word.WordID} value={word.WordID}>
                            {word.WordText}
                        </MenuItem>
                    ))}
                </StyledSelect>
                <StyledButton onClick={handleAddWord}>Add Word</StyledButton>

                <Typography variant="h6" style={{ color: '#FF69B4', marginTop: '1rem' }}>Or Enter Word Text</Typography>
                <form onSubmit={handleWordTextSubmit}>
                    <StyledTextField
                        label="Enter word text"
                        variant="outlined"
                        value={wordText}
                        onChange={(e) => setWordText(e.target.value)}
                        required
                    />
                    <StyledButton type="submit">Add Word by Text</StyledButton>
                </form>
            </StyledBox>
        </StyledContainer>
    );
};

export default AddWordToGroup;
