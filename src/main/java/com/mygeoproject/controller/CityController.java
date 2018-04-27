package com.mygeoproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mygeoproject.dao.CityDAOImpl;
import com.mygeoproject.model.City;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
@RequestMapping("/city")
public class CityController
{
    @Autowired
    private CityDAOImpl cityDAOImpl;
    
    /*** Creating a new City ***/
    @RequestMapping(value="/create", method=RequestMethod.POST, 
            produces="application/json", consumes="application/json")
    public void createCity(@RequestBody City city)
    {
        cityDAOImpl.createCity(city);
    }
    
    /*** Retrieve a single City ***/
    @RequestMapping(value="/{id}",produces="application/json",
            method=RequestMethod.GET)
    public City getCityById(@PathVariable("id") long id)
    {
        City city = cityDAOImpl.getCityById(id);
        return city;
    }
    
    /*** Retrieve all Cities ***/
    @RequestMapping(value="/all",produces="application/json",
            method=RequestMethod.GET)
    public List getAllCities()
    {
        ArrayList<City> cityList = new ArrayList<>(cityDAOImpl.getAllCities());
        for(City city : cityList){
            city.fixCountryId();
        }
        return cityList;
    }
    
    /*** Update a City ***/
    @RequestMapping(value="/update", method=RequestMethod.POST, 
            produces="application/json", consumes="application/json")
    public void updateCity(@RequestBody City city)
    {
        cityDAOImpl.updateCity(city);
    }
    
    /*** Delete a City ***/
    @RequestMapping(value="/delete/{id}",method = RequestMethod.DELETE,
             produces="application/json")
    public void deleteCity(@PathVariable("id") long id)
    {
        cityDAOImpl.deleteCity(id);
    }
}