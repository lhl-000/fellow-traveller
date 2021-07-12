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
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
                       .setId(user.getUserId()+"")
                       .setExpiration(new Date(System.currentTimeMillis() + 7*24*60*60*1000))
                       .signWith(SignatureAlgorithm.HS256, "fellow-traveller")
                       .compact();
               return new ResultVO(200, "OK",null, token);
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
                            .setId(user.getUserId()+"")
                            .setExpiration(new Date(System.currentTimeMillis() + 7*24*60*60*1000))
                            .signWith(SignatureAlgorithm.HS256, "fellow-traveller")
                            .compact();
                    return new ResultVO(200, "register successfully",null, token);
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
            res.put("startNation", user.getStartNation());
            res.put("startCity", user.getStartCity());
            res.put("destNation", user.getDestNation());
            res.put("destCity", user.getDestCity());
            res.put("perfVehicle", user.getPerfVehicle());
            res.put("startTime", user.getStartTime());
            res.put("endTime", user.getEndTime());
            return new ResultVO(200, "OK",null, res);
        }
    }


    @Override
    @Transactional
    public ResultVO userEdit(String username, String avatar, String meg,
                             int destNation, int destCity, int startNation,
                             int startCity, String perfVehicle,String startTimeString,
                             String endTimeString, String userModeTimeString) {
        synchronized (this) {
            User user = userDAO.queryUserByName(username);
            if (user == null) {
                return new ResultVO(200, null, "Username doesn't exist", null);
            } else {
                System.out.println(avatar);
                if (avatar == null) {
                    avatar = user.getAvatar();
                }
                if (meg == null) {
                    meg = user.getMeg();
                }
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                Date userModeTime = null;
                Date startTime = null;
                Date endTime = null;
                System.out.println(userModeTimeString + startTimeString + endTimeString);
                try {
                    userModeTime = sdf.parse(userModeTimeString);
                    startTime = sdf.parse(startTimeString);
                    endTime = sdf.parse(endTimeString);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                int i = userDAO.updateUser(username, avatar, meg,
                        destNation, destCity, startNation,
                        startCity, perfVehicle, startTime, endTime, userModeTime);
                if (i > 0) {
                    return new ResultVO(200, "OK", null, "OK");
                } else {
                    return new ResultVO(200, null, "Edit failed", null);
                }
            }
        }
    }

}