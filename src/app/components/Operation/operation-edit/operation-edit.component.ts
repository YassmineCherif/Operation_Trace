import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from '../../../services/operation.service';
import { AuthService } from '../../../services/auth-service.service'; // Import AuthService
import { Operation } from '../../../models/Operation';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.css'],
})
export class OperationEditComponent implements OnInit {
  operation: Operation = {
    idoperation: 0,
    description: '',
    code: '',
    creerpar: ''
  };
  numSeries: string[] = [];
  users: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operationService: OperationService,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    this.operationService.getOperationById(id).subscribe({
      next: (data: Operation) => {
        this.operation = data;

        // Set 'creerpar' to the logged-in user's login
        this.authService.userLogin$.subscribe(login => {
          this.operation.creerpar = login || ''; // Default to an empty string if login is null
        });
      },
      error: (err) => this.errorMessage = err.error.message || 'An error occurred while fetching the operation.'
    });

    this.operationService.getNumSeries().subscribe({
      next: (data: string[]) => this.numSeries = data,
      error: (err) => this.errorMessage = err.message || 'An error occurred while fetching serial numbers.'
    });

    this.operationService.getUsers().subscribe({
      next: (data: string[]) => this.users = data,
      error: (err) => this.errorMessage = err.message || 'An error occurred while fetching users.'
    });
  }

  updateOperation(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.operationService.updateOperation(id, this.operation).subscribe({
      next: () => this.router.navigate(['/operation/all']),
      error: (err) => this.errorMessage = err.error.message || 'An error occurred while updating the operation. Please try again later.'
    });
  }
}
