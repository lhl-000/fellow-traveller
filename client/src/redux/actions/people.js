import { Http } from '@/utils';
import { CommonEnum } from '@/enum';

export const getDetail = (data) => ({type:CommonEnum.GETDETAIL, data: data})

export const getComments = (data) => ({type:CommonEnum.GETCOMMENTS, data: data});

export const setShowLoading = (data) => ({type:CommonEnum.SETSHOWLOADING, data: data});

export const reloadComments = (data) => ({
    type:CommonEnum.RELOADCOMMENTS,
    data: data
});

export const resetData = (data) => ({
    type: CommonEnum.RESETDATA,
    data: data
});

export const getDetailAsync = (rootState, data) => {  
	return async (dispatch)=>{
        const detail = await Http({
            url: '/people/detail',
            body: data
            });
        dispatch(getDetail(detail));
	}
}

export const getCommentsAsync = (state, data) => {
    return async (dispatch)=> {
        const { comments, page } = state;
        const lists = await Http({
            url: '/comments/lists',
            body: {
            ...data,
            pageSize: page.pageSize,
            pageNum: page.pageNum
            }
        });
        dispatch(getComments([...comments, ...lists]));
        dispatch(setShowLoading(lists.length ? true : false));
    }
}

export const addCommentsAsync = (data) => {
    return async (dispatch) => {
        const result = await Http({
            url: '/comments/add',
            body: data
            });
        if (result) {
            dispatch(resetData({}));
        }
}
}
