import React from 'react'
import AddressComponent from '../components/AddressComponent'
import CombinedNav from '../components/CombinedNav'
import Footer from '../components/Footer'

const EditAddress = () => {
  return (
    <div>
        <CombinedNav/>
        <AddressComponent addressType={"edit"} addressTypeTitle={"Edit Address"}/>
        <Footer/>
    </div>
  )
}

export default EditAddress