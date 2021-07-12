package com.ft.server.dao;

import com.ft.server.entity.People;
import com.ft.server.entity.SearchMeg;
import com.ft.server.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * @author lee
 * @create 2021-07-11 9:01
 */
@Repository
public interface PeopleDAO {

    public List<People> queryPeopleRandom();

    public People queryPeopleById(int userId);

    public List<People> strictMatchPeopleBySearchMeg(SearchMeg searchMeg);

    public List<People> fuzzyMatchPeopleBySearchMeg(SearchMeg searchMeg);

}