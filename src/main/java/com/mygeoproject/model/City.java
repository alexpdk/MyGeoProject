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
@Table(name="cities")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "City")
public class City implements Serializable
{
    private static final long serialVersionUID = -1232395859408322328L;

    @Id
    @Column(name="id")
    private long id;
    
    @Column(name="name")
    private String name;
    
    @Column(name="countryId")
    private Long countryId;
    
    @Column(name="population")
    private long population;
    
    @Column(name="mayor")
    private String mayor;

    public City()
    {
        super();
    }
    public City(long id, String name, Long countryId, long population, String mayor)
    {
        super();
        this.id = id;
        this.name = name;
        this.countryId = countryId;
        this.population = population;
        this.mayor = mayor;
    }

    @Override
    public String toString() {
        return "City{" + "id=" + id + ", name=" + name + ", countryId=" + countryId + ", population=" + population + ", mayor=" + mayor + '}';
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

    public long getCountryId() {
        return countryId;
    }
    public void fixCountryId(){
        if(this.countryId == null){
            this.countryId = 0l;
        }
    }
    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulation(long population) {
        this.population = population;
    }

    public String getMayor() {
        return mayor;
    }

    public void setMayor(String mayor) {
        this.mayor = mayor;
    }
}