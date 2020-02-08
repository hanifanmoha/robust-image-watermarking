import { createStore, applyMiddleware } from "redux"
import logger from 'redux-logger'

import { create2D } from '../util/ArrayUtil'
import * as C from '../util/Const'

const initialState = {
  coverImage: null,
  watermark: null,
  coverImagePixel: create2D(C.COVER_SIZE, C.COVER_SIZE, 0),
  watermarkPixel: create2D(C.WATERMARK_SIZE, C.WATERMARK_SIZE, 0),
  watermarkedImagePixel: create2D(C.COVER_SIZE, C.COVER_SIZE, 0),
  editedWatermarkedImagePixel: create2D(C.COVER_SIZE, C.COVER_SIZE, 0),
  extractedWatermarkPixel: create2D(C.WATERMARK_SIZE, C.WATERMARK_SIZE, 0)
}

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.ACTION_SET_COVER_IMAGE:
      return {
        ...state,
        coverImage: action.payload,
        coverImagePixel: action.payload.pixels,
      }
    case C.ACTION_SET_WATERMARK:
      return {
        ...state,
        watermark: action.payload,
        watermarkPixel: action.payload.pixels,
      }
    case C.ACTION_SET_WATERMARKED_IMAGE_PIXEL:
      return {
        ...state,
        watermarkedImagePixel: action.payload
      }
    case C.ACTION_SET_EXTRACTED_WATERMARK:
      return {
        ...state,
        extractedWatermarkPixel: action.payload
      }
    case C.ACTION_SET_EDITED_WATERMARKED_IMAGE_PIXEL:
      return {
        ...state,
        editedWatermarkedImagePixel: action.payload
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