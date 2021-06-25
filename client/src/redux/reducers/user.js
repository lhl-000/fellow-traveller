import { CommonEnum } from '@/enum';

const initState = {
    id: undefined,
    name: undefined,
    avatar: undefined,
    meg: undefined,
    startNation: undefined,
    startCity: undefined,
    destinationNation: undefined,
    destinationCity: undefined,
    vehicle : undefined,
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