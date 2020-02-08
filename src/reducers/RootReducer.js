import { createStore, applyMiddleware } from "redux"
import logger from 'redux-logger'

import { create2D } from '../util/ArrayUtil'
import { WATERMARK_SIZE, COVER_SIZE } from '../util/Const'

const initialState = {
  coverImage : null,
  watermark : null,
  coverImagePixel : create2D(COVER_SIZE, COVER_SIZE, 0),
  watermarkPixel : create2D(WATERMARK_SIZE, WATERMARK_SIZE, 0),
  watermarkedImagePixel : create2D(COVER_SIZE, COVER_SIZE, 0),
} 

const RootReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_COVER_IMAGE':
      return {
        ...state,
        coverImage: action.payload,
        coverImagePixel: action.payload.pixels,
      }
    case 'SET_WATERMARK':
      return {
        ...state,
        watermark: action.payload,
        watermarkPixel: action.payload.pixels,
      }
    case 'SET_WATERMARKED_IMAGE_PIXEL':
      return {
        ...state,
        watermarkedImagePixel: action.payload
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