package com.ft.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

/**
 * @author lee
 * @create 2021-07-12 16:40
 */
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SearchMeg {

    private String peopleName;

    private int startNation;

    private int startCity;

    private int destNation;

    private int destCity;

    private int pageSize;

    private int pageNum;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date startTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern ="yyyy-MM-dd HH:mm:ss")
    private Date endTime;
}
