import {api} from '@/utilities/apiService';
import {generateJwt} from '@/utilities/functions';
const STORAGE_NAME = "users";
const apiService = api(STORAGE_NAME);

export default {
    login(data) {
        const user = apiService.getItem(data.id);
        if(user.email == data.email && user.password == data.password) {
            const {password,...jwtData} = user;
            const jwt = generateJwt(jwtData);
            localStorage.setItem('userInfo',jwt);
            return user;
        }
        return false;
    },
    register(data) {
        return apiService.post(data);
    },
}