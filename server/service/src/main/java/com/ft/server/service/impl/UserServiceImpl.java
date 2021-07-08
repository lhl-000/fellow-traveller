package com.ft.server.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.dao.UserDAO;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.MD5Utils;
import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;


/**
 * @author lee
 * @create 2021-07-01 13:27
 */
@Service
@Scope("singleton")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDAO userDAO;

    @Override
    public ResultVO checkLogin(String username, String password) {
       User user =  userDAO.queryUserByName(username);
       if (user == null) {
           return new ResultVO(200, null,"Username doesn't exist",  null);
       } else {
           String md5PWD = MD5Utils.md5(password);
           if (user.getPassword().equals(md5PWD)) {
               JwtBuilder builder = Jwts.builder();
               HashMap<String,Object> map = new HashMap<>();
               String token = builder.setSubject(username)
                       .setIssuedAt(new Date())
                       .setId(user.getUserId() + "")
                       .setExpiration(new Date(System.currentTimeMillis() + 7*24*60*60*1000))
                       .signWith(SignatureAlgorithm.HS256, "fellow-traveller")
                       .compact();
               JSONObject res = new JSONObject();
               res.put("token", token);
               res.put("username", username);
               return new ResultVO(200, "OK",null, res);
           } else {
               return new ResultVO(200, null,"Wrong password or username", null);
           }
       }
    }

    @Transactional
    public ResultVO userRegister(User user) {
        synchronized (this) {
            User newUser = userDAO.queryUserByName(user.getUsername());
            if (newUser == null) {
                String md5PWD = MD5Utils.md5(user.getPassword());
                user.setPassword(md5PWD);
                int i = userDAO.insertUser(user);
                if (i > 0) {
                    JwtBuilder builder = Jwts.builder();
                    HashMap<String,Object> map = new HashMap<>();
                    String token = builder.setSubject(user.getUsername())
                            .setIssuedAt(new Date())
                            .setId(user.getUserId() + "")
                            .setExpiration(new Date(System.currentTimeMillis() + 7*24*60*60*1000))
                            .signWith(SignatureAlgorithm.HS256, "fellow-traveller")
                            .compact();
                    JSONObject res = new JSONObject();
                        res.put("token", token);
                        res.put("username", user.getUsername());
                    return new ResultVO(200, "register successfully",null, res);
                } else {
                    return new ResultVO(200, null,"fail to register", null);
                }
            } else {
                return new ResultVO(200, null,"Username has been registered", null);
            }
        }
    }

    @Override
    public ResultVO getDetail(String username) {
        User user =  userDAO.queryUserByName(username);
        if (user == null) {
            return new ResultVO(200, null,"Username doesn't exist",  null);
        } else {
            JSONObject res = new JSONObject();
            res.put("avatar", user.getAvatar());
            res.put("meg", user.getMeg());
            res.put("startNation", user.getStartNation()+"");
            res.put("startCity", user.getStartCity()+"");
            res.put("destNation", user.getDestCity()+"");
            res.put("destCity", user.getDestCity()+"");
            res.put("perfVehicle", user.getPerfVehicle());
            res.put("startTime", user.getStartTime());
            res.put("endTime", user.getEndTime());
            return new ResultVO(200, "OK",null, res);
        }
    }

}