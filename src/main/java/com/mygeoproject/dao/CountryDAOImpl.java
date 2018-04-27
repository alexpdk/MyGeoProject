package com.mygeoproject.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mygeoproject.model.Country;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class CountryDAOImpl implements CountryDAO
{

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public void createCountry(Country country)
    {
        entityManager.persist(country);
    }

    @Override
    public Country getCountryById(long id)
    {
        return entityManager.find(Country.class,id);
    }

    @Override
    public List<Country> getAllCountries()
    {
        return entityManager.createQuery("select c from Country c").getResultList();
    }

    @Override
    public void updateCountry(Country country)
    {
        entityManager.merge(country);
    }

    @Override
    public void deleteCountry(long id)
    {
        Country c = entityManager.find(Country.class,id);
        if(c != null){
            entityManager.remove(c);
        }
    }
}