package com.ft.server.service;

import com.ft.server.entity.User;
import com.ft.server.vo.ResultVO;

/**
 * @author lee
 * @create 2021-07-01 13:25
 */
public interface UserService {

    public ResultVO userRegister(User user);

    public ResultVO checkLogin(String verifyCode, String username, String password, String userVerifyCode);

    public ResultVO getDetail(String username);

    public ResultVO userEdit(String username, String avatar, String meg,
                             int destNation, int destCity, int startNation,
                             int startCity, String perfVehicle, String startTime,
                             String endTime, String userModeTime);

}
