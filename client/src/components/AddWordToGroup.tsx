import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { Word, Group } from '../../../types/songDTO';

const AddWordToGroup: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [words, setWords] = useState<Word[]>([]);
    const [selectedGroupID, setSelectedGroupID] = useState<number | null>(null);
    const [selectedWordID, setSelectedWordID] = useState<number | null>(null);
    const [wordText, setWordText] = useState('');
    const { getData, postData } = apiService();

    useEffect(() => {
        const fetchGroupsAndWords = async () => {
            try {
               const groupsResponse =  await getData('api/groups')
               const wordsResponse =  await getData('api/words')
                setGroups(groupsResponse?.data );
                setWords(wordsResponse?.data );
            } catch (error) {
                console.error('Error fetching groups and words:', error);
            }
        };
        fetchGroupsAndWords();
    }, [getData]);

    const handleAddWord = async () => {
        if (selectedGroupID && selectedWordID) {
            try {
                await postData('api/groups/addWordToGroup', {
                    GroupID: selectedGroupID,
                    WordID: selectedWordID
                });
                alert('Word added to group successfully!');
            } catch (error) {
                console.error('Error adding word to group:', error);
                alert('Error adding word to group');
            }
        }
    };

    const handleWordTextSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const word = words.find(w => w.WordText === wordText);
        if (word && selectedGroupID) {
            try {
                await postData('api/groups/addWordToGroup', {
                    GroupID: selectedGroupID,
                    WordID: word.WordID
                });
                setWordText('');
                alert('Word added to group successfully!');
            } catch (error) {
                console.error('Error adding word to group:', error);
                alert('Error adding word to group');
            }
        } else {
            alert('Word not found in the database');
        }
    };

    return (
        <div>
            <h2>Add Word to Group</h2>
            <div>
                <label>Select Group: </label>
                <select onChange={(e) => setSelectedGroupID(Number(e.target.value))} defaultValue="">
                    <option value="" disabled>Select a group</option>
                    {groups.map(group => (
                        <option key={group.GroupID} value={group.GroupID}>{group.GroupName}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Word: </label>
                <select onChange={(e) => setSelectedWordID(Number(e.target.value))} defaultValue="">
                    <option value="" disabled>Select a word</option>
                    {words.map(word => (
                        <option key={word.WordID} value={word.WordID}>{word.WordText}</option>
                    ))}
                </select>
                <button onClick={handleAddWord}>Add Word</button>
            </div>
            <div>
                <h3>Or Enter Word Text</h3>
                <form onSubmit={handleWordTextSubmit}>
                    <input
                        type="text"
                        value={wordText}
                        onChange={(e) => setWordText(e.target.value)}
                        placeholder="Enter word text"
                        required
                    />
                    <button type="submit">Add Word by Text</button>
                </form>
            </div>
        </div>
    );
};

export default AddWordToGroup;
