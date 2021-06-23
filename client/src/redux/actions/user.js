
import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { CommonEnum } from '@/enum';
import { useHistory } from 'react-router-dom';

const history = useHistory();

export const getUser = (data) => ({ type: CommonEnum.GETUSER, data: data });

export const editUser = (data) => ({ type: CommonEnum.EDITUSER, data: data });

export const getUserAsync = async (data) => {
    return (dispatch) => {
        const user = await Http({
            url: '/user/detail',
            body: data
        });
        if (user) {
            dispatch(getUser(user));
        }
    }
}

export const editUserAsync = async (data) => {
    return () => {
        const result = await Http({
            url: '/user/edit',
            body: data
        });
        if (result) {
            Toast.success('edit successfully');
            history.push('/user');
        }
    }
}

export const loginAsync = async (data) => {
    return () => {
        const result = await Http({
            url: '/user/login',
            body: data
        });
        if (result) {
            cookie.set('user', result);
            history.push(urlGet('from'));
            Toast.success('login successfully');
        }
    }
}

export const registerAsync = async (data) => {
    const result = await Http({
        url: '/user/register',
        body: data
    });
    if (result) {
        cookie.set('user', result);
        Toast.success('Register successfully');
    }
}

