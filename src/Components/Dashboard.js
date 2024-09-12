import { Box, Button, TextField } from "@mui/material";
import Billform from "./Billform";
import Billlist from "./Billlist";
import Chart from "./Chart";
import "./Dashboard.css";
import Modal from "@mui/material/Modal";
import Filter from "./Filter";
import React from "react";
import { useDispatch } from "react-redux";
import { setMonthlyBudget } from "../Redux/Slice/billSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DashBoard = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    setSelectedBill(false);
  };

  const handleChange = (event) => {
    const budget = event.target.value;
    dispatch(setMonthlyBudget(budget));
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className="boxContainer">
        <h1 className="header">Your Bill Manager Buddy.....</h1>
        <Box>
          <Box className="left">
            <Filter />
            <Button onClick={handleOpen} variant="contained" className="btn">
              Add Bill
            </Button>
          </Box>
          <Box className="right">
            <Billlist
              setOpen={setOpen}
              setSelectedBill={setSelectedBill}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <Chart />
          </Box>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Billform
              handleClose={handleClose}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              selectedBill={selectedBill}
              setSelectedBill={setSelectedBill}
            />
          </Box>
        </Modal>

        <Box className="outlinedNumber">
          <h5>Enter budget to highlight bills that should be paid.</h5>

          <TextField
            id="outlined-number"
            label="Your Budget"
            type="number"
            onChange={handleChange}
            name="budget"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};
export default DashBoard;
