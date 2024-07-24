import React, { useState } from 'react';
import { apiService } from '../apiService';

const CreateGroup: React.FC = () => {
    const [groupName, setGroupName] = useState('');
    const { postData } = apiService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postData('api/groups/createGroup', { GroupName: groupName });
            setGroupName('');
            alert('Group created successfully!');
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Error creating group');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                required
            />
            <button type="submit">Create Group</button>
        </form>
    );
};

export default CreateGroup;
