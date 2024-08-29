import { configureStore } from '@reduxjs/toolkit';
import SpaceReducer from "../Reducer/SpaceReducer"
import parkinglotreducer from '../Reducer/Parking_lot';
import parkingtimereducer from '../Reducer/spacetime';
const reducer = {
    Space:SpaceReducer,
    parkinglot:parkinglotreducer,
    parkingtime:parkingtimereducer
}
const store = configureStore({
    reducer 
})

export default store