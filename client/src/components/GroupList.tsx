import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import { Group } from '../../../types/songDTO';

const GroupList: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const { getData } = apiService();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getData('api/groups');
                setGroups(response?.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div>
            <h1>Groups</h1>
            <ul>
                {groups.map(group => (
                    <li key={group.GroupID}>
                        {group.GroupName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
