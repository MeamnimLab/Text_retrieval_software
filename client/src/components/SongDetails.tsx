import React, { useState, useEffect } from 'react';
import { SongDTO } from '../../../types/songDTO';
import { FaVolumeUp } from 'react-icons/fa';
import { Button, Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const SongDetailContainer = styled(Box)({
  padding: '30px', 
  backgroundColor: '#fff',
  color: '#000',
  maxWidth: '800px', 
  margin: '0 auto', 
  textAlign: 'center',
});

const SongTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#00CED1',
  fontSize: '1.8rem',
});

const SongActions = styled(Box)({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
});

const PlayButton = styled(Button)({
  backgroundColor: '#00CED1',
  color: '#fff',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#FF69B4',
  },
});

const StatisticsContainer = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#f1f1f1',
  borderRadius: '8px',
  textAlign: 'left',
});

const StatItem = styled(Typography)({
  marginBottom: '10px',
  color: '#333',
});

const ToggleStatsButton = styled(Button)({
  backgroundColor: '#00CED1',
  color: '#fff',
  padding: '16px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#FF69B4',
  },
});

// TypeScript interface for props
interface SongDetailProps {
  song: SongDTO;
  filterValue: string;
  filterType: string;
  isCurrentlyPlaying: boolean;
  onPlay: () => void;
}

// Component
const SongDetail: React.FC<SongDetailProps> = ({ song, filterValue, filterType, isCurrentlyPlaying, onPlay }) => {
  const [isSpeaking, setIsSpeaking] = useState(isCurrentlyPlaying);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(window.speechSynthesis.getVoices()[0]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
  }, []);

  useEffect(() => {
    if (isCurrentlyPlaying) {
      readLyrics();
    } else {
      stopSpeech();
    }
  }, [isCurrentlyPlaying]);

  const highlightText = (text: string) => {
    if (!filterValue || filterType !== 'WordText') return text;
    const regex = new RegExp(`(${filterValue})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const groupedWords = song.Words.reduce<{ [key: number]: string[] }>((acc, word) => {
    if (!acc[word.Line]) acc[word.Line] = [];
    acc[word.Line].push(word.WordText);
    return acc;
  }, {});

  const readLyrics = () => {
    if (isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance();
    const lyrics = Object.values(groupedWords).flat().join(' ');
    utterance.text = lyrics;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      onPlay();
    };
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleVoiceChange = (event: SelectChangeEvent<string>) => {
    const selectedVoiceName = event.target.value;
    const voice = voices.find(v => v.name === selectedVoiceName);
    setSelectedVoice(voice || null);
  };

  // Calculate word statistics
  const wordCounts = Object.values(groupedWords).map(line => line.length);
  const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);

  return (
    <SongDetailContainer>
      <SongTitle variant="h4">{song.Title}</SongTitle>
      <Typography variant="h6"><strong>Author:</strong> {song.Author}</Typography>
      <Typography variant="h6"><strong>Composer:</strong> {song.Composer}</Typography>
      <Typography variant="h6"><strong>Performer:</strong> {song.Performer}</Typography>
      <Box className='song-words'>
        {Object.keys(groupedWords).map(lineNumber => (
          <Box key={lineNumber} className='song-line'>
            {groupedWords[Number(lineNumber)].map((word, index) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: highlightText(word + ' ') }}
              />
            ))}
          </Box>
        ))}
      </Box>
      {showStatistics && (
        <StatisticsContainer>
          <StatItem><strong>Total Words:</strong> {totalWords}</StatItem>
          {wordCounts.map((count, index) => (
            <StatItem key={index}><strong>Line {index + 1}:</strong> {count} words</StatItem>
          ))}
        </StatisticsContainer>
      )}
      <SongActions>
        <Select 
          onChange={handleVoiceChange} 
          value={selectedVoice?.name || ''}
          className='voice-select'
          sx={{ marginBottom: '15px' }}
        >
          <MenuItem value="">Select Voice</MenuItem>
          {voices.map((voice) => (
            <MenuItem key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </MenuItem>
          ))}
        </Select>
        <PlayButton onClick={isSpeaking ? stopSpeech : readLyrics}>
          <FaVolumeUp /> {isSpeaking ? 'Stop Reading' : 'Read Lyrics'}
        </PlayButton>
      </SongActions>
      <ToggleStatsButton onClick={() => setShowStatistics(!showStatistics)}>
        {showStatistics ? 'Hide Statistical Analyses' : 'Show Statistical Analyses'}
      </ToggleStatsButton>
    </SongDetailContainer>
  );
};

export default SongDetail;
