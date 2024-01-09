import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const authUser = createAsyncThunk(
    'post/authUser',
    async(payload , {rejectWithValue}) => {
        try {
            const {user , params} = payload
            // localStorage.setItem('user', JSON.stringify(user))
            const res = await axios.post(`http://localhost:8080/users` , user)
            if (res.status !== 201) {
                throw new Error('error request')
            }
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
const initialState = {
    user: null,
    status: 'Idle',
    error : null,
    token : null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(authUser.pending , (state )=> {
            state.status  = 'loading'
            state.error = null
            state.token = null
        })
        builder.addCase(authUser.rejected , (state , action)=> {
            state.status  = 'error'
            state.error = action.payload
        })
        builder.addCase(authUser.fulfilled , (state , action)=> {
            state.status  = 'error'
            state.error = action.payload
            state.token = null
        })
    }
})

export default authSlice.reducer