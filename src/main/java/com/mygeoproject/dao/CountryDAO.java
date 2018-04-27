/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygeoproject.dao;

import java.util.List;

import com.mygeoproject.model.Country;

public interface CountryDAO
{
    public void createCountry(Country country);
    
    public Country getCountryById(long id);
    public List<Country> getAllCountries();
    
    public void updateCountry(Country country);
    
    public void deleteCountry(long id);
}