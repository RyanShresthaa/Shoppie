import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    _id : "",
    name : "",
    email : "",
    avatar : "",
    mobile : "",
    verify_email : "",
    last_login_date : "",
    status : "",
    address_details : [],
    shopping_cart : [],
    orderHistory : [],
    forgot_password_otp : "",
    forgot_password_otp_expire : "",
    role : "",
    created_at : "",
    updated_at : ""
}

const userSlice = createSlice({
    name : 'user',
    initialState: initialValue,
    reducers : {
        setUserDetails : (state,action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.mobile = action.payload.mobile
            state.verify_email = action.payload.verify_email
            state.last_login_date = action.payload.last_login_date
            state.status = action.payload.status
            state.address_details = action.payload.address_details
            state.shopping_cart = action.payload.shopping_cart
            state.orderHistory = action.payload.orderHistory
            state.forgot_password_otp = action.payload.forgot_password_otp
            state.forgot_password_otp_expire = action.payload.forgot_password_otp_expire
            state.role = action.payload.role
            state.created_at = action.payload.created_at
            state.updated_at = action.payload.updated_at
        },
        updatedAvatar : (state, action) =>
        {
            state.avatar = action.payload
        },
        logout : (state,action) => {
            state._id = ""
            state.name = ""
            state.email = ""
            state.avatar = ""
            state.mobile = ""
            state.verify_email = "" 
            state.last_login_date = '' 
            state.status = ""
            state.address_details = [] 
            state.shopping_cart = []
            state.orderHistory = []
            state.forgot_password_otp = "" 
            state.forgot_password_otp_expire = ""
            state.role = ""
            state.created_at = "" 
            state.updated_at = ""
        }
    }
})

export const { setUserDetails, logout,updatedAvatar } = userSlice.actions

export default userSlice.reducer;