import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../../services/trace.service';
import { Trace } from '../../../models/trace';

@Component({
  selector: 'app-trace-affich',
  templateUrl: './trace-affich.component.html',
  styleUrls: ['./trace-affich.component.css']
})
export class TraceAffichComponent implements OnInit {
  traces: Trace[] = [];
  filteredTraces: Trace[] = [];
  searchTerm: string = '';
  userRole: string | null = null;

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    this.loadTraces();
    this.userRole = localStorage.getItem('userRole');
  }

  loadTraces(): void {
    this.traceService.getTraces().subscribe(
      (data) => {
        this.traces = data;
        this.filteredTraces = data;
      },
      (error) => {
        console.error('Error fetching traces', error);
      }
    );
  }

  filterTraces(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTraces = this.traces.filter(trace =>
      trace.numserie.toLowerCase().includes(term) ||
      trace.operation.toLowerCase().includes(term) ||
      trace.creerpar.toLowerCase().includes(term)
    );
  }

  deleteTrace(id: number): void {
    if (this.userRole === 'Admin') {
      this.traceService.deleteTrace(id).subscribe(
        () => {
          this.loadTraces();
        },
        (error) => {
          console.error('Error deleting trace', error);
        }
      );
    }
  }

  // Function to determine if the 'Create trace' button should be enabled
  canCreateTrace(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Visiteur';
  }

  // Function to determine if the 'Edit' button should be enabled
  canEditTrace(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Visiteur';
  }

  // Function to determine if the 'Delete' button should be enabled
  canDeleteTrace(): boolean {
    return this.userRole === 'Admin';
  }
}
