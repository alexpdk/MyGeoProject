/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygeoproject.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="countries")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "Country")
public class Country implements Serializable
{
    private static final long serialVersionUID = -1232395859408322328L;

    @Id
    @Column(name="id")
    private long id;
    
    @Column(name="name")
    private String name;
    
    @Column(name="capital")
    private String capital;
    
    @Column(name="population")
    private long population;
    
    @Column(name="GDP")
    private float GDP;

    public Country()
    {
        super();
    }
    public Country(long id, String name, String capital, long population, float GDP)
    {
        super();
        this.id = id;
        this.name = name;
        this.capital = capital;
        this.population = population;
        this.GDP = GDP;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulation(long population) {
        this.population = population;
    }

    public float getGDP() {
        return GDP;
    }

    public void setGDP(float GDP) {
        this.GDP = GDP;
    }

    @Override
    public String toString() {
        return "Country{" + "id=" + id + ", name=" + name + ", capital=" + capital + ", population=" + population + ", GDP=" + GDP + '}';
    }
    
}