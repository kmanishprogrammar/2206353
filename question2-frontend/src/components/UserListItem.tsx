import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { User } from '../api/analyticsApi';

interface UserListItemProps {
  user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const avatarImageUrl = `https://picsum.photos/seed/${user.id}/40/40`;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={user.name} src={avatarImageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component="span" variant="body1" color="text.primary">
            {user.name}
          </Typography>
        }
        secondary={
          <Typography component="span" variant="body2" color="text.secondary">
            Posts: {user.postCount}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default UserListItem;