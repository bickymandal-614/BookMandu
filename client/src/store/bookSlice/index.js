import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books : [],
    loading: false,
    error : null
}
const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        fetchBooksStart(state){
            state.loading = true
        },
        fetchBooksfailure(state,action){
            state.error = {
                status: action.payload.status || 500,
                message: action.payload.message || "something went wrong"
            }
            state.loading = false
        },
        fetchBooksSuccess(state,action){
            state.books= action.payload
            state.loading= false
        }
    }
})
export const {fetchBooksStart,fetchBooksSuccess,fetchBooksfailure}= booksSlice.actions
export default booksSlice.reducer