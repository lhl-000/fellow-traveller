package com.ft.server.service.impl;
import com.easemob.im.server.EMProperties;
import com.easemob.im.server.EMService;
import com.ft.server.service.HXIMService;

/**
 * @author lee
 * @create 2021-07-18 18:52
 */
public class HXIMServiceImpl implements HXIMService {
    private static String appKey = "1156210717083467#demo";
    private static String clientId = "YXA6LBdhWMMlTAWn4auHpgdOfA";
    private static String clientSecret = "YXA6yiQ6YU8MO80pkojMx1bFf6NINCk";


    public EMService service() {
        EMProperties properties = EMProperties.builder()
                .setAppkey(appKey)
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .build();

        EMService service = new EMService(properties);

        return service;
    }
}
