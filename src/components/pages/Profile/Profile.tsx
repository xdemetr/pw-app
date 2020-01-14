import * as React from 'react'

interface IProfile {
  profile: {
    name: string,
    id: number,
    balance: number,
    email: string
  }
}

const Profile:React.FC<IProfile> = ({profile}) => {
  const {name, id, balance, email} = profile;

  return (
      <div className="profile-page">
        <h1>Profile</h1>

        <div className="card">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="mr-1 text-muted">name:</span>
                <span className="text-info">{name}</span>
              </li>
              <li className="list-group-item">
                <span className="mr-1 text-muted">id:</span>
                <span className="text-info">{id}</span>
              </li>
              <li className="list-group-item">
                <span className="mr-1 text-muted">email:</span>
                <span className="text-info">{email}</span>
              </li>
              <li className="list-group-item">
                <span className="mr-1 text-muted">balance:</span>
                <span className="text-info">{balance}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Profile;
