import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import {useDispatch} from 'react-redux'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ParkingApp.css'; 
import { setspace } from "../Redux/Action/SpaceAction";


function ParkingComponenet() {
 const [inputval, setinputval] = useState('')
 const navigate = useNavigate();
 const Dispatch = useDispatch();


 const handalOnsubmit =(event)=>{
  event.preventDefault();
  const spacesArray = Array.from({ length: Number(inputval) }, (_, index) => `Space ${index + 1}`);
  Dispatch(setspace(spacesArray));
    navigate('/ParkingLots')
}

  return (
    <>
      <Box className="Container">
        <Box className="second-box" >
          <form className="Box" onSubmit={handalOnsubmit}>
            <h2>Enter Parking Space</h2>
            <OutlinedInput
              placeholder="Please enter Number "
              type="number"
              value={inputval}
              onChange={(e) => setinputval(e.target.value)}
              sx={{ marginBottom: "20px", width: "80%" }}
            />

            
              <Button variant="contained" className="btn" type="submit">
                SET SPACE
              </Button>
           
          </form>
        </Box>
      </Box>
    </>
  );
}
export default ParkingComponenet;
