package com.ft.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author lee
 * @create 2021-07-10 18:34
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginHistory {

    private Integer id;

    private String area;

    private String nation;

    private String userId;

    private String ip;

    private String loginTime;

}
