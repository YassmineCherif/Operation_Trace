package com.sagemcom.Services;

import com.sagemcom.Entities.Trace;
import com.sagemcom.Repositories.TraceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class TraceService {

    @Autowired
    private TraceRepository traceRepository;

    private static final Logger logger = LoggerFactory.getLogger(TraceService.class);

    public List<Trace> getAllTraces() {
        return traceRepository.findAll();
    }

    public Trace getTraceById(long id) {
        return traceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trace with id " + id + " not found."));
    }
/*
    public Trace createTrace(Trace trace) {
        return traceRepository.save(trace);
    }

    public Trace updateTrace(long id, Trace traceDetails) {
        Trace trace = getTraceById(id);
        trace.setDatecreation(traceDetails.getDatecreation());
        trace.setCreerpar(traceDetails.getCreerpar());
        trace.setDatedebut(traceDetails.getDatedebut());
        trace.setDatefin(traceDetails.getDatefin());
        trace.setNumserie(traceDetails.getNumserie());
        trace.setOperation(traceDetails.getOperation());
        trace.setUser(traceDetails.getUser());
        return traceRepository.save(trace);
    }
 */
    public void deleteTrace(long id) {
        Trace trace = getTraceById(id);
        traceRepository.delete(trace);
    }




}
