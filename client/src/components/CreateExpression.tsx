import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { Word } from '../../../types/songDTO';

interface LinguisticExpression {
    ExpressionID: number;
    ExpressionName: string;
}

const CreateExpression: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [selectedWords, setSelectedWords] = useState<{ word: Word, order: number }[]>([]);
    const [expressionName, setExpressionName] = useState('');
    const { getData, postData } = apiService();

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await getData('api/words');
                setWords(response?.data);
            } catch (error) {
                console.error('Error fetching words:', error);
            }
        };

        fetchWords();
    }, []);

    const handleWordSelection = (word: Word) => {
        setSelectedWords(prevSelectedWords => {
            const existing = prevSelectedWords.find(w => w.word.WordID === word.WordID);
            if (existing) {
                // Remove word if already selected
                return prevSelectedWords.filter(w => w.word.WordID !== word.WordID);
            } else {
                // Add word if not selected with default order
                return [...prevSelectedWords, { word, order: prevSelectedWords.length }];
            }
        });
    };

    const handleOrderChange = (wordID: number, newOrder: number) => {
        setSelectedWords(prevSelectedWords => {
            const updated = prevSelectedWords.map(w => {
                if (w.word.WordID === wordID) {
                    return { ...w, order: newOrder };
                }
                return w;
            });
            // Sort by order to maintain correct sequence
            updated.sort((a, b) => a.order - b.order);
            return updated;
        });
    };

    const handleCreateExpression = async () => {
        if (expressionName && selectedWords.length > 0) {
            try {
                // Create linguistic expression
                const response = await postData('api/linguisticExpressions', { expressionName });
                const newExpressionID = response?.data?.ExpressionID;

                // Add words to the new expression with their order
                if (newExpressionID) {
                    await postData(`api/linguisticExpressions/${newExpressionID}/words`, {
                        words: selectedWords.map(w => ({
                            WordID: w.word.WordID,
                            WordOrder: w.order
                        }))
                    });
                    alert('Linguistic expression created successfully!');
                }
            } catch (error) {
                console.error('Error creating expression:', error);
                alert('Error creating linguistic expression');
            }
        } else {
            alert('Please enter a name and select words for the expression');
        }
    };

    return (
        <div>
            <h2>Create Linguistic Expression</h2>
            <div>
                <label>Expression Name: </label>
                <input
                    type="text"
                    value={expressionName}
                    onChange={(e) => setExpressionName(e.target.value)}
                    placeholder="Enter expression name"
                    required
                />
            </div>
            <div>
                <h3>Select Words for the Expression</h3>
                <ul>
                    {words.map(word => (
                        <li key={word.WordID}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedWords.some(w => w.word.WordID === word.WordID)}
                                    onChange={() => handleWordSelection(word)}
                                />
                                {word.WordText}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Order of Selected Words</h3>
                <ul>
                    {selectedWords.map(w => (
                        <li key={w.word.WordID}>
                            {w.word.WordText}
                            <input
                                type="number"
                                min={1}
                                max={selectedWords.length}
                                value={w.order + 1}
                                onChange={(e) => handleOrderChange(w.word.WordID, Number(e.target.value) - 1)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleCreateExpression}>Create Expression</button>
        </div>
    );
};

export default CreateExpression;
