import { AUTH} from '../constansts/actionTypes'
import * as api from '../api/index'

export const signin = (formData, navigate)=> async(dispatch) => {
    try {
        // LOG IN USER//
        const {data} = await api.signIn(formData)

        dispatch({type: AUTH, data})

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData,navigate)=> async(dispatch) => {
    try {
        // SIGN UP USER//
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, data})
        
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}