import axios from 'axios';
import endpoints from 'constants/endpoints';
import ApiResponse from 'resources/entity/IApiResponse';
import { ILoginSchema, ISignupSchema } from '../Interface/authInterface';

export const signup = async (signupData :ISignupSchema): Promise<ApiResponse> => {
    const {data} = await axios.post(endpoints.Auth.SIGNUP,
        signupData,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    console.log(data)
    return data;
}

export const login = async (loginData:ILoginSchema) : Promise<ApiResponse>=> {
    const {data} = await axios.post(endpoints.Auth.LOGIN,
        loginData,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    console.log(data)
    return data;
}