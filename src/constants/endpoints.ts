const URL = "http://localhost:3002/api/v1"


export default {
    Auth:{
        SIGNUP:`${URL}/auth/signup`,
        LOGIN:`${URL}/auth/login`,
    }
} as const;