package com.ft.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author lee
 * @create 2021-07-10 19:39
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserComments {

    private int userId;

    private int commenterId;

    private int create_time;

    private String info;
}

