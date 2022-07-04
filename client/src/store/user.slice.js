import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode';


export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    user: null
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setUser: (state, userVal) => {
        state.user = userVal.payload
    }
  },
})

export const { increment, decrement, incrementByAmount, setUser } = counterSlice.actions

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

const credentialCheck = (obj) => {
    return obj.hasOwnProperty('role') && obj.hasOwnProperty('company')
}

export const onLogin = (userCred) => (dispatch, getState) => {
  console.log('login')
    let decoded;
    try {
        decoded = jwtDecode(userCred);
        if (!credentialCheck(decoded)) onLogout();
        const payload = {
            loggedIn: true,
            ...decoded
        }
        dispatch(setUser(payload))
        console.log('from dispatch', userCred, getState())
      
    } catch (error) {
      // dispatch(onLogout())
    }
}

export const onLogout = () => (dispatch) => {
    console.log('isolated')
    const payload = { loggedIn: false }
    localStorage.clear();
    dispatch(setUser(payload))
}

export const selectCount = (state) => state.user.value
export const userState = (state) => state.user.user

export default counterSlice.reducer
