package com.ft.server.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ft.server.dao.UserDAO;
import com.ft.server.entity.User;
import com.ft.server.service.UserService;
import com.ft.server.vo.ResultVO;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

//    private EMService emService;

    @Override
    public ResultVO checkLogin(String verifyCode, String username, String password, String userVerifyCode) {
        if (userVerifyCode == null) {
            return new ResultVO(200, null,"Please input verify code", null);
        }  else if (verifyCode == null) {
            return new ResultVO(200, null,"Verify code expired", null);
        }
        if (!userVerifyCode.equals(verifyCode)) {
            return new ResultVO(200, null,"Your verify code was wrong", null);
        }
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
               logger.info(user.getUserId() + "---Login---Success---" + new Date());
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
//                EMProperties properties = EMProperties.builder()
//                        .setAppkey("1156210717083467#demo")
//                        .setClientId("YXA6LBdhWMMlTAWn4auHpgdOfA")
//                        .setClientSecret("YXA6yiQ6YU8MO80pkojMx1bFf6NINCk")
//                        .build();

//                emService = new EMService(properties);
//                emService.user().create(user.getUsername(), user.getPassword())
//                        .block();
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
                    logger.info(i + " " + user.getUsername() + "---Register---Success---" + new Date());
                    return new ResultVO(200, "Register successfully",null, token);
                } else {
                    return new ResultVO(200, null,"Fail to register", null);
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
            logger.info(user.getUserId() + "---Get detail---Success---" + new Date());
            return new ResultVO(200, "OK",null, res);
        }
    }


    @Override
    @Transactional
    public ResultVO userEdit(String username, String avatar, String meg,
                             int destNation, int destCity, int startNation,
                             int startCity, int  transfer1Nation, int transfer1City,
                             int  transfer2Nation,int transfer2City,
                             int  transfer3Nation,int transfer3City, int transfer4Nation,
                             int transfer4City,String perfVehicle,String startTimeString,
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
                        startCity,transfer1Nation, transfer1City,
                transfer2Nation,transfer2City,
                transfer3Nation,transfer3City,transfer4Nation,
                transfer4City, perfVehicle, startTime, endTime, userModeTime);
                if (i > 0) {
                    logger.info(user.getUserId() + "---Edit info---Success---" + new Date());
                    return new ResultVO(200, "OK", null, "OK");
                } else {
                    logger.info(user.getUserId() + "---Edit info---Failed---" + new Date());
                    return new ResultVO(200, null, "Edit failed", null);
                }
            }
        }
    }

}