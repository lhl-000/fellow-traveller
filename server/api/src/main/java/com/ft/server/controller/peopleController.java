package com.ft.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.entity.SearchMeg;
import com.ft.server.service.PeopleService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

    @RequestMapping(value = "search", method = RequestMethod.POST)
    public ResultVO searchPeople(@RequestBody SearchMeg searchMeg) {
        return peopleService.searchPeople(searchMeg);
    }

    @RequestMapping(value = "match", method = RequestMethod.POST)
    public ResultVO matchPeople(@RequestBody JSONObject json) {
        return peopleService.matchPeople(json.getInteger("userId"),
                json.getInteger("pageNum"),
                json.getInteger("pageSize"));
    }

    @RequestMapping(value = "detail", method = RequestMethod.POST)
    public ResultVO getPeopleDetail(@RequestBody JSONObject json) {
        return peopleService.getDetail(json.getInteger("userId"));
    }



}
