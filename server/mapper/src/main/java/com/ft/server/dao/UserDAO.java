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
                          @Param("transfer1Nation")int transfer1Nation,
                          @Param("transfer1City")int transfer1City,
                          @Param("transfer2Nation")int transfer2Nation,
                          @Param("transfer2City")int transfer2City,
                          @Param("transfer3Nation")int transfer3Nation,
                          @Param("transfer3City")int transfer3City,
                          @Param("transfer4Nation")int transfer4Nation,
                          @Param("transfer4City")int transfer4City,
                          @Param("perfVehicle")String perfVehicle,
                          @Param("startTime") Date startTime,
                          @Param("endTime")Date endTime,
                          @Param("userModeTime")Date userModeTime);

}
