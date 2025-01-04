import {atom} from 'recoil'

export const LoginStatus= atom({
    key : "LoginStatus",
    default : {
        status : false
    }
})