import { addWordToGroup, createGroup, getAllGroups, getAllGroupsWithWords } from '../controller/group.controller';
import { Router } from 'express';


const router = Router();

// Create a new group
router.post('/createGroup', async (req, res) => {
    try {
      const newGroup = await createGroup(req.body);
        res.status(201).json(newGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a word to a group
router.post('/addWordToGroup', async (req, res) => {
    try {
         const groupWord =await addWordToGroup(req.body)
        res.status(201).json(groupWord);
    } catch (error) {
        console.error('Error adding word to group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Fetch all groups
router.get('/', async (req, res) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch all groups
router.get('/groupWithWords', async (req, res) => {
    try {
        const groups = await getAllGroupsWithWords();
        res.json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;


