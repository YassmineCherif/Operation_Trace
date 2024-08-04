package com.sagemcom.Repositories;

import com.sagemcom.Entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

    boolean existsByCode(String code);

    List<Operation> findByCode (String code);

}
