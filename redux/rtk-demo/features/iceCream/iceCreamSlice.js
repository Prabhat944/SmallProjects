const createSlice=require('@reduxjs/toolkit').createSlice;
const {cakeActions} =require('../cake/cakeSlice');

const initialState={
    numOfIceCream:20
}

const iceCreamSlice=createSlice({
    name:'iceCream',
    initialState,
    reducers:{
        ordered:(state)=>{
            state.numOfIceCream--
        },
        reStocked:(state,action)=>{
            state.numOfIceCream += action.payload
        },
    },
    // extraReducers:{
    //     ['cake/ordered']:(state)=>{
    //         state.numOfIceCream--
    //     }
    // }
    extraReducers:(builder)=>{
        builder.addCase(cakeActions.ordered,(state,action)=>{
            state.numOfIceCream--
        })
    }
})

module.exports=iceCreamSlice.reducer;
module.exports.iceCreamActions=iceCreamSlice.actions;