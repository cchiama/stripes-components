import React from 'react';
import AddressList from '../../../AddressFieldGroup/AddressList';

export default function (props) {
  console.warn('Warning: AddressList has moved out of the structures directory. Update path to stripes-components/lib/AddressFieldGroup/AddressList.');
  return (
    <AddressList {...props} />
  );
}
