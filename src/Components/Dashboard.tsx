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

interface Bill {
  description: string;
  category: string;
  amount: number;
  date: string;
  id?: string;
}


const DashBoard = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedBill, setSelectedBill] = React.useState<Bill | undefined >();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    setSelectedBill(undefined);
  };

  const handleChange = (event: { target: { value: any; }; }) => {
    const budget = event.target.value;
    dispatch(setMonthlyBudget(budget));
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className="boxContainer">
        <Box className = "heading">
          <h1 className="header">Your Bill Manager Buddy.....</h1>
        </Box>

        <Box className="upperSection">
          <Filter />
          <Button onClick={handleOpen} variant="contained" className="btn">
            Add Bill
          </Button>
        </Box>

        <Box className="midSection">
          <Box className="billListContainer">
            <Billlist
              setOpen={setOpen}
              setSelectedBill={setSelectedBill}
              setIsEditing={setIsEditing}
            />
          </Box>

          <Box className="chart">
            <Chart />
          </Box>

          <Box className="lowerSection">
            <TextField
              id="outlined-number"
              label="Enter budget to highlight bills"
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
            selectedBill={selectedBill}
          />
        </Box>
      </Modal>
    </>
  );
};
export default DashBoard;
