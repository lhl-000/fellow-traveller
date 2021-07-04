package com.ft.server.entity;

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

    private Date startTime;

    private Date endTime;

    private String perfVehicle;

    private String meg;

    private Date userRegTime;

    private Date userModeTime;
}