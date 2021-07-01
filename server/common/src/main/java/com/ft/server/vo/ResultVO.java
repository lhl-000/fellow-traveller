package com.ft.server.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author lee
 * @create 2021-07-01 14:43
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultVO {

    private int code;

    private String msg;

    private Object data;
}
