
import { Word } from '../entity/Word.entity';
import { Database } from '../database';

import { Group } from '../entity/Group.entity';
import { GroupWords } from '../entity/GroupWords.entity';
import { WordInGroup } from '../../../types/songDTO';


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
      wordName: words,
      groupName: group.GroupName
    }

    result.push(wordsDto)
  }
  return result
}