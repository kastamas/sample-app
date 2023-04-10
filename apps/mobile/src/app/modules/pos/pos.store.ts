import { createAction, createReducer } from '@reduxjs/toolkit';
import { PosResponseDto } from '@business-loyalty-program/types';

interface IPosSelectionState {
  badge?: string;
  pos?: PosResponseDto;
}

export const selectPOSFromPromo = createAction<IPosSelectionState>(
  'SELECT_POS_FROM_PROMO'
);

export const selectPos = createAction<PosResponseDto>('SELECT_POS');

export const resetSelectedPos = createAction('RESET_SELECTED_POS');

const defaultState: IPosSelectionState = {};

export const posSelectionReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(selectPOSFromPromo, (state, action) => {
      return action.payload;
    })
    .addCase(selectPos, (state, action) => ({
      ...defaultState,
      pos: action.payload,
    }))
    .addCase(resetSelectedPos, () => defaultState);
});
