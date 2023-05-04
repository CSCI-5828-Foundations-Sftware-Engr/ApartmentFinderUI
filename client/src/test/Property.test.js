import React from 'react';
import { render } from '@testing-library/react';
import PropertyTable from '../components/PropertyTable';

const property = {
  propertyId: 1,
  address: {
    line: '123 Main St',
    city: 'Denver',
    county: 'Denver',
    country: 'USA'
  },
  listingStatus: 'Active',
  propertyType: 'Single Family',
  details: {
    beds: 3,
    bathsMin: 2,
    bathsMax: 2.5,
    priceMin: 500000,
    priceMax: 600000
  },
  photoCount: 5
};

describe('PropertyTable', () => {
  test('renders property information', () => {
    const { getByText } = render(<PropertyTable property={property} />);

    expect(getByText('Property ID:')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('Address:')).toBeInTheDocument();
    expect(getByText('123 Main St, Denver, Denver, USA')).toBeInTheDocument();
    expect(getByText('Listing Status:')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
    expect(getByText('Property Type:')).toBeInTheDocument();
    expect(getByText('Single Family')).toBeInTheDocument();
    expect(getByText('Details:')).toBeInTheDocument();
    expect(getByText('Beds: 3')).toBeInTheDocument();
    expect(getByText('Baths: 2-2.5')).toBeInTheDocument();
  });
});
