package com.ft.server.controller;

import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author lee
 * @create 2021-07-01 15:00
 */

@RestController
//@Controller
//@ResponseBody
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
    public ResultVO login(String username, String password) {
        return userService.checkLogin(username, password);
    }

    @ApiOperation("user register")
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public ResultVO register(@RequestBody User user) {
        return userService.userRegister((User)user);
    }

}
