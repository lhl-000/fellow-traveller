package com.ft.server.service.impl;

import com.ft.server.dao.UserDAO;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.MD5Utils;

import javax.annotation.Resource;
import java.sql.Date;


/**
 * @author lee
 * @create 2021-07-01 13:27
 */
@Service
@Scope("singleton")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDAO userDAO;

    @Override
    public ResultVO checkLogin(String name, String pwd) {
       User user =  userDAO.queryUserByName(name);
       if (user == null) {
           return new ResultVO(1, "username doesn't exist", null);
       } else {
           if (user.getPassword().equals(pwd)) {
               return new ResultVO(10000, "login successfully", user);
           } else {
               return new ResultVO(10001, "wrong password", null);
           }

       }
    }

    @Transactional
    public ResultVO userRegister(String name, String pwd) {
        synchronized (this) {
            User user = userDAO.queryUserByName(name);

            if (user == null) {
                String md5PWD = MD5Utils.md5(pwd);
                user = new User();
                user.setPassword(md5PWD);
                user.setUsername(name);
                user.setUserRegTime(new Date(System.currentTimeMillis()));
                user.setUserModeTime(new Date(System.currentTimeMillis()));
                int i = userDAO.insertUser(user);
                if (i > 0) {
                    return new ResultVO(201, "register successfully", null);
                } else {
                    return new ResultVO(10001, "fail to register", null);
                }
            } else {
                return new ResultVO(10001, "Username has been registered", null);
            }
        }
    }
}
