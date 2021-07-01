package com.ft.server.service.impl;

import com.ft.server.dao.UserDAO;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author lee
 * @create 2021-07-01 13:27
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserDAO userDAO;

    @Override
    public ResultVO checkLogin(String name, String pwd) {
       User user =  userDAO.queryUserByName(name);
       if (user == null) {
           return new ResultVO(1, "username doesn't exist", null);
       } else {
           if (user.getPwd().equals(pwd)) {
               return new ResultVO(10000, "login successfully", user);
           } else {
               return new ResultVO(10001, "wrong password", null);
           }

       }
    }
}
