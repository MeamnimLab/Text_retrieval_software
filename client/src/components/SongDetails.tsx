import React from 'react';
import { SongDTO } from '../../../types/songDTO';
import "./SongDetails.css";

interface SongDetailProps {
  song: SongDTO;
  filterValue: string;
  filterType: string;
}

const SongDetail: React.FC<SongDetailProps> = ({ song, filterValue, filterType }) => {
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

  return (
    <div>
      <h2>{song.Title}</h2>
      <p><strong>Author:</strong> {song.Author}</p>
      <p><strong>Composer:</strong> {song.Composer}</p>
      <p><strong>Performer:</strong> {song.Performer}</p>
      <div className='song-words'>
        {Object.keys(groupedWords).map(lineNumber => (
          <div key={lineNumber}>
            {groupedWords[Number(lineNumber)].map((word, index) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: highlightText(word + ' ') }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongDetail;
