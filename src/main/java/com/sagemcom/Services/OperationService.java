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
        try {
            // Log the incoming operation
            logger.debug("Incoming operation: {}", operation);

            // Check if the numeroserie exists
            NumSerie existingNumSerie = numSerieRepository.findByNumeroserie(operation.getNumeroserie());
            logger.debug("NumSerie found: {}", existingNumSerie);

            if (existingNumSerie != null) {
                // NumSerie exists, retrieve all operations for this serial number
                List<Operation> existingOperations = operationRepository.findByNumeroserie(existingNumSerie.getNumeroserie());
                logger.debug("Existing operations found: {}", existingOperations);

                // Check for an operation with the same description
                for (Operation existingOperation : existingOperations) {
                    if (existingOperation.getDescription().equals(operation.getDescription())) {
                        // If the operation is the same, overwrite the content
                        existingOperation.setCode(operation.getCode());
                        existingOperation.setCreerpar(operation.getCreerpar());
                        existingOperation.setDatecreation(new Date());

                        logger.info("Updating existing operation: {}", existingOperation);
                        return operationRepository.save(existingOperation);
                    }
                }

                // If no operation with the same description is found, create a new operation
                operation.setDatecreation(new Date());
                logger.info("Creating new operation for existing NumSerie: {}", operation);
                return operationRepository.save(operation);
            } else {
                // NumSerie does not exist, create a new NumSerie
                NumSerie newNumSerie = new NumSerie();
                newNumSerie.setNumeroserie(operation.getNumeroserie());
                newNumSerie.setCreerpar(operation.getCreerpar());
                newNumSerie.setDatecreation(new Date());

                logger.info("Creating new NumSerie: {}", newNumSerie);
                numSerieRepository.save(newNumSerie);

                // Create a new Operation
                operation.setDatecreation(new Date());
                logger.info("Creating new operation: {}", operation);
                return operationRepository.save(operation);
            }
        } catch (Exception e) {
            logger.error("Error creating operation: {}", e.getMessage(), e);
            throw new RuntimeException("Error creating operation", e);
        }
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
}
