
export const setspace = (spaces) => ({
  type: 'SET_SPACE',
  payload: spaces
});

export const setParking_lot = (data) => ({
  type: 'SET_PARKING_LOT',
  payload: data,
});


export const  startParking =(slotIndex)=>({
  type:'START_PARKING',
  payload:{
    slotIndex,
    startTime: Date.now()
  }
})



export const stopParking =(slotIndex)=>({
  type:'STOP_PARKING',
  payload:{
    slotIndex,
    endTime: Date.now()
  }
})