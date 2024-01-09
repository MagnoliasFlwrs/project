import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const authUser = createAsyncThunk(
    'post/authUser',
    async(payload , {rejectWithValue}) => {
        // try {
        //     const {user , params} = payload
        //     // localStorage.setItem('user', JSON.stringify(user))
        //     const res = await axios.post(`http://localhost:8080/user` , user)
        //     if (res.status !== 201) {
        //         throw new Error('error request')
        //     }
        //     console.log(res.data)
        //     return res.data
        // } catch (error) {
        //     return rejectWithValue(error.message)
        // }
        const {user} = payload
        fetch(`http://localhost:8080/user/?userlogin=${user.userlogin}`).then((res) => {
            return res.json();
        }).then((resp) => {
            //console.log(resp)
            if (Object.keys(resp).length === 0) {
                console.log('Please Enter valid username');
            } else {
                if (resp.password === user.userpass) {
                    console.log.success('Success');
                }else{
                    console.log('Please Enter valid credentials');
                }
            }
        }).catch((err) => {
            console.log('Login Failed due to :' + err.message);
        });
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