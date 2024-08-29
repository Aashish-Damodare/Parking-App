

const initialState = {
    parkingtime: {}
  };
  
  const parkingtimereducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_PARKING': {
        return {
          ...state,
          parkingtime: {
            ...state.parkingtime,
            [action.payload.slotIndex]: {
              ...state.parkingtime[action.payload.slotIndex],
              startTime: action.payload.startTime,
              endTime: null
            }
          }
        };
      }
      case 'STOP_PARKING': {
        return {
          ...state,
          parkingtime: {
            ...state.parkingtime,
            [action.payload.slotIndex]: {
              ...state.parkingtime[action.payload.slotIndex],
              endTime: action.payload.endTime
            }
          }
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default parkingtimereducer;
  