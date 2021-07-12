package com.ft.server.service.impl;

import com.ft.server.dao.PeopleDAO;
import com.ft.server.entity.People;
import com.ft.server.entity.SearchMeg;
import com.ft.server.service.PeopleService;
import com.ft.server.vo.ResultVO;
import com.github.pagehelper.PageHelper;
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
    public ResultVO popularPeople() {
        List<People> result = peopleDAO.queryPeopleRandom();
        return new ResultVO(200, "OK", null, result);
    }

    @Override
    public ResultVO searchPeople(SearchMeg searchMeg) {
        PageHelper.startPage(searchMeg.getPageNum(),searchMeg.getPageSize());
        List<People> strictResult = peopleDAO.strictMatchPeopleBySearchMeg(searchMeg);
        if (strictResult == null || strictResult.isEmpty()) {
            return new ResultVO(200, "OK", null, strictResult);
        }
        System.out.println(strictResult);
        List<People> fuzzyResult = peopleDAO.fuzzyMatchPeopleBySearchMeg(searchMeg);
        return new ResultVO(200, "OK", null, fuzzyResult);
    }

    @Override
    public ResultVO matchPeople(int userId, int PageSize, int PageNum) {
        People people = peopleDAO.queryPeopleById(userId);
        SearchMeg searchMeg = new SearchMeg(people.getStartNation(),
                people.getStartCity(),
                people.getDestNation(),
                people.getDestCity(),
                PageSize,
                PageNum,
                people.getStartTime(),
                people.getEndTime());
        return searchPeople(searchMeg);
    }

}
