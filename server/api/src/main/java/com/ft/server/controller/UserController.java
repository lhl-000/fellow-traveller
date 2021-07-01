package com.ft.server.controller;

import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @author lee
 * @create 2021-07-01 15:00
 */
@Controller
@ResponseBody
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping("/login")
    public ResultVO login(String name, String pwd) {
        return userService.checkLogin(name, pwd);
    }
}
