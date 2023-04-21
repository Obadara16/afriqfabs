import React from 'react'
import AddressComponent from '../components/AddressComponent'
import CombinedNav from '../components/CombinedNav'


const AddAddress = () => {
  return (
    <div>
        <CombinedNav/>
        <AddressComponent addressType={"add"} addressTypeTitle={"Add Address"}/>
    </div>
  )
}

export default AddAddress