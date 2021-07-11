package com.ft.server.service.impl;

import com.ft.server.dao.PeopleDAO;
import com.ft.server.entity.People;
import com.ft.server.service.PeopleService;
import com.ft.server.vo.ResultVO;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author lee
 * @create 2021-07-11 10:02
 */
@Service
@Scope("singleton")
public class PeopleServiceImpl implements PeopleService {

    @Resource
    private PeopleDAO peopleDAO;

    @Override
    public ResultVO popularPeople(){
        List<People> popularPeopleList = peopleDAO.queryPeopleRandom();
        return new ResultVO(200, "OK", null, popularPeopleList);
    }

}
