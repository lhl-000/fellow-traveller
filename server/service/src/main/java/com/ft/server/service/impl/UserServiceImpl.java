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
           return new ResultVO(200, null,"Username doesn't exist",  null);
       } else {
           if (user.getPassword().equals(pwd)) {
               return new ResultVO(200, "Login successfully",null, user);
           } else {
               return new ResultVO(200, null,"Wrong password or username", null);
           }
       }
    }

    @Transactional
    public ResultVO userRegister(User user) {
        synchronized (this) {
            User newUser = userDAO.queryUserByName(user.getUsername());
            if (newUser == null) {
                String md5PWD = MD5Utils.md5(user.getPassword());
                user.setPassword(md5PWD);
                if (user.getAvatar() == null) {
                    user.setAvatar("default.jpg");
                }
                int i = userDAO.insertUser(user);
                if (i > 0) {
                    return new ResultVO(200, "register successfully",null, null);
                } else {
                    return new ResultVO(200, null,"fail to register", null);
                }
            } else {
                return new ResultVO(200, null,"Username has been registered", null);
            }
        }
    }
}
