const URL = "http://localhost:3002/api/v1"


export default {
    Auth:{
        LOGIN:`${URL}/auth/login`,
    }
} as const;