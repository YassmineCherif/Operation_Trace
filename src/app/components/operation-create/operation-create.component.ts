import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationService } from '../../services/operation.service';
import { AuthService } from '../../services/auth-service.service'; // Import AuthService
import { Operation } from '../../models/Operation';

@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.css'],
})
export class OperationCreateComponent implements OnInit {
  operation: Operation = {
    numeroserie: '',
    description: '',
    code: '',
    creerpar: ''
  };
  numSeries: string[] = [];
  users: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private operationService: OperationService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    // Fetch serial numbers and users
    this.operationService.getNumSeries().subscribe(data => {
      this.numSeries = data;
    });

    this.operationService.getUsers().subscribe(data => {
      this.users = data;
    });

    // Set 'creerpar' to the logged-in user's login
    this.authService.userLogin$.subscribe(login => {
      this.operation.creerpar = login || ''; // Default to an empty string if login is null
    });
  }

  createOperation(): void {
    this.operationService.createOperation(this.operation).subscribe({
      next: () => {
        this.router.navigate(['/operation/all']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred while creating the operation. Please try again later.';
      }
    });
  }
}
