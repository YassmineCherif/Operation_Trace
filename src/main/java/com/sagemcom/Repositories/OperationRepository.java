package com.sagemcom.Repositories;

import com.sagemcom.Entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
    // Method to find operations by their associated numserie
    List<Operation> findByNumeroserie(String numeroserie);

}
