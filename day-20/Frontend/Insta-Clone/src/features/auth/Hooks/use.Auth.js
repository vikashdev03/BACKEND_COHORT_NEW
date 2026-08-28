import {useContext} from 'react'
import { AuthContext } from '../auth.context.jsx'


//ye  hamara custom hook hai useAuth() jisse hum auth context ko access karenge

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}