package com.ft.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
/**
 * @author lee
 * @create 2021-07-01 15:00
 */

@RestController
@RequestMapping("api/user")
@Api(value = "user management", tags = "provide interface for login and register")
@CrossOrigin(allowCredentials = "true")
public class UserController {

    @Resource
    private UserService userService;

    @ApiOperation("user login")
    @ApiImplicitParams({
            @ApiImplicitParam(dataType = "string", name = "username", value = "username", required = true),
            @ApiImplicitParam(dataType = "string", name = "password", value = "password", required = false, defaultValue = "")
    })
    @RequestMapping(value = "login", method = RequestMethod.POST)
        public ResultVO login(HttpServletRequest request, @RequestBody JSONObject json) {

        String verifyCode = (String) request.getSession(false).getAttribute("verifyCode");
        return userService.checkLogin(verifyCode, json.getString("username"), json.getString("password"), json.getString("verifyCode"));
    }

    @ApiOperation("user register")
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public ResultVO register(@RequestBody  User user) {
        return userService.userRegister(user);
    }

    @ApiOperation("user detail")
    @RequestMapping(value = "detail", method = RequestMethod.POST)
    public ResultVO getUserDetail(@RequestBody  JSONObject json) {
        return userService.getDetail(json.getString("username"));
    }

    @ApiOperation("user edit")
    @RequestMapping(value = "edit", method = RequestMethod.POST)
    public ResultVO edit(@RequestBody  JSONObject json) {
        return userService.userEdit(json.getString("username")
                ,json.getString("avatar")
                ,json.getString("meg")
                ,json.getInteger("destNation")
                ,json.getInteger("destCity")
                ,json.getInteger("startNation")
                ,json.getInteger("startCity")
                ,json.getString("perfVehicle")
                ,json.getString("startTime")
                ,json.getString("endTime")
                ,json.getString("userModeTime")
        );
    }

}
