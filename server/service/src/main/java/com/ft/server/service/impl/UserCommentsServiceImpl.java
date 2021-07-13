package com.ft.server.service.impl;

import com.ft.server.dao.PeopleDAO;
import com.ft.server.dao.UserCommentsDAO;
import com.ft.server.entity.People;
import com.ft.server.entity.UserComments;
import com.ft.server.service.UserCommentsService;
import com.ft.server.vo.ResultVO;
import com.github.pagehelper.PageHelper;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author lee
 * @create 2021-07-13 19:36
 */
@Service
@Scope("singleton")
public class UserCommentsServiceImpl implements UserCommentsService {

    @Resource
    private UserCommentsDAO userCommentsDAO;

    @Override
    @Transactional
    public ResultVO insertComment(UserComments userComments) {
        synchronized (this) {
            int result = userCommentsDAO.insertUserComment(userComments);
            if (result > 0) {
                return new ResultVO(200, "OK", null, null );
            } else {
                return new ResultVO(200,null , "Failed to comment", null );
            }
        }
    }

    @Override
    public ResultVO queryCommentsById(int userId, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<UserComments> result =  userCommentsDAO.queryUserById(userId, pageNum, pageSize);
        return new ResultVO(200, "OK", null, result);
    }
}
