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
public class Operation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idoperation;
    String description;
    String code ;
    Date datecreation;
    String creerpar;

    @ManyToOne
    User user;

    @OneToMany(mappedBy = "operation")
    private Set<Trace> traces;

}
