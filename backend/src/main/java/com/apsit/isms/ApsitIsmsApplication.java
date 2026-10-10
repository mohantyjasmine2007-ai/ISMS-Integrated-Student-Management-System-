package com.apsit.isms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ApsitIsmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApsitIsmsApplication.class, args);
        System.out.println("==================================================");
        System.out.println(" APSIT ISMS Backend API is Running on Port 8080 ");
        System.out.println(" Student Management System for SE IT Div B        ");
        System.out.println("==================================================");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
