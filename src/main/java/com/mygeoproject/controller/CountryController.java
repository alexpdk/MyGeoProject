package com.mygeoproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mygeoproject.dao.CountryDAOImpl;
import com.mygeoproject.model.Country;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
@RequestMapping("/country")
public class CountryController
{
    @Autowired
    private CountryDAOImpl countryDAOImpl;
    
    /*** Creating a new Country ***/
    @RequestMapping(value="/create", method=RequestMethod.POST, 
            produces="application/json", consumes="application/json")
    public void createCountry(@RequestBody Country country)
    {
        countryDAOImpl.createCountry(country);
    }
    
    /*** Retrieve a single Country ***/
    @RequestMapping(value="/{id}",produces="application/json",
            method=RequestMethod.GET)
    public Country getCountryById(@PathVariable("id") long id)
    {
        Country country = countryDAOImpl.getCountryById(id);
        return country;
    }
    
    /*** Retrieve all Countries ***/
    @RequestMapping(value="/all",produces="application/json",
            method=RequestMethod.GET)
    public List getAllCountries()
    {
        List countryList = countryDAOImpl.getAllCountries();
        return countryList;
    }
    
    /*** Update a Country ***/
    @RequestMapping(value="/update", method=RequestMethod.POST, 
            produces="application/json", consumes="application/json")
    public void updateCountry(@RequestBody Country country)
    {
        countryDAOImpl.updateCountry(country);
    }
    
    /*** Delete a Country ***/
    @RequestMapping(value="/delete/{id}",method = RequestMethod.DELETE,
             produces="application/json")
    public void deleteCountry(@PathVariable("id") long id)
    {
        countryDAOImpl.deleteCountry(id);
    }
}