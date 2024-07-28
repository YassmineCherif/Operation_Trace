import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationService } from '../../services/operation.service';
import { Operation } from '../../models/Operation';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-affich.component.html',
  styleUrls: ['./operation-affich.component.css'],
})
export class OperationListComponent implements OnInit {
  operations: Operation[] = [];
  filteredOperations: Operation[] = [];
  searchTerm: string = '';

  constructor(
    private operationService: OperationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.operationService.getOperations().subscribe(data => {
      this.operations = data;
      this.filteredOperations = data;
    });
  }

  deleteOperation(id: number | undefined): void {
    if (id !== undefined) {
      this.operationService.deleteOperation(id).subscribe(() => {
        this.operations = this.operations.filter(op => op.idoperation !== id);
        this.filterOperations(); // Re-filtrer les opérations après suppression
      });
    }
  }

  filterOperations(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredOperations = this.operations.filter(operation =>
      operation.numeroserie.toLowerCase().includes(searchTermLower) ||
      operation.description.toLowerCase().includes(searchTermLower) ||
      operation.creerpar.toLowerCase().includes(searchTermLower)
    );
  }
}
