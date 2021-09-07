import { Link } from 'react-router-dom';

const Users = ({ userList }) => {
    if (!userList) {
        return null;
    }

    return (
        <div>
            <h1>Users</h1>
            <h3>blogs created</h3>
            {userList.map((user) => {
                return (
                    <div key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>{' '}
                        {user.blogs.length}
                    </div>
                );
            })}
        </div>
    );
};

export default Users;
