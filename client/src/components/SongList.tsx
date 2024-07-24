import React, { useState, useEffect } from 'react';
import SongDetail from './SongDetails';
import { apiService } from '../apiService'; 
import { SongDTO } from '../../../types/songDTO';

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<SongDTO[]>([]);
  const [openedSongIDs, setOpenedSongIDs] = useState<Set<number>>(new Set());
  const [filterType, setFilterType] = useState<string>('Title');
  const [filterValue, setFilterValue] = useState<string>('');
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
  }, []);

  const handleButtonClick = (songID: number) => {
    setOpenedSongIDs(prevOpenedSongIDs => {
      const newOpenedSongIDs = new Set(prevOpenedSongIDs);
      if (newOpenedSongIDs.has(songID)) {
        newOpenedSongIDs.delete(songID); // Close song
      } else {
        newOpenedSongIDs.add(songID); // Open song
      }
      return newOpenedSongIDs;
    });
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
    <div>
      <h1>Song List</h1>
      <div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
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
        />
      </div>
      <ul>
        {filteredSongs.map(song => (
          <li key={song.SongID}>
            <button onClick={() => handleButtonClick(song.SongID)}>
              {song.Title}
            </button>
            {openedSongIDs.has(song.SongID) && <SongDetail song={song} filterValue={filterValue} filterType={filterType} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
