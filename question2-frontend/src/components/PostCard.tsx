import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; 
import Box from '@mui/material/Box';

import { Post } from '../api/analyticsApi';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const postImageUrl = `https://picsum.photos/seed/${post.id}/600/200`;
  const avatarImageUrl = `https://picsum.photos/seed/${post.userId || post.userName || 'user'}/40/40`; // Use userId or name as seed

  const avatarLetter = post.userName ? post.userName.charAt(0).toUpperCase() : '?';

  const formattedDate = post.timestamp ? new Date(post.timestamp).toLocaleString() : '';

  return (
    <Card sx={{ mb: 3 }}> 
      <CardHeader
        avatar={
          <Avatar src={avatarImageUrl} sx={{ bgcolor: red[500] }} aria-label="user avatar">
            {!avatarImageUrl && avatarLetter}
          </Avatar>
        }
        title={post.userName || `User ID: ${post.userId}`}
        subheader={formattedDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={postImageUrl}
        alt={`Random visual for post ${post.id}`}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
         <ChatBubbleOutlineIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
         <Typography variant="body2" color="text.secondary">
            {post.commentCount} Comments
         </Typography>
      </Box>
    </Card>
  );
};

export default PostCard;