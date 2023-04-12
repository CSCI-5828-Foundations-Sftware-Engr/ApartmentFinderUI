import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PropertyTable({ property }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="property table">
        <TableHead>
          <TableRow>
            <TableCell>Property Information</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Property ID:</TableCell>
            <TableCell align="right">{property.propertyId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address:</TableCell>
            <TableCell align="right">{`${property.address.line}, ${property.address.city}, ${property.address.county}, ${property.address.country}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Listing Status:</TableCell>
            <TableCell align="right">{property.listingStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Property Type:</TableCell>
            <TableCell align="right">{property.propertyType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Details:</TableCell>
            <TableCell align="right">
              <ul>
                <li>Beds: {property.details.beds}</li>
                <li>Baths: {`${property.details.bathsMin}-${property.details.bathsMax}`}</li>
                <li>Price: {`$${property.details.priceMin}-${property.details.priceMax}`}</li>
              </ul>
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell>Photo Count:</TableCell>
            <TableCell align="right">{property.photoCount}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
