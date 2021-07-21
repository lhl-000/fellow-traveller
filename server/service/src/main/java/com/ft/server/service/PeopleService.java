package com.ft.server.service;
import com.ft.server.entity.SearchMeg;
import com.ft.server.vo.ResultVO;

/**
 * @author lee
 * @create 2021-07-11 10:01
 */
public interface PeopleService  {

    public ResultVO popularPeople();

    public ResultVO searchPeople(SearchMeg searchMeg);

    public ResultVO matchPeople(int userId, int pageNum, int pageSize);

    public ResultVO getDetail(int userId);

}