package com.ft.server.dao;
import com.ft.server.entity.People;
import com.ft.server.entity.SearchMeg;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

/**
 * @author lee
 * @create 2021-07-11 9:01
 */
@Repository
public interface PeopleDAO {

    public List<People> queryPeopleRandom();

    public People queryPeopleById(int userId);

    public List<People> queryPeopleByName(String peopleName);

    public List<People> strictMatchPeopleBySearchMeg(SearchMeg searchMeg);

    public List<People> fuzzyMatchPeopleBySearchMeg(
            @Param("userId")int userId,
            @Param("startCity")int startCity,
            @Param("destCity")int destCity,
            @Param("startTime") Date startTime,
            @Param("endTime") Date endTime

    );

    public List<People> fuzzyMatchPeopleBySearchMeg2(
            SearchMeg searchMeg
    );

}