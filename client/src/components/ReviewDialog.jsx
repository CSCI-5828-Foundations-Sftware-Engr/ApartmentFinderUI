import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function ReviewDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData,setFormData] = React.useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = localStorage.getItem("user");

    let reviewInfo = {
      propertyId: props.property.data.propertyId,
      userName: JSON.parse(user).userName,
      review: formData
    }

    let err = false;
    for(let field in reviewInfo)
    {
      if(reviewInfo[field] === null){
        console.log(`${field} is null`);
        err = true;
      }
    }
    if(formData === "") err = true;

    if(!err){
      const domain = process.env.NODE_ENV === "production" ? "" : "http://localhost:6999";
      const url = "/addreview";
      fetch(`${domain}${url}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewInfo),
      })
      .then((response)=> {
        if(response.status === 200){
          alert("Review added.");
          window.location.reload(false);
        }else if(response.status === 201){
         alert("Review already exists by this user")
        }else if(response.status === 404){
          alert("There was an error attempting to add this review");
        }
        handleClose();
      });
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Write a review
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'m'}>
        <DialogTitle>Write a review</DialogTitle>
        <DialogContent>
         <DialogContentText>
            Use the text box below to write your review about this property
         </DialogContentText>
         <form onSubmit={handleSubmit}>
            <TextField 
            label="Enter your review here" 
            margin="normal" 
            multiline 
            fullWidth 
            rows={4}
            onChange={(newValue) => {
               setFormData(newValue.target.value);
            }}
            />
         </form>
          
        </DialogContent>  
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
