import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, CategoryScale, BarElement, BarController, LineController, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
import { TraceService } from '../../../services/trace.service'; 
import { Trace } from '../../../models/trace';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  traces: Trace[] = [];
  chart: any;
  pieChart: any;
  dateLabels: string[] = [];
  seriesData: number[] = [];
  operationsData: { labels: string[], data: number[], backgroundColor: string[], borderColor: string[] } = {
    labels: [],
    data: [],
    backgroundColor: [],
    borderColor: []
  };

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    Chart.register(
      LinearScale, 
      CategoryScale, 
      BarElement, 
      BarController, 
      LineController, 
      PointElement, 
      LineElement, 
      Title, 
      Tooltip, 
      Legend,
      PieController,
      ArcElement
    );
    this.fetchData();
  }

  fetchData(): void {
    this.traceService.getTraces().subscribe(
      (data: Trace[]) => {
        this.traces = data.map(trace => ({
          ...trace,
          datedebut: new Date(trace.datedebut),
          datefin: new Date(trace.datefin)
        }));

        this.processDates();
        this.processOperations(); // Process operations data
        this.generateBarChart();
        this.generatePieChart(); // Generate the pie chart after data is processed
      },
      (error) => {
        console.error('Error fetching trace data:', error);
      }
    );
  }

  processDates(): void {
    const dateMap: { [key: string]: number } = {};

    this.traces.forEach(trace => {
      let currentDate = new Date(trace.datedebut);
      while (currentDate <= trace.datefin) {
        const dateString = this.formatDate(currentDate);
        if (!dateMap[dateString]) {
          dateMap[dateString] = 0;
        }
        dateMap[dateString] += 1;
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    this.dateLabels = Object.keys(dateMap);
    this.seriesData = this.dateLabels.map(date => dateMap[date]);
  }

  generateSoftColor(index: number): string {
    // Soft pastel colors with high lightness and lower saturation
    const hue = Math.floor((index * 137.5) % 360); // 137.5 is a prime number for good color spread
    return `hsl(${hue}, 50%, 80%)`; // Lightness is high for pastel effect
  }

  processOperations(): void {
    const operationMap: { [key: string]: { [key: string]: number } } = {};
    const numserieColors: { [key: string]: string } = {};
    
    this.traces.forEach(trace => {
      if (trace.operationn && trace.numserie) {
        if (!operationMap[trace.numserie]) {
          operationMap[trace.numserie] = {};
          // Generate a unique soft color for this numserie
          const color = this.generateSoftColor(Object.keys(operationMap).length);
          numserieColors[trace.numserie] = color;
        }
        const operationLabel = trace.operationn;
        operationMap[trace.numserie][operationLabel] = (operationMap[trace.numserie][operationLabel] || 0) + 1;
      }
    });

    this.operationsData = {
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: []
    };

    Object.keys(operationMap).forEach(numserie => {
      Object.keys(operationMap[numserie]).forEach(operationLabel => {
        this.operationsData.labels.push(`${numserie} - ${operationLabel}`);
        this.operationsData.data.push(operationMap[numserie][operationLabel]);
        const color = numserieColors[numserie];
        this.operationsData.backgroundColor.push(color);
        this.operationsData.borderColor.push(color.replace('80%)', '100%)')); // Slightly darker border color
      });
    });
  }
  
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  generateBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.dateLabels,
          datasets: [
            {
              label: 'Number of Series',
              data: this.seriesData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Dates'
              }
            },
            y: {
              beginAtZero: true,
              max: 10,
              title: {
                display: true,
                text: 'Number of Series'
              },
              ticks: {
                stepSize: 2
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context.');
    }
  }

  generatePieChart(): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.operationsData.labels,
          datasets: [
            {
              label: 'Operations',
              data: this.operationsData.data,
              backgroundColor: this.operationsData.backgroundColor,
              borderColor: this.operationsData.borderColor,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                generateLabels: function(chart) {
                  const dataset = chart.data.datasets[0];
                  const labels = chart.data.labels as string[];
                  const backgroundColor = dataset.backgroundColor as string[];

                  if (!Array.isArray(backgroundColor)) {
                    return [];
                  }

                  // Collect unique numserie colors
                  const numserieColors: { [key: string]: string } = {};
                  labels.forEach((label, index) => {
                    const color = backgroundColor[index];
                    const numserie = label.split(' - ')[0]; // Extract numserie part
                    if (!numserieColors[numserie]) {
                      numserieColors[numserie] = color;
                    }
                  });

                  return Object.keys(numserieColors).map(numserie => ({
                    text: `${numserie}`,
                    fillStyle: numserieColors[numserie],
                    strokeStyle: numserieColors[numserie],
                    lineWidth: 1
                  }));
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw} occurrences`;
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context.');
    }
  }
}
