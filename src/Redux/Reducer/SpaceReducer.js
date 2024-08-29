
const initialState = {
    Space: []
  };

  
const SpaceReducer = (state = initialState, action) =>{
   
 switch(action.type){
    case "SET_SPACE":
    return {
       ...state,
       Space: action.payload ,
    }
    default:
        return state;
 }
}

export default SpaceReducer