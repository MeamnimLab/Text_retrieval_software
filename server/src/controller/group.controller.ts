
import { Word } from '../entity/Word.entity';
import { Database } from '../database';

import { Group } from '../entity/Group.entity';
import { GroupWords } from '../entity/GroupWords.entity';


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
      const groupWord = wordGroupRepo.create({ GroupID, WordID });
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