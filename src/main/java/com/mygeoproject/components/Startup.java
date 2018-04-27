/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygeoproject.components;


import java.sql.Connection;
import java.sql.SQLException;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

@Component
public class Startup {

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void runNativeSql() {
        ClassPathResource resource = new ClassPathResource("initdb.sql");
        try(Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, resource);
        }
        catch(SQLException e){
            System.err.println(e.getMessage());
        }
    }
}