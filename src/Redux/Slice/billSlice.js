import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [
    {
      description: "Rent",
      category: "Food & Dining",
      amount: 9000,
      date: new Date().toISOString().slice(0, 10),
      id: Math.floor((Math.random() * 100) + 1)
    },
    {
      description: "Maid",
      category: "utility",
      amount: 8000,
      date: new Date().toISOString().slice(0, 10),
      id: Math.floor((Math.random() * 100) + 1)
    },
  ],
  monthlyBudget: 0,
  filteredCategory : ''
};

export const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action) => {
      console.log(action.payload,"Ads");
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id)
      console.log(index,"index");
      if(index !== -1){
        state.bills[index] = action.payload
      }
    },
    deleteBill: (state,action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload)
    },
    setFilterCateogry : (state, action) => {
      state.filteredCategory = action.payload
    },
    setMonthlyBudget : (state, action) => {
      state.monthlyBudget = action.payload
    }
  },
});

export const { addBill , editBill , deleteBill , setFilterCateogry , setMonthlyBudget } = billSlice.actions;
export default billSlice.reducer;
