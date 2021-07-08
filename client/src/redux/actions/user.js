
import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { CommonEnum } from '@/enum';
import cookie from 'react-cookies';

export const getUser = (data) => ({ type: CommonEnum.GETUSER, data: data });

export const editUser = (data) => ({ type: CommonEnum.EDITUSER, data: data });

export const getUserAsync = (data) => {
    return async (dispatch) => {
        const user = await Http({
            url: '/user/detail',
            headers: cookie.load('token'),
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
            headers: cookie.load('token'),
            body: data
        });
        if (result) {
            Toast.success('Edit successfully');
            history.push('/user');
        }
    }
}

export const loginAsync = (data, history) => {
    return async () => {
        const result = await Http({
            url: '/user/login',
            body: data
        });
        if (result) {
            cookie.save('token', result.token);
            cookie.save('username', result.username)
            history.push('/');
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
        console.log(result);
        if (result) {
            cookie.save('token', result.token);
            cookie.save('username', result.username)
            Toast.success('Register successfully');
            history.push('/');
        }
    }
}

