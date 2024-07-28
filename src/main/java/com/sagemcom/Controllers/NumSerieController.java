package com.sagemcom.Controllers;

import com.sagemcom.Entities.NumSerie;
import com.sagemcom.Services.NumSerieService;
import com.sagemcom.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/numseries")
public class NumSerieController {

    @Autowired
    private UserService userService;

    @Autowired
    private NumSerieService numSerieService;

    @GetMapping
    public List<NumSerie> getAllNumSeries() {
        return numSerieService.getAllNumSeries();
    }

    @GetMapping("/ids")
    public List<String> getNumSeries() {
        return numSerieService.getAllNumSeries().stream()
                .map(NumSerie::getNumeroserie)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public NumSerie getNumSerieById(@PathVariable Long id) {
        return numSerieService.getNumSerieById(id);
    }

    @PostMapping
    public NumSerie createNumSerie(@RequestBody NumSerie numSerie) {
        return numSerieService.createNumSerie(numSerie);
    }

    @PutMapping("/{id}")
    public NumSerie updateNumSerie(@PathVariable long id, @RequestBody NumSerie updatedNumSerie) {
        return numSerieService.updateNumSerie(updatedNumSerie, id);
    }




    @DeleteMapping("/{id}")
    public void deleteNumSerie(@PathVariable Long id) {
        numSerieService.deleteNumSerie(id);
    }


    @GetMapping("/user")
    public List<String> getUserLogins() {
        return userService.getAllUserLogins(); // Ensure this method exists in UserService
    }
}
