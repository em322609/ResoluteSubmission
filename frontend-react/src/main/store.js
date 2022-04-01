import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
const initialState = { followerCount: [] , timeStamps: []}

function counterReducer(state, action, data) {
  const selectFollowerCount = async () => {return state.followerCount}
  const selectTimestampCount = async () => {return state.timeStamps}
  if (action.type === 'collection_data_unmount') {
    console.log(action.data)
    return {
      ...state,
      followerCount : action.data
    }
  }
  if (action.type === 'timestamp_data_unmount') {
    console.log(action.data)
    return {
      ...state,
      timeStamps : action.data
    }
  }
  // otherwise return the existing state unchanged
  
  return state;
}
export default counterReducer;
