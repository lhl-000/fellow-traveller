import  { CommonEnum } from '@/enum';

const initState = {
	detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoading: true,
    reloadCommentsNum: 0
};

export default function peopleReducer(preState=initState,action){
	const {type, data} = action;
	switch (type) {
		case CommonEnum.GETDETAIL: 
            preState.detail = data;
			return preState;
		case CommonEnum.GETCOMMENTS:
            preState.comments = data;
            return preState;
        case CommonEnum.SETSHOWLOADING:
            preState.showLoading = data;
            return preState;
        case CommonEnum.RELOADCOMMENTS:
            preState.reloadCommentsNum += 1;
            preState.page.pageNum += 1;
            return preState;
        case CommonEnum.RESETDATA:
            preState.comments = [];
            preState.page = CommonEnum.PAGE;
            preState.showLoading = true;
            preState.reloadCommentsNum = 0;
            return preState;
		default:
			return preState
	}
}