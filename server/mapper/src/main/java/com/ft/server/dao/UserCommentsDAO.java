package com.ft.server.dao;

import com.ft.server.entity.User;
import org.springframework.stereotype.Repository;

/**
 * @author lee
 * @create 2021-07-10 19:53
 */
@Repository
public interface UserCommentsDAO {
    public int insertUserComment(User user);

    public User queryUserById(int userId);
}
