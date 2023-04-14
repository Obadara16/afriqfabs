import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../redux/apiCalls";




const VerifyEmail = () => {
  
  const { isFetching, error, success } = useSelector((state) => state.user);
  const  {verificationCode} = useParams();
  console.log(verificationCode)
  const dispatch = useDispatch()

  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });

    useEffect(() => {
        dispatch(verifyEmail(verificationCode));
    }, [dispatch, verificationCode]);


  useEffect(() => {
    if (success) {
      setAlerting({
        color: "success",
        data: success,
      });
    } else {
      setAlerting({ color: "danger", data: error });
    }
  }, [success, error]);

  return (
    <div className="">
      <CombinedNav />
      {success ? 
        <div className="w-full mx-auto flex justify-center items-center h-[40vh] flex-col my-10 gap-4">
            <h1 className="text-2xl font-bold">{success}</h1> 
            <p>Click here to <Link to="/login">Login</Link></p>   
        </div> 
      :
        <div className="w-full mx-auto flex justify-center items-center flex-col my-10 gap-4">
            <h1 className="text-2xl font-light">{error}</h1>     
        </div> 
        }
      <Footer />
    </div>
  );
};

export default VerifyEmail;
