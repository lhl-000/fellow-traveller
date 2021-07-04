package com.ft.server.dao;

import com.ft.server.entity.User;

/**
 * @author lee
 * @create 2021-07-01 10:55
 */
public interface UserDAO {

    public int insertUser(User user);

    public User queryUserByName(String name);
}
