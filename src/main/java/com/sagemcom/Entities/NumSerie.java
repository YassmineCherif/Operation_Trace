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
public class NumSerie implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idnumserie;
    @Column(unique = true)
    String numeroserie;
    Date datecreation;
    String creerpar;

    @ManyToOne
    User user ;

    @ManyToMany(mappedBy = "numseries")
    private Set<Trace> traces;


}
