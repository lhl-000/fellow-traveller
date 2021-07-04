package com.ft.server.controller;

import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author lee
 * @create 2021-07-01 15:00
 */
@CrossOrigin
@RestController
//@Controller
//@ResponseBody
@RequestMapping("/user")
@Api(value = "user management", tags = "provide interface for login and register")
public class UserController {

    @Resource
    private UserService userService;

    @ApiOperation("user login")
    @ApiImplicitParams({
            @ApiImplicitParam(dataType = "string", name = "username", value = "username", required = true),
            @ApiImplicitParam(dataType = "string", name = "password", value = "password", required = false, defaultValue = "")
    })
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResultVO login(String name, String pwd) {
        return userService.checkLogin(name, pwd);
    }


//    @DeleteMapping("/user/{uid}")
//    public ResultVO deleteUser(@PathVariable("uid") int userId) {
//        System.out.println(userId);
//        return null;
//    }
}
