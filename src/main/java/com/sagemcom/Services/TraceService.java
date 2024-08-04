package com.sagemcom.Services;


import com.sagemcom.Entities.Trace;
import com.sagemcom.Repositories.TraceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TraceService {

    @Autowired
    private TraceRepository traceRepository;

    public List<Trace> getAllTraces() {
        return traceRepository.findAll();
    }

    public Trace getTraceById(long id) {
        return traceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trace with id " + id + " not found."));
    }

    public void saveAll(List<Trace> traces) {
        traceRepository.saveAll(traces);
    }

    public Trace save(Trace trace) {
        return traceRepository.save(trace);
    }

    public Trace findByOperationnAndNumserie(String operationn, String numserie) {
        return traceRepository.findByOperationnAndNumserie(operationn, numserie);
    }

    public void deleteTrace(long id) {
        Trace trace = getTraceById(id);
        traceRepository.delete(trace);
    }
}
