import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function AppointmentDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData,setFormData] = React.useState({
    appointmentDateTime: null
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const apptInfo = {
      propertyId: props.property.data.propertyId, 
      userName: localStorage.getItem("userName"), 
      appointmentDate: dayjs(formData.appointmentDateTime).toDate().toDateString(), 
      appointmentTime:dayjs(formData.appointmentDateTime).toDate().toTimeString()
    };

    console.log(apptInfo);

    let err = false;
    for(let field in apptInfo)
    {
      if(apptInfo[field] === null){
        console.log(`${field} is null`);
        err = true;
      }
    }
    
    if(!err){
      const domain = process.env.NODE_ENV === "production" ? "" : "http://localhost:6999/";
      const url = "/bookappointment";
      fetch(`${domain}${url}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apptInfo),
      })
      .then((response)=> {
        if(response.status === 200){
          alert("Appointment successfully created");
        }else if(response.status === 404){
          alert("There was an error attempting to book this appointment");
        }
        handleClose();
      });
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Reserve appointment
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'xs'}>
        <DialogTitle>Reserve appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a date and time that you would like to schedule a showing.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <DateTimePicker sx={{m:2, width:3/4}} label="Select a date and time" value = {formData.appointmentDateTime} onChange={(newValue) => setFormData({appointmentDateTime:newValue})} />
          </form>
        </DialogContent>  
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Appointment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
