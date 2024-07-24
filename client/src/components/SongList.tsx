import React, { useState, useEffect } from 'react';
import SongDetail from './SongDetails';
import { apiService } from '../apiService'; 
import { SongDTO } from '../../../types/songDTO';

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
        setSongs(response?.data);
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

  const handleStop = () => {
    setPlayingSongID(null);
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
    <div style={{ padding: '20px', backgroundColor: '#fff', color: '#000' }}>
      <h1 style={{ textAlign: 'center', color: '#000' }}>Song List</h1>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #000', backgroundColor: '#fff', color: '#000' }}
        >
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Composer">Composer</option>
          <option value="Performer">Performer</option>
          <option value="WordText">Word Text</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={`Filter by ${filterType}`}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #000', backgroundColor: '#fff', color: '#000', width: '300px' }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredSongs.map(song => (
          <div 
            key={song.SongID}
            style={{
              width: '400px',
              border: '1px solid #000',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <div 
              style={{ padding: '10px', backgroundColor: '#000', color: '#fff', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => handleSongClick(song.SongID)}
            >
              {song.Title}
            </div>
            {openedSongID === song.SongID && (
              <div style={{ padding: '10px' }}>
                <SongDetail 
                  song={song} 
                  filterValue={filterValue} 
                  filterType={filterType} 
                  isCurrentlyPlaying={playingSongID === song.SongID}
                  onPlay={() => handlePlay(song.SongID)}
                  onStop={handleStop}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
