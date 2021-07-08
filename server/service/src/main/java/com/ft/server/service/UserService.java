package com.ft.server.service;

import com.ft.server.entity.User;
import com.ft.server.vo.ResultVO;

/**
 * @author lee
 * @create 2021-07-01 13:25
 */
public interface UserService {

    public ResultVO userRegister(User user);

    public ResultVO checkLogin(String name, String pwd);


}
