package com.ft.server.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value = "responded vo object", description = "interface pass data to front end")
public class ResultVO {

    @ApiModelProperty(value = "status code", dataType = "int")
    private int code;

    @ApiModelProperty(value = "responded message", dataType = "string")
    private String msg;

    @ApiModelProperty(value = "responded err message", dataType = "string")
    private String errMsg;

    @ApiModelProperty(value = "responded data")
    private Object data;
}
