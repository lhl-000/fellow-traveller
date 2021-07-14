package com.ft.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.entity.UserComments;
import com.ft.server.service.UserCommentsService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author lee
 * @create 2021-07-13 20:20
 */
@RestController
@RequestMapping("api/comments")
@Api(value = "people management", tags = "provide interface for getting people info")
@CrossOrigin()
public class CommentsController {
    @Resource
    UserCommentsService userCommentsService;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public ResultVO insertComment(@RequestBody UserComments userComments){
        return userCommentsService.insertComment(userComments);
    }

    @RequestMapping(value = "lists", method = RequestMethod.POST)
    public ResultVO getCommentLists(@RequestBody JSONObject json) {
        return userCommentsService.queryCommentsById(json.getInteger("userId")
        ,json.getInteger("pageNum"), json.getInteger("pageSize"));
    }



}
