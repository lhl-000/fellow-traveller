package com.ft.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.*;
import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author lee
 * @create 2021-07-01 15:00
 */

@RestController
@RequestMapping("api/user")
@Api(value = "user management", tags = "provide interface for login and register")
@CrossOrigin
public class UserController {

    @Resource
    private UserService userService;

    @ApiOperation("user login")
    @ApiImplicitParams({
            @ApiImplicitParam(dataType = "string", name = "username", value = "username", required = true),
            @ApiImplicitParam(dataType = "string", name = "password", value = "password", required = false, defaultValue = "")
    })
    @RequestMapping(value = "login", method = RequestMethod.POST)
        public ResultVO login(@RequestBody JSONObject json) {
        return userService.checkLogin(json.getString("username"), json.getString("password"));
    }

    @ApiOperation("user register")
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public ResultVO register(@RequestBody  User user) {
        return userService.userRegister(user);
    }

    @ApiOperation("user detail")
    @RequestMapping(value = "detail", method = RequestMethod.POST)
    public ResultVO getDetail(@RequestBody  JSONObject json) {
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
