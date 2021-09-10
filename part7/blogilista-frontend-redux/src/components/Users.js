import { Link as BrowserLink } from 'react-router-dom';
import { Typography, Link } from '@material-ui/core';

const Users = ({ userList }) => {
    if (!userList) {
        return null;
    }

    return (
        <div>
            <Typography
                variant="h4"
                color="textPrimary"
                style={{ marginTop: '10px' }}
            >
                Users
            </Typography>
            <Typography
                variant="h5"
                color="textPrimary"
                style={{ marginBottom: '10px' }}
            >
                blogs created
            </Typography>
            {userList.map((user) => {
                return (
                    <Typography color="textPrimary" key={user.id}>
                        <Link
                            component={BrowserLink}
                            style={{ textDecoration: 'none' }}
                            color="secondary"
                            to={`/users/${user.id}`}
                        >
                            {user.name}
                        </Link>{' '}
                        {user.blogs.length} blogs
                    </Typography>
                );
            })}
        </div>
    );
};

export default Users;
