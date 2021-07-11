package com.ft.server.dao;

import com.ft.server.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * @author lee
 * @create 2021-07-01 10:55
 */
@Repository
public interface UserDAO {

    public int insertUser(User user);

    public User queryUserByName(String username);

    public int updateUser(@Param("username") String username,
                          @Param("avatar")String avatar,
                          @Param("meg")String meg,
                          @Param("destNation")int destNation,
                          @Param("destCity")int destCity,
                          @Param("startNation")int startNation,
                          @Param("startCity")int startCity,
                          @Param("perfVehicle")String perfVehicle,
                          @Param("startTime") Date startTime,
                          @Param("endTime")Date endTime,
                          @Param("userModeTime")Date userModeTime);

}
