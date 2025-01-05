import {atom} from 'recoil'

export const SignStatus= atom({
    key : "SignStatus",
    default : {
        status : 0,
        id : '',
        username : '',
        email : ''
    }
})