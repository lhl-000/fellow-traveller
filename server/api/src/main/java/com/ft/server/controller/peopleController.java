package com.ft.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.service.PeopleService;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author lee
 * @create 2021-07-02 18:03
 */
@RestController
@RequestMapping("api/people")
@Api(value = "people management", tags = "provide interface for getting people info")
@CrossOrigin
public class peopleController {

    @Resource
    private PeopleService peopleService;

    @ApiOperation("popular people")
    @RequestMapping(value = "popular", method = RequestMethod.POST)
    public ResultVO getPopularPeople(HttpServletRequest request) {
        return peopleService.popularPeople();
    }
}
