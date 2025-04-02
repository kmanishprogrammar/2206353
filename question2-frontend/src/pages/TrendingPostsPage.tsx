import React from 'react';
import { Box, Typography, List } from '@mui/material';
import { fetchPopularPosts } from '../api/analyticsApi';
import useFetchData from '../hooks/useFetchData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import PostCard from '../components/PostCard'; 

const TrendingPostsPage: React.FC = () => {
  const { data: posts, loading, error, refetch } = useFetchData(fetchPopularPosts);

  const showLoading = loading && !posts;

  return (
    <Box>
      <Typography variant="h4" gutterBottom component="h1">
        Trending Posts
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Posts with the highest number of comments right now.
      </Typography>

      {showLoading && <LoadingSpinner />}

      {error && <ErrorDisplay error={error} />}

      {!loading && posts && posts.length > 0 && (
         <List disablePadding>
           {posts.map((post) => (
               <PostCard key={post.id} post={post} />
           ))}
         </List>
      )}

      {!loading && !error && posts && posts.length === 0 && (
        <Typography sx={{ mt: 4 }}>
          No trending posts found at the moment.
        </Typography>
      )}
    </Box>
  );
};

export default TrendingPostsPage;