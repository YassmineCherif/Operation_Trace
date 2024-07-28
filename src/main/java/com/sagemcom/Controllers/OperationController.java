package com.sagemcom.Controllers;

import com.sagemcom.Services.NumSerieService;
import com.sagemcom.Services.UserService;
import com.sagemcom.Entities.Operation;
import com.sagemcom.Services.OperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/operations")
@CrossOrigin(origins = "http://localhost:4200")
public class OperationController {

    @Autowired
    private OperationService operationService;

    @Autowired
    private NumSerieService numSerieService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Operation> getAllOperations() {
        return operationService.getAllOperations();
    }

    @GetMapping("/{id}")
    public Operation getOperationById(@PathVariable Long id) {
        return operationService.getOperationById(id);
    }

    @PostMapping
    public Operation createOperation(@RequestBody Operation operation) {
        return operationService.createOperation(operation);
    }

    @PutMapping("/{id}")
    public Operation updateOperation(@PathVariable long id, @RequestBody Operation updatedOperation) {
        return operationService.updateOperation(updatedOperation, id);
    }

    @DeleteMapping("/{id}")
    public void deleteOperation(@PathVariable Long id) {
        operationService.deleteOperation(id);
    }

    @GetMapping("/numserie")
    public List<String> getNumSeries() {
        return numSerieService.getAllNumSeriesAsStrings();
    }

    @GetMapping("/user")
    public List<String> getUserLogins() {
        return userService.getAllUserLogins();
    }
}
