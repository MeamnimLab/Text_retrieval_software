// Fetch all words
import {  getAllWords, getWordIndices } from '../controller/group.controller';
import { Router } from 'express';
const router = Router();


router.get('/', async (req, res) => {
    try {
       const words = await getAllWords()
        res.json(words);
    } catch (error) {
        console.error('Error fetching words:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/wordIndices', async (req, res) => {
    try {
        const words = await getWordIndices()
         res.json(words);
     } catch (error) {
         console.error('Error fetching index:', error);
         res.status(500).json({ message: 'Internal server error' });
     }

});


export default router;
