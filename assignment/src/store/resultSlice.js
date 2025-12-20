import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:null
}

const resultSlice=createSlice({
    name: "result",
    initialState,
    reducers:{
        setResult(state,action){
            state.data=action.payload;
        },
        clearResult(state){
            state.data=null;
        }
    }
});

export const {setResult , clearResult}=resultSlice.actions;
export default resultSlice.reducer;