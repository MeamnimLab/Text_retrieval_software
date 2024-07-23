import { Composer } from '../entity/Composer.entity';
import { Author } from '../entity/Author.entity';
import { Performer } from '../entity/Performer.entity';
import { Song } from '../entity/Song.entity';
import { Database } from '../database';
import { Word } from '../entity/Word.entity';
import { SongWords } from '../entity/SongWords.entity';


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
  await analyzeAndStoreLyrics(lyrics,newSong);

  return newSong;
};

export const analyzeAndStoreLyrics = async (lyrics: string, songId: Song) => {
    // Repositories
    const database: Database = await Database.getInstance();
    const wordRepo = await database.getRepository(Word);
    const songWordsRepo = await database.getRepository(SongWords)

    // Split lyrics into lines and words
    const stanzas = lyrics.split('\n\n'); // Assuming stanzas are separated by two new lines
    for (let stanzaIndex = 0; stanzaIndex < stanzas.length; stanzaIndex++) {
        const lines = stanzas[stanzaIndex].trim().split('\n'); // Split stanza into lines

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
                songWord.SongID = songId;
                songWord.WordID = word;
                songWord.Line = lineIndex; // Line index
                songWord.WordIndex = wordIndex; // Word index in lin
                
            await songWordsRepo.save(songWord);
        }
    }
};
}

