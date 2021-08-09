package com.ft.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("verifyCode") == null) {
            return new ResultVO(200, null, "Verify code is expired", null);
        }
        String verifyCode = (String) session.getAttribute("verifyCode");
        ResultVO result =  userService.checkLogin(verifyCode, json.getString("username"), json.getString("password"), json.getString("verifyCode"));
        if (result.getMsg() != null) {
            session.invalidate();
        }
        return result;
    }

    @ApiOperation("user register")
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public ResultVO register(@RequestBody  User user) {
        System.out.println(user);
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
                ,json.getInteger("transfer1Nation")
                ,json.getInteger("transfer1City")
                ,json.getInteger("transfer2Nation")
                ,json.getInteger("transfer2City")
                ,json.getInteger("transfer3Nation")
                ,json.getInteger("transfer3City")
                ,json.getInteger("transfer4Nation")
                ,json.getInteger("transfer4City")
                ,json.getString("perfVehicle")
                ,json.getString("startTime")
                ,json.getString("endTime")
                ,json.getString("userModeTime")
        );
    }

}
