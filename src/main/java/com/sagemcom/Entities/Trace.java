package com.sagemcom.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Trace implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idtrace;
    Date datecreation;
    String creerpar;
    Date datedebut;
    Date datefin;
    String tracee ;
    String numserie;
    String operationn;


    @ManyToMany
    private Set<NumSerie> numseries;

    // Association with Operation
    @ManyToOne
    Operation operation;

}
