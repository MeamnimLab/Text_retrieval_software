import { Composer } from '../entity/Composer.entity';
import { Author } from '../entity/Author.entity';
import { Performer } from '../entity/Performer.entity';
import { Song } from '../entity/Song.entity';
import { Database } from '../database';
import { Word } from '../entity/Word.entity';
import { SongWords } from '../entity/SongWords.entity';
import {SongDTO} from '../../../types/songDTO'


export const createSong = async (body, file) => {
  const { title, releaseDate, author: authorName, composer: composerName, performer: performerName } = body;

  
  const database: Database = await Database.getInstance();

  // Get repositories for each entity
  const authorRepo = await database.getRepository(Author);
  const composerRepo = await database.getRepository(Composer);
  const performerRepo = await database.getRepository(Performer);
  const songRepo = await database.getRepository(Song);
  // Check if author exists, otherwise create a new one
  let author = await authorRepo.findOne({ where: { Name: authorName } });
  if (!author) {
    author = authorRepo.create({ Name: authorName });
    await authorRepo.save(author);
  }
  // Check if composer exists, otherwise create a new one
  let composer = await composerRepo.findOne({ where: { Name: composerName } });
  if (!composer) {
    composer = composerRepo.create({ Name: composerName });
    await composerRepo.save(composer);
  }
  // Check if performer exists, otherwise create a new one
  let performer = await performerRepo.findOne({ where: { Name: performerName } });
  if (!performer) {
    performer = performerRepo.create({ Name: performerName });
    await performerRepo.save(performer);
  }
  // Create a new song
  const song = new Song();
  song.Title = title;
  song.Composer=composer;
  song.Performer=performer;
  song.Author=author
  song.ReleaseDate=releaseDate;

  // Save the song to the database
  const newSong:Song =  await songRepo.save(song);
  const lyrics = file.buffer.toString('utf-8');
  await analyzeAndStoreLyrics(lyrics,newSong)
  return newSong;
};

export const analyzeAndStoreLyrics = async (lyrics: string, songId: Song) => {
    // Repositories
    const database: Database = await Database.getInstance();
    const wordRepo = await database.getRepository(Word);
    const songWordsRepo = await database.getRepository(SongWords)

    const lines = lyrics.split('\n'); // Split lyrics into lines

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex].trim();
        const words = line.split(/\s+/); // Split line into words by whitespace

        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const wordText = words[wordIndex];

            if (wordText === '') continue; // Skip empty words

            // Check if word exists in the database
            let word = await wordRepo.findOneBy({ WordText: wordText });

            if (!word) {
                // Create a new word if it doesn't exist
                word = new Word();
                word.WordText = wordText;
                await wordRepo.save(word);
            }

            // Create a relationship between song and word
            const songWord = new SongWords();
            songWord.SongID = songId.SongID;
            songWord.WordID = word;
            songWord.Line = lineIndex; // Line index
            songWord.WordIndex = wordIndex; // Word index in line
                
            await songWordsRepo.save(songWord);
        }
    }
};


export const getAllSongs = async (): Promise<SongDTO[]> => {

  const database: Database = await Database.getInstance();
  const songWordsRepo = await database.getRepository(SongWords);
  const songRepo = await database.getRepository(Song);

  // Fetch all songs with their meta data
  const songs = await songRepo.find({ relations: ["Author", "Composer", "Performer"] });

  const result: SongDTO[] = [];

  for (const song of songs) {
    // Fetch the words for the current song using song.SongID
    const songWords = await songWordsRepo.find({
      where: { SongID:song.SongID}, 
      relations: ['WordID'],
      order: {
        Line: 'ASC',
        WordIndex: 'ASC',
      },
    });

      // Map the songWords to an array of words in order
      const words = songWords.map(sw => ({
        WordText: sw.WordID.WordText,
        Line: sw.Line,
        WordIndex: sw.WordIndex,
      }));
  
      // Create the DTO object
      const songDTO: SongDTO = {
        SongID: song.SongID,
        Title: song.Title,
        ReleaseDate: song.ReleaseDate,
        Author: song.Author ? song.Author.Name : "",
        Composer: song.Composer ? song.Composer.Name : "",
        Performer: song.Performer ? song.Performer.Name : "",
        Words: words,
      };
  
      result.push(songDTO);
    }
  
    return result;
  };

