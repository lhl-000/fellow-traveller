package com.ft.server.service.impl;

import com.ft.server.dao.PeopleDAO;
import com.ft.server.entity.People;
import com.ft.server.entity.SearchMeg;
import com.ft.server.service.PeopleService;
import com.ft.server.vo.ResultVO;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
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

    private Logger logger = LoggerFactory.getLogger(PeopleServiceImpl.class);

    @Override
    public ResultVO popularPeople() {
        List<People> result = peopleDAO.queryPeopleRandom();
        return new ResultVO(200, "OK", null, result);
    }

    @Override
    public ResultVO searchPeople(SearchMeg searchMeg) {
        PageHelper.startPage(searchMeg.getPageNum(),searchMeg.getPageSize());
        if (!(searchMeg.getPeopleName() == null) && !(searchMeg.getPeopleName() == "")) {
            List<People> result = peopleDAO.queryPeopleByName(searchMeg.getPeopleName());
            logger.info("Start" + "---" + searchMeg.getDestCity() + " " +searchMeg.getDestCity()+ "---Time---" +searchMeg.getStartTime()+ " " + searchMeg.getEndTime() + "From"+ searchMeg.getStartNation() + " " +searchMeg.getStartCity() + "---Success---" + new Date());
            return new ResultVO(200, "OK", null, result);
        }
        List<People> strictResult = peopleDAO.strictMatchPeopleBySearchMeg(searchMeg);
        return new ResultVO(200, "OK", null, strictResult);

        //        if (strictResult != null && !strictResult.isEmpty()) {
//            return new ResultVO(200, "OK", null, strictResult);
//        }
//        List<People> fuzzyResult = peopleDAO.fuzzyMatchPeopleBySearchMeg(searchMeg);
////        List<People> filterResult = new ArrayList<>();
////        for (People people : fuzzyResult) {
////            if (!strictResult.contains(people)) {
////                filterResult.add(people);
////            }
////        }
//        return new ResultVO(200, "OK", null, fuzzyResult);
    }

    @Override
    public ResultVO matchPeople(int userId, int PageSize, int PageNum) {
        People people = peopleDAO.queryPeopleById(userId);
        SearchMeg searchMeg = new SearchMeg(null, people.getStartNation(),
                people.getStartCity(),
                people.getDestNation(),
                people.getDestCity(),
                PageNum,
                PageSize,
                people.getStartTime(),
                people.getEndTime());
        logger.info(userId +  "---" + "Use match function");
        return searchPeople(searchMeg);
    }

    @Override
    public ResultVO getDetail(int userId) {
        People people = peopleDAO.queryPeopleById(userId);
        logger.info(userId +  "---" + "Detail have been checked");
        if (people == null) {
            return new ResultVO(200, null, "No user information was found", null);
        }
        return new ResultVO(200, "OK", null, people);

    }

}
