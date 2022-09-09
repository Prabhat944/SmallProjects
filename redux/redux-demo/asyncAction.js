const redux=require('redux');
const createStore=redux.createStore;
const applyMiddleware=redux.applyMiddleware;
const axios=require('axios');
const { default: thunk } = require('redux-thunk');
const thunkMiddleware=require('redux-thunk').default;


const initialState={
    loading:false,
    data:[],
    error:''
}

const FETCH_USER_REQUESTED='FETCH_USER_REQUESTED';
const FETCH_USER_SUCCEEDED='FETCH_USER_SUCCEEDED';
const FETCH_USER_FAILED='FETCH_USER_FAILED';

function userRequested(){
    return{
        type:FETCH_USER_REQUESTED
    }
}

function userSucceeded(data){
    return{
        type:FETCH_USER_SUCCEEDED,
        payload:data
    }
}

function userFailed(data){
    return {
        type:FETCH_USER_FAILED,
        payload:data,
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_USER_REQUESTED:
            return{
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCEEDED:
            return{
                ...state,
                loading:false,
                data:action.payload,
                error:''
            }
        case FETCH_USER_FAILED:{
            return{
                ...state,
                loading:false,
                data:[],
                error:action.payload
            }
        }
    }
}

function fetchUser(){
    return function(dispatch){
       dispatch(userRequested());
       axios.get('https://jsonplaceholder.typicode.com/userskl')
       .then((response)=>{
        //on Success we send the data of users api
        const data=response.data.map(user=>user.id);
        dispatch(userSucceeded(data));
       })
       .catch((err)=>{
        //on failure we send message
        dispatch(userFailed(err.message));
       })
    }  
}
const store=createStore(reducer,applyMiddleware(thunkMiddleware));

store.subscribe(()=>{
    console.log(store.getState())
});

store.dispatch(fetchUser());