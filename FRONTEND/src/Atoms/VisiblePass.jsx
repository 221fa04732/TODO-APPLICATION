import {atom} from 'recoil'

export const VisiblePass = atom({
    key : "VisiblePass",
    default : {
        signin : 0,
        signup : 0
    }
})