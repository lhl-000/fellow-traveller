//package com.ft.server.service;
//import com.easemob.im.server.EMProperties;
//import com.easemob.im.server.EMService;
//import com.ft.server.imcliProperties.IMCliProperties;
//import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.context.annotation.PropertySources;
//
///**
// * @author lee
// * @create 2021-07-18 18:51
// */
//@Configuration
//@PropertySources({
//        @PropertySource(value = "file:${user.home}/.easemob/config.properties")
//})
//@EnableConfigurationProperties({IMCliProperties.class})
//public class IMCliConfiguration {
//
//    @Bean
//    public EMService service(IMCliProperties cliProperties) {
//        EMProperties properties = EMProperties.builder()
//                .setAppkey(cliProperties.getAppkey())
//                .setClientId(cliProperties.getClientId())
//                .setClientSecret(cliProperties.getClientSecret())
//                .build();
//
//        EMService service = new EMService(properties);
//
//        return service;
//    }
//}
