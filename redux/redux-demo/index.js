const redux=require('redux');
const createStore=redux.createStore;
const bindActionCreators=redux.bindActionCreators;
const combineReducers=redux.combineReducers;
const applyMiddleware=redux.applyMiddleware;
const reduxLogger=require('redux-logger');
const logger=reduxLogger.createLogger();


const CAKE_ORDERED='CAKE_ORDERED';
const RESTOCK_STORE_CAKE='RESTOCK_STORE_CAKE';
const ICEXREAM_ORDERED='ICECREAM_ORDERED';
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED';


function cakeOrder(){
    return{
        type:CAKE_ORDERED,
        payload:1
    }
};

function restockCake(qty=1){
    return{
        type:RESTOCK_STORE_CAKE,
        payload:qty
    }
};

function icecreamOrder(){
    return{
        type:ICEXREAM_ORDERED,
        payload:1
    }
};

function icecreamRestock(qty=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
};
//reducer=>(state=initialState,action)=>{}

const initialCakeState={
    noOfCake:10,
}

const initialIcecreamState={
    noOfIcecream:20,
}

const cakeReducer=(state=initialCakeState,action)=>{
  switch(action.type){
    case CAKE_ORDERED:
        return{
            ...state,
            noOfCake:state.noOfCake-1
        }
    case RESTOCK_STORE_CAKE:
        return{
            ...state,
            noOfCake:state.noOfCake+action.payload
        }
    default:
        return state;
  }
}
const icecreamReducer=(state=initialIcecreamState,action)=>{
    switch(action.type){
      case ICEXREAM_ORDERED:
              return{
                  ...state,
                  noOfIcecream:state.noOfIcecream-1
              }
      case ICECREAM_RESTOCKED:
              return{
                  ...state,
                  noOfIcecream:state.noOfIcecream+action.payload
                  }
      case CAKE_ORDERED:
        return{
            ...state,
            noOfIcecream:state.noOfIcecream-1
        }
      default:
          return state;
    }
  }

  const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:icecreamReducer
  })
const store=createStore(rootReducer,applyMiddleware(logger));

console.log('initial state',store.getState());

const unsubscribe=store.subscribe(()=>{});

// store.dispatch(cakeOrder());
// store.dispatch(cakeOrder());
// store.dispatch(cakeOrder());
// store.dispatch(cakeOrder());
// store.dispatch(restockCake(3))
const actions=bindActionCreators({cakeOrder,restockCake,icecreamOrder,icecreamRestock},store.dispatch);
actions.cakeOrder();
actions.cakeOrder();
actions.cakeOrder();
actions.cakeOrder();
actions.restockCake(3);
actions.icecreamOrder();
actions.icecreamOrder();
actions.icecreamOrder();
actions.icecreamRestock(4);

unsubscribe();


