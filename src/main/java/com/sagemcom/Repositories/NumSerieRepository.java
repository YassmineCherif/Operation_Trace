package com.sagemcom.Repositories;

import com.sagemcom.Entities.NumSerie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NumSerieRepository extends JpaRepository<NumSerie, Long> {

    // Check if the numero de serie exists
    boolean existsByNumeroserie(String numeroserie);

    NumSerie findByNumeroserie(String numeroserie);
}
