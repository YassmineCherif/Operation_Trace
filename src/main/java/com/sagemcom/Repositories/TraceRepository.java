package com.sagemcom.Repositories;

import com.sagemcom.Entities.Trace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TraceRepository extends JpaRepository<Trace, Long> {
}
