
import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { CommonEnum } from '@/enum';
import cookie from 'react-cookies';
import WebIM from '@/config/WebIM'
export const getUser = (data) => ({ type: CommonEnum.GETUSER, data: data });

export const editUser = (data) => ({ type: CommonEnum.EDITUSER, data: data });

export const getUserAsync = (data) => {
    return async (dispatch) => {
        const user = await Http({
            url: '/user/detail',
            headers: {toekn: cookie.load('token')},
            body: data
        });
        if (user) {
            dispatch(getUser(user));
        }
    }
}

export const editUserAsync = (data, history) => {
    return async () => {
        const result = await Http({
            url: '/user/edit',
            headers: {toekn: cookie.load('token')},
            body: data
        });
        if (result) {
            Toast.success('Edit successfully');
            history.push('/user');
        }
    }
}

export const loginAsync = (data, history, target, options) => {
    return async () => {
        const result = await Http({
            url: '/user/login',
            credentials:'include',
            body: data
        });
        if (result) {
            cookie.save('token', result);
            if (target) {
                history.replace(target);
            } else {
                history.replace('/');
            }
            Toast.success('Login successfully');
        }
    }
}

export const registerAsync = (data, history) => {
    return async () => {
        const result = await Http({
            url: '/user/register',
            body: data
        });
        if (result) {
            cookie.save('token', result);
            Toast.success('Register successfully');
            history.push('/');
        }
    }
}

