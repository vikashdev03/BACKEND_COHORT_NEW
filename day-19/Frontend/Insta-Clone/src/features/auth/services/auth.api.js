import axios from "axios"

export async function registerUser(username, email, password) {

try{
    const response = await axios.post("http://Localhost:3000/api/auth/register",{
        username,
        email,
        password,
    } ,{
        withCredentials: true // qki server side pe cookie set ho rahi hai aur client side pe bhi cookie chahiye
    })

    return response.data
}
catch(err){
    throw err
}

}

export async function loginUser(username, password) {

    try{
        const response = await axios.post("http://Localhost:3000/api/auth/login",{
            username,
            password,
        } ,{
            withCredentials: true // qki server side pe cookie set ho rahi hai aur client side pe bhi cookie chahiye
        })
        return response.data
    }
    catch(err){
        throw err
    }

}

