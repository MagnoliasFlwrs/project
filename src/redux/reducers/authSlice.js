import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const authUser = createAsyncThunk(
    'post/authUser',
    async(payload , {rejectWithValue}) => {
        try {

        const {user} = payload
        const res = await axios.get(`http://localhost:8080/user/?userlogin=${user.userlogin}`)
        if (res.status !== 200) {
                throw new Error('error request')
            }
            console.log(res.data)
            if (res.data[0]?.userpass === user.userpass && res.data[0]?.userlogin === user.userlogin) {
                localStorage.removeItem('error')
                sessionStorage.setItem('isAuth' , true)
            } else {
                localStorage.setItem('error' , 'Неправильный логин или пароль')
            }
            return res.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)
const initialState = {
    user: null,
    status: 'Idle',
    error : null,
    token : null,
    showModal : false
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