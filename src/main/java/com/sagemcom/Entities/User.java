package com.sagemcom.Entities;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long iduser;

    String nom;
    String prenom;
    String email;
    String numtel;
    String login;
    String mdp;

    @Enumerated(EnumType.STRING)
    Roles role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Operation> operations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<NumSerie> numseries;
}