import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';
import { apiService } from '../apiService'; 
import { styled } from '@mui/system';
import './UploadSong.css'; // Assuming you have CSS for background image

const StyledContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#000',
  position: 'relative',
  backgroundColor: '#fff',
  overflow: 'hidden'
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  maxWidth: '600px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '8px',
  zIndex: 2
});

const StyledButton = styled(Button)({
  backgroundColor: '#00CED1',
  '&:hover': {
    backgroundColor: '#FF69B4'
  }
});

const Title = styled(Typography)({
  fontFamily: 'Pacifico, cursive',
  fontSize: '2.5rem',
  color: '#00CED1',
  textAlign: 'center'
});

const Note = styled('div')({
  position: 'absolute',
  fontSize: '2rem',
  color: '#FF69B4',
  animation: 'float 10s infinite linear'
});

const UploadSong: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [author, setAuthor] = useState('');
  const [composer, setComposer] = useState('');
  const [performer, setPerformer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { postData } = apiService();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('releaseDate', releaseDate);
    formData.append('author', author);
    formData.append('composer', composer);
    formData.append('performer', performer);

    try {
      const response = await postData('api/songs/upload', formData)
      if (response) {
        setSuccess('Song uploaded successfully!');
        setError(null);
        setFile(null);
        setTitle('');
        setReleaseDate('');
        setAuthor('');
        setComposer('');
        setPerformer('');
      }
    } catch (err) {
      setError('Failed to upload song.');
      setSuccess(null);
    }
  };

  const renderNotes = () => {
    const notes = ['♪', '♫', '♬', '♩'];
    const noteElements = notes.map((note, index) => (
      <Note key={index} style={{ left: `${Math.random() * 100}%`, animationDuration: `${5 + Math.random() * 5}s` }}>
        {note}
      </Note>
    ));
    return noteElements;
  };

  return (
    <StyledContainer>
      {renderNotes()}
      <StyledPaper>
        <Title variant="h4" gutterBottom>
          Upload Song
        </Title>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <input
              type="file"
              id="file"
              accept=".txt"
              onChange={handleFileChange}
              style={{ display: 'block', marginBottom: '10px', color: '#000' }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{ style: { color: '#000' } }}
              InputProps={{ style: { color: '#000' } }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              type="date"
              label="Release Date"
              InputLabelProps={{ shrink: true, style: { color: '#000' } }}
              InputProps={{ style: { color: '#000' } }}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              InputLabelProps={{ style: { color: '#000' } }}
              InputProps={{ style: { color: '#000' } }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label="Composer"
              variant="outlined"
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              InputLabelProps={{ style: { color: '#000' } }}
              InputProps={{ style: { color: '#000' } }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label="Performer"
              variant="outlined"
              value={performer}
              onChange={(e) => setPerformer(e.target.value)}
              InputLabelProps={{ style: { color: '#000' } }}
              InputProps={{ style: { color: '#000' } }}
            />
          </Box>
          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
          >
            Upload Song
          </StyledButton>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
      </StyledPaper>
    </StyledContainer>
  );
};

export default UploadSong;
