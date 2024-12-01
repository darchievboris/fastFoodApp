import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        remove: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload)
        },
        decrease: (state, action: PayloadAction<number>) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload) {
                    return item.count > 1 ? {...item, count: item.count - 1} : null
                }
                return item
            }).filter(item => item !== null)
        },
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(i => i.id === action.payload)
            if (!existed) {
                state.items.push({id: action.payload, count: 1})
            } else {
                state.items.map((item) =>
                    item.id === action.payload ? item.count += 1 : item
                )
            }
        }
    }
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions