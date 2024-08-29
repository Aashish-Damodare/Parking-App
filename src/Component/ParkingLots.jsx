import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ArrowBack, Add, Close } from "@mui/icons-material";
import { InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  setParking_lot,
  startParking,
  stopParking,
} from "../Redux/Action/SpaceAction";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
function Parkingsloat() {
  const spaces = useSelector((state) => state.Space.Space);
  const parkinglot = useSelector((state) => state.parkingtime.parkingtime);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [payopen, setpayOpen] = useState(false);
  const [text, setText] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]); // Track selected slots
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [parktime, setparktime] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedElapsedTime = {};
      Object.keys(parkinglot).forEach((index) => {
        const slot = parkinglot[index];

        if (slot.startTime && !slot.endTime) {
          updatedElapsedTime[index] = Date.now() - slot.startTime;
        }
      });
      setparktime(updatedElapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [parkinglot]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleOnClick = () => {
    setOpen(true);
  };

  const payhandalonclick = (index) => {
    console.log(index);
    setSelectedSlotIndex(index);
    setpayOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const payhandalonclose = () => {
    setpayOpen(false);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * spaces.length);
    } while (selectedSlots.includes(newIndex));

    const data = {
      slotIndex: newIndex,
      text: text,
      startTime: Date.now(),
    };
    dispatch(startParking(newIndex));
    dispatch(setParking_lot(data));

    setSelectedSlots((prevSlots) => [
      ...prevSlots,
      { index: newIndex, registrationNumber: text },
    ]);

    setText("");

    handleOnClose();
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const calculateFee = (ms) => {
    const hours = Math.ceil(ms / (1000 * 60 * 60));
    return hours * 3;
  };

  const payhandale = () => {
    console.log("pay handal clicked");
    dispatch(stopParking(selectedSlotIndex));
    setSelectedSlots((prevSlots) =>
      prevSlots.filter((sloat) => sloat.index !== selectedSlotIndex)
    );
    setpayOpen(false);
    alert(" payment successful ");
  };

  return (
    <>
      <Box
        sx={{
          zIndex: 1,
          height: "auto",
          overflow: "auto",
          background: "#f0f0f0",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Box>
          <h1>Parking Lot</h1>
        </Box>

        <Box sx={{ display: "flex", gap: "36px", ml: 70 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<ArrowBack />}>
              Back
            </Button>
          </Link>

          <Button
            variant="outlined"
            color="success"
            startIcon={<Add />}
            onClick={handleOnClick}
          >
            New Car Registration
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ overflowX: "auto", mt: 3 }}>
          {spaces.map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: selectedSlots.some(
                    (slot) => slot.index === index
                  )
                    ? "#FF6347"
                    : "#fff",
                  boxShadow: 2,
                  borderRadius: 5,
                }}
              >
                <h2> {`Slot ${index + 1}`}</h2>
                {selectedSlots.some((slot) => slot.index === index) && (
                  <>
                    <Typography>
                      {`Ragistration.No:${
                        selectedSlots.find((sloat) => sloat.index === index)
                          .registrationNumber
                      }`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`Time: ${formatTime(parktime[index] || 0)}`}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{ color: "#fff", borderColor: "#FA8072" }}
                      onClick={() => payhandalonclick(index)}
                    >
                      Ragistred
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          ))}

          <Dialog open={payopen} onClose={payhandalonclose}>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                fontWeight: "bold",
                mt:2
              }}
            >
              Payment Dellocated Form
              <IconButton
                title="closeBtn"
                aria-label="close"
                onClick={payhandalonclose}
                sx={{
                  position: "absolute",
                  right: 1,
                  top: 1,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={ {justifyContent: "space-between", }}>
              <Typography variant="h6"sx={{fontFamily:"serif" }}>
                Ragistration No : 
                  {selectedSlotIndex !== null
                  ? selectedSlots.find(
                      (slot) => slot.index === selectedSlotIndex
                    )?.registrationNumber
                  : ""}
              </Typography>
              <Typography variant="h6"sx={{fontFamily:"serif" }}>
                Your Parking time :{" "}
                {selectedSlotIndex !== null
                  ? formatTime(parktime[selectedSlotIndex] || 0)
                  : ""}
              </Typography>
              <Typography variant="h6" sx={{fontFamily:"serif" }}>
                Your Parking fee : $
                {selectedSlotIndex !== null
                  ? calculateFee(parktime[selectedSlotIndex] || 0)
                  : "0"}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent:" center"}}>
              <Button variant="contained" onClick={payhandalonclose}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={payhandale}>
                Pay
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={open} onClose={handleOnClose}>
            <DialogTitle>
              Parking Space Form
              <IconButton
                title="closeBtn"
                aria-label="close"
                onClick={handleOnClose}
                sx={{
                  position: "absolute",
                  right: 9,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: "24px" }}>
              <form onSubmit={handleOnSubmit}>
                <InputLabel
                  sx={{
                    marginBottom: "8px",
                    display: "block",
                    fontWeight: "medium",
                  }}
                >
                  Enter Car Registration No.
                </InputLabel>
                <TextField
                  variant="outlined"
                  value={text}
                  onChange={handleChange}
                  sx={{ marginBottom: "16px" }}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                variant="text"
                disabled={text === ""}
                onClick={handleOnSubmit}
                style={{ marginTop: "20px" }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </>
  );
}

export default Parkingsloat;
