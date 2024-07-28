
import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../../services/trace.service';
import { Trace } from '../../../models/trace';

@Component({
  selector: 'app-trace-affich',
  templateUrl: './trace-affich.component.html',
  styleUrl: './trace-affich.component.css'
})



export class TraceAffichComponent implements OnInit {
  traces: Trace[] = [];
  filteredTraces: Trace[] = [];
  searchTerm: string = '';

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    this.loadTraces();
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