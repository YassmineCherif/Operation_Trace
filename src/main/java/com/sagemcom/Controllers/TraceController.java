package com.sagemcom.Controllers;

import com.sagemcom.Entities.Trace;
import com.sagemcom.Services.TraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/traces")
public class TraceController {

    @Autowired
    private TraceService traceService;

    @GetMapping
    public List<Trace> getAllTraces() {
        return traceService.getAllTraces();
    }

    /*
    @GetMapping("/{id}")
    public Trace getTraceById(@PathVariable long id) {
        return traceService.getTraceById(id);
    }

    @PostMapping
    public Trace createTrace(@RequestBody Trace trace) {
        return traceService.createTrace(trace);
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
