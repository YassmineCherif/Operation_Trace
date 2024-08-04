package com.sagemcom.Controllers;

import com.sagemcom.Entities.Trace;
import com.sagemcom.Services.NumSerieService;
import com.sagemcom.Services.OperationService;
import com.sagemcom.Services.TraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/traces")
public class TraceController {

    @Autowired
    private TraceService traceService;


    @Autowired
    private NumSerieService numSerieService;

    @Autowired
    private OperationService operationService;




    @GetMapping
    public List<Trace> getAllTraces() {
        return traceService.getAllTraces();
    }
    @PostMapping("/import")
    public ResponseEntity<Void> importTraces(@RequestBody List<Trace> traces) {
        for (Trace trace : traces) {
            String numserie = trace.getNumserie();
            String operationn = trace.getOperationn();

            // Check if a trace with the same operationn and numserie exists
            Trace existingTrace = traceService.findByOperationnAndNumserie(operationn, numserie);

            if (existingTrace != null) {
                // Update the existing trace with new data
                existingTrace.setDatecreation(trace.getDatecreation());
                existingTrace.setDatedebut(trace.getDatedebut());
                existingTrace.setDatefin(trace.getDatefin());
                existingTrace.setTracee(trace.getTracee());
                existingTrace.setCreerpar(trace.getCreerpar());

                traceService.save(existingTrace);
            } else {
                // Validate numserie and operationn
                boolean numSerieExists = numSerieService.existsByNumeroserie(numserie);
                boolean operationExists = operationService.existsByCode(operationn);

                // Logging for debugging purposes
                System.out.println("Validating trace data: numserie=" + numserie + ", operationn=" + operationn);
                System.out.println("numSerieExists: " + numSerieExists + ", operationExists: " + operationExists);

                if (numSerieExists && operationExists) {
                    // Create a new trace if validation passes
                    traceService.save(trace);
                } else {
                    // Handle invalid numserie or operationn
                    System.out.println("Invalid trace data: numserie or operationn not found.");
                }
            }
        }
        return ResponseEntity.ok().build();
    }


    /*
    @GetMapping("/{id}")
    public Trace getTraceById(@PathVariable long id) {
        return traceService.getTraceById(id);
    }

    @PutMapping("/{id}")
    public Trace updateTrace(@PathVariable long id, @RequestBody Trace traceDetails) {
        return traceService.updateTrace(id, traceDetails);
    }
*/
    @DeleteMapping("/{id}")
    public void deleteTrace(@PathVariable long id) {
        traceService.deleteTrace(id);
    }


}
