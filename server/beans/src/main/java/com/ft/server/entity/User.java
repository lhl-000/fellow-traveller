package com.ft.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

/**
 * @author lee
 * @create 2021-07-01 10:43
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "user object", description = "information")
public class User {

    @ApiModelProperty(dataType = "int",value = "id", required = true)
    private int userId;

    @ApiModelProperty(dataType = "string",value = "username", required = true)
    private String username;

    @ApiModelProperty(dataType = "string",value = "password", required = true)
    private String password;

    private String email;

    private char userSex;

    private String avatar;

    private int startNation;

    private int startCity;

    private int destNation;

    private int destCity;

    private int  transfer1Nation;

    private int transfer1City;

    private int  transfer2Nation;

    private int transfer2City;

    private int  transfer3Nation;

    private int transfer3City;

    private int  transfer4Nation;

    private int transfer4City;

    private int qq;

    private String perfVehicle;

    private String meg;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date startTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern ="yyyy-MM-dd HH:mm:ss")
    private Date endTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date userRegTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date userModeTime;

}