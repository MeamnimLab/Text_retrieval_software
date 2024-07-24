import React, { useState, useEffect } from 'react';
import { SongDTO } from '../../../types/songDTO';
import { FaVolumeUp, FaStop } from 'react-icons/fa';
import "./SongDetails.css";

interface SongDetailProps {
  song: SongDTO;
  filterValue: string;
  filterType: string;
  isCurrentlyPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}

const SongDetail: React.FC<SongDetailProps> = ({ song, filterValue, filterType, isCurrentlyPlaying, onPlay, onStop }) => {
  const [isSpeaking, setIsSpeaking] = useState(isCurrentlyPlaying);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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
      onStop();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      onStop();
    }
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoiceName = event.target.value;
    const voice = voices.find(v => v.name === selectedVoiceName);
    setSelectedVoice(voice || null);
  };

  return (
    <div className='song-detail'>
      <h2 className='song-title'>{song.Title}</h2>
      <p><strong>Author:</strong> {song.Author}</p>
      <p><strong>Composer:</strong> {song.Composer}</p>
      <p><strong>Performer:</strong> {song.Performer}</p>
      <div className='song-words'>
        {Object.keys(groupedWords).map(lineNumber => (
          <div key={lineNumber} className='song-line'>
            {groupedWords[Number(lineNumber)].map((word, index) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: highlightText(word + ' ') }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className='song-actions'>
        <select onChange={handleVoiceChange} className='voice-select'>
          <option value="">Select Voice</option>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
        <button onClick={isSpeaking ? stopSpeech : readLyrics} className='play-button'>
          {isSpeaking ? <FaStop /> : <FaVolumeUp />} {isSpeaking ? 'Stop Reading' : 'Read Lyrics'}
        </button>
      </div>
    </div>
  );
};

export default SongDetail;
