const redux=require('redux');
const createStore=redux.createStore;
const produce=require('immer').produce;


const initialState={
    name:'prabhat',
    age:25,
    address:{
        street:'kanhainagar',
        city:'nawada',
        state:'nawada'
    }
}


const UPDATE_STREET='UPDATE_STREET';

function updateStreet(add){
    return{
        type:UPDATE_STREET,
        payload:add
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case UPDATE_STREET:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }
            // }
            return produce(state,(draft)=>{
                draft.address.street=action.payload
            })
        default:
            return state;
    }
}

const store=createStore(reducer);

console.log('initial State',store.getState());

const unsubscribe=store.subscribe(()=>console.log('updated state',store.getState()));

store.dispatch(updateStreet('mayanagar,3 no. bus stand'));

unsubscribe();