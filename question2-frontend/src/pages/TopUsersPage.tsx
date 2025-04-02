import React from 'react';
import { List, Typography, Box } from '@mui/material';
import { fetchTopUsers } from '../api/analyticsApi';
import useFetchData from '../hooks/useFetchData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import UserListItem from '../components/UserListItem';

const TopUsersPage: React.FC = () => {
  const { data: users, loading, error } = useFetchData(fetchTopUsers);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Top Users by Post Count</Typography>
      <List>
        {users && users.length > 0 ? (
          users.map((user) => <UserListItem key={user.id} user={user} />)
        ) : (
          <Typography>No users found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default TopUsersPage;