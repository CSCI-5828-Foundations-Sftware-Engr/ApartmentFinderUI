import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export default function ReviewList(props) {
   let reviewList = props.reviews.data.map((review, index)=>{
      return (
         <ListItem key={index}>
            <ListItemText 
            primaryTypographyProps={{fontSize:'20px', fontWeight:'bold'}} 
            primary={review.userName} 
            secondary={review.review}  
            />
         </ListItem>
      )});


  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography variant='h3' > Reviews </Typography>
      <Divider />
      <nav aria-label="secondary mailbox folders">
         <List sx={{pt:'10px', pb:'10px'}}>
            {reviewList}
         </List>
      </nav>
    </Box>
  );
}
