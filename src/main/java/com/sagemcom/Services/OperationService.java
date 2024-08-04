package com.sagemcom.Services;

import com.sagemcom.Controllers.OperationController;
import com.sagemcom.Entities.NumSerie;
import com.sagemcom.Entities.Operation;
import com.sagemcom.Repositories.NumSerieRepository;
import com.sagemcom.Repositories.OperationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Date;
import java.util.List;

@Service
public class OperationService {

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private NumSerieRepository numSerieRepository;

    // Add a logger to the class
    private static final Logger logger = LoggerFactory.getLogger(OperationService.class);


    public List<Operation> getAllOperations() {

        return operationRepository.findAll();
    }


    public Operation getOperationById(long id) {
        return operationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Operation with id " + id + " not found."));
    }



    public Operation createOperation(Operation operation) {
        // Check if an operation with the same code already exists
        List<Operation> existingOperations = operationRepository.findByCode(operation.getCode());
        if (!existingOperations.isEmpty()) {
            throw new RuntimeException("Operation already exists");
        }
        // Set the creation date to the current date
        operation.setDatecreation(new Date());
        return operationRepository.save(operation);
    }






    public Operation updateOperation(Operation updatedOperation, long id) {
        Operation existingOperation = operationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Operation not found"));

        // Update only the non-null fields
        if (updatedOperation.getDescription() != null) {
            existingOperation.setDescription(updatedOperation.getDescription());
        }
        if (updatedOperation.getCode() != null) {
            existingOperation.setCode(updatedOperation.getCode());
        }
        if (updatedOperation.getDatecreation() != null) {
            existingOperation.setDatecreation(updatedOperation.getDatecreation());
        }
        if (updatedOperation.getCreerpar() != null) {
            existingOperation.setCreerpar(updatedOperation.getCreerpar());
        }

        return operationRepository.save(existingOperation);
    }

    public void deleteOperation(Long id) {
        if (operationRepository.existsById(id)) {
            operationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Operation not found with id " + id);
        }
    }


    public boolean existsByCode(String code) {
        return operationRepository.existsByCode(code);
    }
}
