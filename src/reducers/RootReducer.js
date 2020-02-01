import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';

const initialState = {
  coverImage : null,
  watermark : null,
  watermarkedImage : null
} 

const RootReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_COVER_IMAGE':
      return {
        ...state,
        coverImage: action.payload
      }
    case 'SET_WATERMARK':
      return {
        ...state,
        watermark: action.payload
      }
    case 'SET_WATERMARKED_IMAGE':
      return {
        ...state,
        watermarkedImage: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

const rootReducer = createStore(
  RootReducer,
  applyMiddleware(logger)
)

export default rootReducer