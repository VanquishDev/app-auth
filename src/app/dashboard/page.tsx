'use client';

import { Auth, API } from 'aws-amplify';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([] as any);
  useEffect(() => {
    const getUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log(currentUser);

      const apiName = 'AdminQueries';
      const path = '/listUsers';
      let myInit = {
        queryStringParameters: {
          limit: 100,
          token: null,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };

      const r = await API.post(apiName, path, myInit);
      setUsers(r);
      console.log(r);
    };
    getUser();
    return () => {};
  }, []);

  return (
    <div className="br">
      <pre>{JSON.stringify({ users }, null, 4)}</pre>
    </div>
  );
}
