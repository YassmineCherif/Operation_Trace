import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NumSerieService } from '../../services/numserie.service';
import { NumSerie } from '../../models/numSerie';

@Component({
  selector: 'app-numserie-create',
  templateUrl: './numserie-create.component.html',
  styleUrls: ['./numserie-create.component.css'],
})
export class NumSerieCreateComponent implements OnInit {
  numSerie: NumSerie = {
    numeroserie: '',
    creerpar: ''
  };
  users: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private numSerieService: NumSerieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.numSerieService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  createNumSerie(): void {
    this.numSerieService.createNumSerie(this.numSerie).subscribe({
      next: () => {
        this.router.navigate(['/numserie/all']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'the serial number already exists.';
      }
    });
  }
}
