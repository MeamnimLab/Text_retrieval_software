import React, { useState, useEffect } from 'react';
import SongDetail from './SongDetails';
import { apiService } from '../apiService'; 
import { SongDTO } from '../../../types/songDTO';
import { Button, Container, Typography, Box, TextField, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { saveAs } from 'file-saver';
import { parse } from 'js2xmlparser';

// Styled components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#fff',
  color: '#000',
});

const StyledSongCard = styled(Box)({
  width: '100%',
  maxWidth: '400px',
  border: '1px solid #00CED1',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const SongTitle = styled(Box)({
  width: '100%',
  padding: '20px',
  backgroundColor: '#00CED1',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1.2rem',
});

const FilterContainer = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  maxWidth: '600px',
});

const FilterInput = styled(TextField)({
  backgroundColor: '#fff',
  color: '#000',
  flex: 1,
});

const PlayButton = styled(Button)({
  backgroundColor: '#00CED1',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF69B4',
  },
  marginTop: '1rem',
});

const DownloadButton = styled(Button)({
  backgroundColor: '#FF69B4',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF1493',
  },
  marginTop: '1rem',
});

// Component
const SongList: React.FC = () => {
  const [songs, setSongs] = useState<SongDTO[]>([]);
  const [openedSongID, setOpenedSongID] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>('Title');
  const [filterValue, setFilterValue] = useState<string>('');
  const [playingSongID, setPlayingSongID] = useState<number | null>(null);
  const { getData } = apiService();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getData('api/songs/getAllSongs');
        if (response?.data) {
          setSongs(response.data);
        } else {
          console.error('No data received');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, [getData]);

  const handleSongClick = (songID: number) => {
    setOpenedSongID(prevOpenedSongID => 
      prevOpenedSongID === songID ? null : songID
    );
  };

  const handlePlay = (songID: number) => {
    setPlayingSongID(songID);
  };

  const handleDownload = (song: SongDTO) => {
    try {
      // Convert the song data to XML
      const xml = parse("Song", song);

      // Create a Blob from the XML string
      const blob = new Blob([xml], { type: 'application/xml' });

      // Use FileSaver to save the file
      saveAs(blob, `${song.Title}.xml`);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const filteredSongs = songs.filter(song => {
    if (!filterValue) return true;
    switch (filterType) {
      case 'Title':
        return song.Title.toLowerCase().includes(filterValue.toLowerCase());
      case 'Author':
        return song.Author.toLowerCase().includes(filterValue.toLowerCase());
      case 'Composer':
        return song.Composer.toLowerCase().includes(filterValue.toLowerCase());
      case 'Performer':
        return song.Performer.toLowerCase().includes(filterValue.toLowerCase());
      case 'WordText':
        return song.Words.some(word => word.WordText.toLowerCase().includes(filterValue.toLowerCase()));
      default:
        return true;
    }
  });

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#00CED1', fontFamily: 'Pacifico, cursive', marginTop: "16px" }}>
        Song List
      </Typography>
      <FilterContainer>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ backgroundColor: '#fff', color: '#000', flex: 1 }}
        >
          <MenuItem value="Title">Title</MenuItem>
          <MenuItem value="Author">Author</MenuItem>
          <MenuItem value="Composer">Composer</MenuItem>
          <MenuItem value="Performer">Performer</MenuItem>
          <MenuItem value="WordText">Word Text</MenuItem>
        </Select>
        <FilterInput
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={`Filter by ${filterType}`}
          variant="outlined"
        />
      </FilterContainer>
      <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredSongs.map(song => (
          <StyledSongCard key={song.SongID}>
            <SongTitle onClick={() => handleSongClick(song.SongID)}>
              {song.Title}
            </SongTitle>
            {openedSongID === song.SongID && (
              <Box style={{ padding: '10px', width: '100%' }}>
                <SongDetail 
                  song={song} 
                  filterValue={filterValue} 
                  filterType={filterType} 
                  isCurrentlyPlaying={playingSongID === song.SongID}
                  onPlay={() => handlePlay(song.SongID)}
                />
              </Box>
            )}
            <DownloadButton onClick={() => handleDownload(song)}>
              Download as XML
            </DownloadButton>
          </StyledSongCard>
        ))}
      </Box>
    </StyledContainer>
  );
};

export default SongList;
