package com.ft.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

/**
 * @author lee
 * @create 2021-07-11 9:07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class People {
    private int userId;

    private String username;

    private String email;

    private char userSex;

    private String avatar;

    private int startNation;

    private int startCity;

    private int  transfer1Nation;

    private int transfer1City;

    private int  transfer2Nation;

    private int transfer2City;

    private int  transfer3Nation;

    private int transfer3City;

    private int  transfer4Nation;

    private int transfer4City;

    private int destNation;

    private int destCity;

    private String perfVehicle;

    private String meg;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date startTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern ="yyyy-MM-dd HH:mm:ss")
    private Date endTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date userRegTime;

}
