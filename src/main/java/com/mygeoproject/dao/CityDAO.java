/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygeoproject.dao;

import java.util.List;

import com.mygeoproject.model.City;

public interface CityDAO
{
    public void createCity(City city);
    
    public City getCityById(long id);
    public List<City> getAllCities();
    
    public void updateCity(City city);
    
    public void deleteCity(long id);
}