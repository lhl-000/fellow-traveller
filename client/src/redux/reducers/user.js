import { CommonEnum } from '@/enum';

const initState = {
    avatar: undefined,
    meg: undefined,
    startNation: undefined,
    startCity: undefined,
    destNation: undefined,
    destCity: undefined,
    perfVehicle : undefined,
    startTime: undefined,
    endTime: undefined,
};

export default function userReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case CommonEnum.GETUSER:
            preState = data;
            return preState;
        default:
            return preState
    }
}