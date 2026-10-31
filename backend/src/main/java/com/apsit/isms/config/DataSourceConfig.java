package com.apsit.isms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.io.File;
import java.net.InetSocketAddress;
import java.net.Socket;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:jdbc:mysql://localhost:3306/apsit_isms}")
    private String mysqlUrl;

    @Value("${spring.datasource.username:root}")
    private String mysqlUsername;

    @Value("${spring.datasource.password:root}")
    private String mysqlPassword;

    private static String activeDbType = "Initializing";

    public static String getActiveDbType() {
        return activeDbType;
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        // 1. Probe for live MySQL instance at localhost:3306
        if (isPortOpen("localhost", 3306, 800)) {
            try {
                System.out.println("============================================================");
                System.out.println(" [DATABASE] Detected active MySQL Server on localhost:3306 ");
                System.out.println("============================================================");

                DataSource mysqlDs = DataSourceBuilder.create()
                        .driverClassName("com.mysql.cj.jdbc.Driver")
                        .url("jdbc:mysql://localhost:3306/apsit_isms?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true")
                        .username(mysqlUsername)
                        .password(mysqlPassword)
                        .build();

                // Test connection
                try (var conn = mysqlDs.getConnection()) {
                    activeDbType = "MySQL 8.0 (localhost:3306)";
                    System.out.println(" [DATABASE SUCCESS] Connected to MySQL: apsit_isms");
                    return mysqlDs;
                }
            } catch (Exception e) {
                System.out.println(" [DATABASE NOTICE] MySQL connect/auth failed: " + e.getMessage());
                System.out.println(" [DATABASE] Seamlessly activating embedded database engine...");
            }
        }

        // 2. Embedded Database fallback with persistent disk storage
        File dbDir = new File("./backend/data");
        if (!dbDir.exists()) {
            dbDir.mkdirs();
        }

        activeDbType = "Embedded H2 Database (MySQL Compatibility Mode)";
        System.out.println("============================================================");
        System.out.println(" [DATABASE] Active Engine: " + activeDbType);
        System.out.println(" [DATABASE] Data Store: ./backend/data/apsit_isms.mv.db");
        System.out.println(" [DATABASE] Web Console: http://localhost:8080/h2-console");
        System.out.println("============================================================");

        return DataSourceBuilder.create()
                .driverClassName("org.h2.Driver")
                .url("jdbc:h2:file:./backend/data/apsit_isms;MODE=MySQL;DATABASE_TO_LOWER=TRUE;AUTO_SERVER=TRUE;DB_CLOSE_DELAY=-1")
                .username("sa")
                .password("")
                .build();
    }

    private boolean isPortOpen(String host, int port, int timeoutMs) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(host, port), timeoutMs);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
