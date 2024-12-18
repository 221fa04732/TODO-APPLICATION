import {atom} from 'recoil'

export const NotificationAtom = atom({
    key : "notification",
    default : {
        show : false,
        message : 'TODO',
        status : 200
    }
})