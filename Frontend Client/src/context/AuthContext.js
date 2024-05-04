import { createContext, useReducer } from 'react'
import AuthReducer  from './AuthReducer.js'
const INITIAL_STATE = {
    user: {
    "_id": "6610856aa06daa41505213fa",
    "username": "Gary",
    "email": "gary@gmail.com",
    "profilePicture": "Person/1.jpeg",
    "coverPicture": "",
    "followers": [
        "66108594a06daa41505213fc"
    ],
    "followings": [
        "66108594a06daa41505213fc"
    ],
    "isAdmin": false,
    "createdAt": "2024-04-05T23:12:42.997Z",
    "__v": 0,
    "desc": "Hey friends!!",
    "city": "Berlin",
    "from": "Paderborn",
    "relationship": 3
},
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return(
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>
        {children}
        </AuthContext.Provider>
    )
}