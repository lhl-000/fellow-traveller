package com.ft.server.config;

import com.ft.server.interceptor.CheckTokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author lee
 * @create 2021-07-08 18:57
 */
@Configuration
public class interceptorConfig implements WebMvcConfigurer {

    @Autowired
    private CheckTokenInterceptor checkTokenInterceptor;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkTokenInterceptor)
                .addPathPatterns("/chat")
                .addPathPatterns("/match")
                .addPathPatterns("/user")
               .excludePathPatterns("/user/login")
                .excludePathPatterns("/user/register");
    }
}
