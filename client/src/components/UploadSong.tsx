import React, { useState } from 'react';
import { apiService } from '../apiService'; 

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

  return (
    <div>
      <h2>Upload Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select song file:</label>
          <input type="file" id="file" accept=".txt" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="composer">Composer:</label>
          <input
            type="text"
            id="composer"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="performer">Performer:</label>
          <input
            type="text"
            id="performer"
            value={performer}
            onChange={(e) => setPerformer(e.target.value)}
          />
        </div>
        <button type="submit">Upload Song</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default UploadSong;
