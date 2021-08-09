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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
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

    private List<People> popular;

    @Override
    public ResultVO popularPeople() {
        if (popular == null) {
            popular = peopleDAO.queryPeopleRandom();
        }
//        List<People> result = peopleDAO.queryPeopleRandom();
//        return new ResultVO(200, "OK", null, result);
        return new ResultVO(200, "OK", null, popular);
    }

    @Scheduled(cron = "0 30 10 ? * *")
    public void cron() {
        popular = peopleDAO.queryPeopleRandom();
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
    }

    @Override
    public ResultVO matchPeople(int userId, int pageNum, int pageSize) {
        People people = peopleDAO.queryPeopleById(userId);
        logger.info(userId +  "---" + "Use match function");
//      PageHelper.startPage(PageNum,PageSize);
        List<People> fuzzyResult = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getStartCity(), people.getDestCity(),people.getStartTime(),people.getEndTime());
        if (people.getTransfer1City() != 30001 && people.getTransfer1City() != 0 && people.getTransfer1City() != people.getStartCity() && people.getTransfer1City() != people.getDestCity()) {
            List<People> fuzzyResult2 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getStartCity(),
                    people.getTransfer1City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult3 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer1City(),
                    people.getDestCity(),people.getStartTime(),people.getEndTime());
            if (fuzzyResult2 != null && fuzzyResult2.size() > 0) {
                fuzzyResult.addAll(fuzzyResult2);
            }
            if (fuzzyResult3 != null && fuzzyResult3.size() > 0) {
                fuzzyResult.addAll(fuzzyResult3);
            }
        }
        if (people.getTransfer2City() != 30001 && people.getTransfer1City() != 0 && people.getTransfer2City() != people.getTransfer1City()
                && people.getTransfer2City() != people.getStartCity()
                && people.getTransfer2City() != people.getDestCity()) {
            List<People> fuzzyResult4 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getStartCity(),
                    people.getTransfer2City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult5 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer2City(),
                    people.getDestCity(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult6 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer1City(),
                    people.getTransfer2City(),people.getStartTime(),people.getEndTime());
            if (fuzzyResult4 != null && fuzzyResult4.size() > 0) {
                fuzzyResult.addAll(fuzzyResult4);
            }
            if (fuzzyResult5 != null && fuzzyResult5.size() > 0) {
                fuzzyResult.addAll(fuzzyResult5);
            }
            if (fuzzyResult6 != null && fuzzyResult6.size() > 0) {
                fuzzyResult.addAll(fuzzyResult6);
            }
        }
        if (people.getTransfer3City() != 30001
                && people.getTransfer1City() != 0
                && people.getTransfer3City() != people.getTransfer1City()
                && people.getTransfer3City() != people.getTransfer2City()
                && people.getTransfer3City() != people.getStartCity()
                && people.getTransfer3City() != people.getDestCity()
        ) {
            List<People> fuzzyResult7 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getStartCity(),
                    people.getTransfer3City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult8 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer3City(),
                    people.getDestCity(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult9 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer1City(),
                    people.getTransfer3City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult10 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer2City(),
                    people.getTransfer3City(),people.getStartTime(),people.getEndTime());

            if (fuzzyResult7 != null && fuzzyResult7.size() > 0) {
                fuzzyResult.addAll(fuzzyResult7);
            }
            if (fuzzyResult8 != null && fuzzyResult8.size() > 0) {
                fuzzyResult.addAll(fuzzyResult8);
            }
            if (fuzzyResult9 != null && fuzzyResult9.size() > 0) {
                fuzzyResult.addAll(fuzzyResult9);
            }
            if (fuzzyResult10 != null && fuzzyResult10.size() > 0) {
                fuzzyResult.addAll(fuzzyResult10);
            }

        }
        if (people.getTransfer4City() != 30001
                && people.getTransfer1City() != 0
                && people.getTransfer4City() != people.getTransfer1City()
                && people.getTransfer4City() != people.getTransfer2City()
                && people.getTransfer4City() != people.getTransfer3City()
                && people.getTransfer4City() != people.getStartCity()
                && people.getTransfer4City() != people.getDestCity()
        ) {
            List<People> fuzzyResult11 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getStartCity(),
                    people.getTransfer4City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult12 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer4City(),
                    people.getDestCity(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult13 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer1City(),
                    people.getTransfer4City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult14 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer2City(),
                    people.getTransfer4City(),people.getStartTime(),people.getEndTime());
            List<People> fuzzyResult15 = peopleDAO.fuzzyMatchPeopleBySearchMeg(people.getUserId(),people.getTransfer3City(),
                    people.getTransfer4City(),people.getStartTime(),people.getEndTime());

            if (fuzzyResult11 != null && fuzzyResult11.size() > 0) {
                fuzzyResult.addAll(fuzzyResult11);
            }
            if (fuzzyResult12 != null && fuzzyResult12.size() > 0) {
                fuzzyResult.addAll(fuzzyResult12);
            }
            if (fuzzyResult13 != null && fuzzyResult13.size() > 0) {
                fuzzyResult.addAll(fuzzyResult13);
            }
            if (fuzzyResult14 != null && fuzzyResult14.size() > 0) {
                fuzzyResult.addAll(fuzzyResult14);
            }
            if (fuzzyResult15 != null && fuzzyResult15.size() > 0) {
                fuzzyResult.addAll(fuzzyResult15);
            }
        }
        fuzzyResult = new ArrayList<People>(new LinkedHashSet<>(fuzzyResult));
        if (fuzzyResult.size() > pageNum*pageSize) {
            return  new ResultVO(200, "OK", null, fuzzyResult.subList((pageNum-1)*pageSize, pageNum*pageSize));
        } else {
            return new ResultVO(200, "OK", null, fuzzyResult.subList((pageNum-1)*pageSize, fuzzyResult.size()));
        }
//        return  new ResultVO(200, "OK", null, fuzzyResult);
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
