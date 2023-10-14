import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupService from '../services/GroupService';

function Group({ user }) {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const groupData = await GroupService.getGroup(id);
      setGroup(groupData);
    };

    if (id) {
      fetchGroup();
    }
  }, [id]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{group.name}</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={group.icon} alt="Group" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h3>Members:</h3>
          <ul>
            {group.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Group;
