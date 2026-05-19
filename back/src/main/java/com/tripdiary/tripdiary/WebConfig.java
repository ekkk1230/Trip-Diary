package com.tripdiary.tripdiary;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path currentRelativePath = Paths.get("").toAbsolutePath();
        String basePath = currentRelativePath.toString();

        String uploadPath = "";

        if (basePath.endsWith("back")) {
            uploadPath = basePath + File.separator + "uploads";
        } else {
            uploadPath = basePath + File.separator + "back" + File.separator + "uploads";
        }

//        System.out.println("====== [스프링 이미지 서빙 경로 수립] ======");
//        System.out.println("실제 물리 경로: " + uploadPath);
//        System.out.println("===========================================");

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath + File.separator);
    }
}