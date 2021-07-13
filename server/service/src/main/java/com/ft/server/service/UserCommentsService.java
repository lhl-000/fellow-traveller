package com.ft.server.service;

import com.ft.server.entity.UserComments;
import com.ft.server.vo.ResultVO;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author lee
 * @create 2021-07-13 19:34
 */
public interface UserCommentsService {
    public ResultVO insertComment(UserComments userComments);

    public ResultVO queryCommentsById(int userId, int pageNum, int pageSize);
}
