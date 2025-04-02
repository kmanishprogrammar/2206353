import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { fetchLatestPosts } from '../api/analyticsApi';
import useFetchData from '../hooks/useFetchData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import PostCard from '../components/PostCard';

const FEED_REFRESH_INTERVAL = 30000;

const FeedPage: React.FC = () => {
  const { data: posts, loading, error, refetch } = useFetchData(
    fetchLatestPosts,
    true,
    FEED_REFRESH_INTERVAL
  );

  const showLoading = loading && !posts;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
         <Typography variant="h4">Live Feed (Latest Posts)</Typography>
         <Button
             variant="outlined"
             onClick={refetch}
             startIcon={<RefreshIcon />}
             disabled={loading}
         >
             Refresh Now
         </Button>
      </Box>

      {showLoading && <LoadingSpinner />}
      {error && <ErrorDisplay message={`Failed to load feed: ${error.message}`} />}

      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
         !showLoading && <Typography>No posts available currently.</Typography>
      )}
    </Box>
  );
};

export default FeedPage;