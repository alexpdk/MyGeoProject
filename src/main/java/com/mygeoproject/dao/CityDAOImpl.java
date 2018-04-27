package com.mygeoproject.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mygeoproject.model.City;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class CityDAOImpl implements CityDAO
{

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public void createCity(City city)
    {
        entityManager.persist(city);
    }

    @Override
    public City getCityById(long id)
    {
        return entityManager.find(City.class,id);
    }

    @Override
    public List<City> getAllCities()
    {
        return entityManager.createQuery("select c from City c").getResultList();
    }

    @Override
    public void updateCity(City city)
    {
        entityManager.merge(city);
    }

    @Override
    public void deleteCity(long id)
    {
        City c = entityManager.find(City.class,id);
        if(c != null){
            entityManager.remove(c);
        }
    }
}