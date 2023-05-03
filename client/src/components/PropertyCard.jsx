import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography, CardContent, CardActions, Button, Box } from "@mui/material";

export default function PropertyCard(props) {
  return(
    <Card sx={{
      minWidth:250, 
      margin:2,
      justifyContent: "center",
      alignItems:"center",
      flexDirection:"column",
      backgroundColor:'#ebf8ff'}}>
      <CardContent>
        <Typography variant='h4' gutterBottom>
          <Link to={`/property/${props.property.propertyId}`}>
            {props.property.propertyId}
          </Link>
        </Typography>
        <Box sx={{ justifyContent: "center", display:"flex", marginTop:1, marginBottom:3}}>
          <Link to={`/property/${props.property.propertyId}`}>
            <div
              style={{
                backgroundImage: `url("${props.property.photos
                  .slice(0, 1)
                  .map((photo, key) => photo.href)}")`,
              }}
              className="w-64 h-64 bg-blue bg-cover"
            ></div>
          </Link>
        </Box>
        <Link to={`/property/${props.property.propertyId}`}>
          <Box sx={{borderRadius:1, backgroundColor:'#4299e1'}}>
            <Typography variant="h3" color="white" >
              {props.property.address.line}, {props.property.address.city}, {props.property.address.stateCode}
            </Typography>
            <Typography color="white">
              {props.property.propertyType}
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
}
