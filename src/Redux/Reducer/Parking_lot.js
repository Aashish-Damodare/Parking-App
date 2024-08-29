const Initialval = {
    parkinglot:[],
}

const parkinglotreducer =(state = Initialval, action )=>{
switch(action.type){

    case "SET_PARKING_LOT": 
    return {
      ...state,
      parkinglot:[state.parkinglot, action.payload]
    }
    
    default:
      return state;
  }
}
export default parkinglotreducer;