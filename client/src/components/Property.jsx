import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import AppointmentDialog from "./AppointmentDialog";

import PropertyTable from "./PropertyTable";

import ReviewList from "./ReviewList";
import { Typography, Box, Grid } from "@mui/material";
import ReviewDialog from "./ReviewDialog";
import ReviewMetrics from "./reviewMetrics";


export default function Property() {
  const { id } = useParams();
  const domain =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:6999";
  const url = "/property";
  const [property, setProperty] = useState({
    loading: false,
    data: null,
    reviews: null,
    error: false,
  });
  const [reviewAnalysis, setReviewAnalysis] = useState({
    loading: false,
    data: null,
    error: false,
  });
  let content = null;

  useEffect(() => {
    setProperty({
      loading: true,
      data: null,
      reviews: null,
      error: false,
    });
    setReviewAnalysis({
      loading: true,
      data: null,
      error: false,
    });
    fetch(`${domain}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId: id.toString() }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((d) => {
        setProperty({
          loading: false,
          data: d.property,
          reviews: { data: d.reviews, analysis: d.reviewAnalysis},
          error: false,
        });
        setReviewAnalysis({
          loading: false,
          data: d.reviewAnalysis,
          error: false,
        });
      })
      .catch(() => {
        setProperty({
          loading: false,
          data: null,
          reviews: null,
          error: true,
        });
        setReviewAnalysis({
          loading: false,
          data: null,
          error: true,
        });
      });
  }, [url]);

  if (property.error) {
    content = <p>Error! Please try later</p>;
  }

  if (property.loading) {
    content = <Loader></Loader>;
  }

  if (property.data) {
    const hasReviews = Object.keys(property.reviews.data).length !== 0;
    content = (
      <div>
        <Typography variant="h4">{property.data.propertyId}</Typography>
        <div>
          <img
            src={property.data.photos
              .slice(0, 1)
              .map((photo, key) => photo.href)}
            alt={property.data.propertyId}
          />
          <Box sx={{mx:'auto', p:'10px'}}>
            <PropertyTable property={property.data}/> 
          </Box>
          <Grid container direction="row" justifyContent="center" spacing={2}>
            <Grid item>
              <AppointmentDialog property = {property}></AppointmentDialog>
            </Grid>
            <Grid item>
              <ReviewDialog property={property}></ReviewDialog>
            </Grid>
          </Grid>
          <Box sx={{mx:'auto', p:'10px'}}>
            { hasReviews && <ReviewList reviews = {property.reviews}></ReviewList>}
          </Box> 
        </div>
        <div>
          <ReviewMetrics data={reviewAnalysis.data}></ReviewMetrics>
        </div>
      </div>
    );
  }
  return(
    <div>
      {content}
    </div>
  );
}
