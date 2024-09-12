import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Billlist.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBill } from "../Redux/Slice/billSlice";
import React, { useEffect } from "react";

const Billlist = ({ setOpen, setSelectedBill, setIsEditing }) => {
  const bills = useSelector((state) => state.bills.bills);
  const filteredCategory = useSelector((state) => state.bills.filteredCategory);
  const userBudget = useSelector((state) => state.bills.monthlyBudget);
  const [billsToPay, setBillsToPay] = React.useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const allBills = [...bills].sort((a, b) => a.amount - b.amount);
    let total = 0;
    let count = 0;
    for (const bill of allBills) {
      if (total + Number(bill.amount) > userBudget) {
        break;
      }
      total += bill.amount;
      count++;
    }
    const billToPay = allBills.slice(0, count);
    setBillsToPay(billToPay);
  }, [userBudget, bills]);

  const handleChange = (id) => {
    if (id) {
      setIsEditing(true);
      setOpen(true);
      const billToEdit = bills.find((bill) => bill.id === id);
      if (billToEdit) {
        console.log(billToEdit);
        setSelectedBill(billToEdit);
      }
    }
  };

  const filteredBills = bills.filter(
    (bill) => filteredCategory === "" || bill.category === filteredCategory
  );

  return (
    <Box className="main">
      {filteredBills.map((bill) => {
        const isBillToPay = billsToPay?.some(
          (payBill) => payBill.id === bill.id
        );
        return (
          <React.Fragment key={bill.id}>
            <Box className={`billList ${isBillToPay ? "highlight-bill" : ""}`}>
              <Box className="headers">
                <h3>Description: {bill.description}</h3>
                <h4>Category: {bill.category}</h4>
                <h5>Date: {bill.date}</h5>
              </Box>
              <Box className="headersPrice">
                <h3>Price: {bill.amount}/-</h3>
              </Box>
              <Box className="lower">
                <Button
                  variant="contained"
                  onClick={() => handleChange(bill.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(deleteBill(bill.id))}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Billlist;
