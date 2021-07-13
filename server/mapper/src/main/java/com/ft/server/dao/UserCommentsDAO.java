package com.ft.server.dao;

import com.ft.server.entity.User;
import com.ft.server.entity.UserComments;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author lee
 * @create 2021-07-10 19:53
 */
@Repository
public interface UserCommentsDAO {
    public int insertUserComment(UserComments userComments);

    public List<UserComments> queryUserById(
            @Param("userId")
            int userId,
            @Param("pageSize")
            int pageSize,
            @Param("pageNum")
            int PageNum);
}
