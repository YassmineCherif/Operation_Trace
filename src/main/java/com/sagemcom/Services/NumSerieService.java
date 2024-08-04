package com.sagemcom.Services;

import com.sagemcom.Entities.NumSerie;
import com.sagemcom.Repositories.NumSerieRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NumSerieService {

    @Autowired
    private NumSerieRepository numSerieRepository;

    public List<NumSerie> getAllNumSeries() {
        return numSerieRepository.findAll();
    }

    public List<String> getAllNumSeriesAsStrings() {
        return getAllNumSeries().stream()
                .map(NumSerie::getNumeroserie)
                .collect(Collectors.toList());
    }

    public NumSerie getNumSerieById(long id) {
        return numSerieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NumSerie with id " + id + " not found."));
    }

    public NumSerie createNumSerie(NumSerie numSerie) {
        if (numSerieRepository.existsByNumeroserie(numSerie.getNumeroserie())) {
            throw new RuntimeException("NumSerie already exists");
        }
        numSerie.setDatecreation(new Date()); // Set current date
        return numSerieRepository.save(numSerie);
    }

    public NumSerie updateNumSerie(NumSerie updatedNumSerie, long id) {
        NumSerie existingNumSerie = numSerieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NumSerie not found"));

        // Update only the non-null fields
        if (updatedNumSerie.getNumeroserie() != null) {
            existingNumSerie.setNumeroserie(updatedNumSerie.getNumeroserie());
        }
        if (updatedNumSerie.getCreerpar() != null) {
            existingNumSerie.setCreerpar(updatedNumSerie.getCreerpar());
        }

        // Set datecreation to the current date
        existingNumSerie.setDatecreation(new Date());

        return numSerieRepository.save(existingNumSerie);
    }


    public void deleteNumSerie(Long id) {
        if (numSerieRepository.existsById(id)) {
            numSerieRepository.deleteById(id);
        } else {
            throw new RuntimeException("NumSerie not found with id " + id);
        }
    }

    public boolean existsByNumeroserie(String numeroserie) {
        return numSerieRepository.existsByNumeroserie(numeroserie);
    }


}
