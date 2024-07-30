
import { Word } from '../entity/Word.entity';
import { Database } from '../database';

import { Group } from '../entity/Group.entity';
import { GroupWords } from '../entity/GroupWords.entity';
import { WordInGroup } from '../../../types/songDTO';
import { SongWords } from '../entity/SongWords.entity';
import { In } from 'typeorm';


export const createGroup = async (body) => {
    const { GroupName } = body;
    const database: Database = await Database.getInstance();
      const groupRepo = await database.getRepository(Group);
    const newGroup = groupRepo.create({ GroupName });
   return await groupRepo.save(newGroup);

    
   }

   
export const addWordToGroup = async (body) => {
    const { GroupID, WordID } = body;
    const database: Database = await Database.getInstance();
      const wordGroupRepo = await database.getRepository(GroupWords);
      const wordRepo = await database.getRepository(Word);
      const groupRepo = await database.getRepository(Group);


      const groupWord = wordGroupRepo.create({ GroupID, WordID });
      const word = await wordRepo.findOne({where:{WordID:WordID}})
      const group = await  groupRepo.findOne({where:{GroupID:GroupID}})
      groupWord.Group = group;
      groupWord.Word = word;
      await wordGroupRepo.save(groupWord);
      return groupWord;
  }

export const getAllWords  = async () => {
    const database: Database = await Database.getInstance();
      const wordRepo = await database.getRepository(Word);
      const words = wordRepo.find()
      return words;
}


export const getAllGroups  = async () => {
    const database: Database = await Database.getInstance();
      const groupRepo = await database.getRepository(Group);
      const groups = groupRepo.find()
      return groups;
}

export const getAllGroupsWithWords = async () => {
const database: Database = await Database.getInstance();
const groupRepo = await database.getRepository(Group);
const wordGroupRepo = await database.getRepository(GroupWords);
const result:WordInGroup[]=[];
const groups:Group[] = await groupRepo.find()
  for (const group of groups) {
    // Fetch the words for the current song using song.SongID
    const wordInGroups = await wordGroupRepo.find({
      where: { GroupID:group.GroupID}, 
      relations: ['Word'],
    });

    const words = wordInGroups.map(sw => (sw.Word.WordText));

    const wordsDto:WordInGroup = {
      groupID:group.GroupID+"",
      wordName: words,
      groupName: group.GroupName
    }

    result.push(wordsDto)
  }
  return result
}

export const getWordIndices = async () => {
  
      const database: Database = await Database.getInstance();
      const songWordsRepo = await database.getRepository(SongWords);

      // Fetch all words with their indices
      const wordIndices = await songWordsRepo.find({ relations: ['WordID'] });

      // Group indices by word
      const wordMap = wordIndices.reduce((map, songWord) => {
          const wordText = songWord.WordID.WordText;
          if (!map[wordText]) {
              map[wordText] = [];
          }
          map[wordText].push({ Line: songWord.Line, WordIndex: songWord.WordIndex });
          return map;
      }, {});
return wordMap
};


export const getWordIndicesByGroup = async (groupID:string) => {
  
  const database: Database = await Database.getInstance();
  const songWordsRepo = await database.getRepository(SongWords);
    const groupWordsRepo = await database.getRepository(GroupWords);
    
    // Fetch all words in the given group
    const groupWords = await groupWordsRepo.find({
      where: { GroupID: +groupID },
      relations: ['Word']
    });

    // Extract word IDs from the group
    const wordIDs = groupWords.map(groupWord => groupWord.WordID);

    // Fetch all SongWords entries for these word IDs
    const songWords = await songWordsRepo.find({
      where: { WordID: In(wordIDs) },
      relations: ['WordID']
    });

    // Group indices by word
    const wordIndicesMap = songWords.reduce((map, songWord) => {
      const wordText = songWord.WordID.WordText;
      if (!map[wordText]) {
        map[wordText] = [];
      }
      map[wordText].push({ Line: songWord.Line, WordIndex: songWord.WordIndex });
      return map;
    }, {});

    return wordIndicesMap;
};