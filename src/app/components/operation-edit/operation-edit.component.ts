import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from '../../services/operation.service';
import { Operation } from '../../models/Operation';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.css'],
})
export class OperationEditComponent implements OnInit {
  operation: Operation = {
    idoperation: 0,  
    numeroserie: '',
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
    private operationService: OperationService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Non-null assertion operator
    this.operationService.getOperationById(id).subscribe((data: Operation) => {
      this.operation = data;
    });

    this.operationService.getNumSeries().subscribe(data => {
      this.numSeries = data;
    });

    this.operationService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  updateOperation(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.operationService.updateOperation(id, this.operation).subscribe({
      next: () => {
        this.router.navigate(['/operation/all']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred while updating the operation. Please try again later.';
      }
    });
  }
}
