package com.ft.server.service;

import com.ft.server.vo.ResultVO;

/**
 * @author lee
 * @create 2021-07-01 13:25
 */
public interface UserService {

    public ResultVO userRegister(String name, String pwd);

    public ResultVO checkLogin(String name, String pwd);

}
