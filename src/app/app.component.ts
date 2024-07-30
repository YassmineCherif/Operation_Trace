import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      if (role === 'Default') {
        // Redirect to home if user role is Default
        this.router.navigate(['/home']);
      } else if (role === 'Admin' || role === 'Visiteur' || role === 'Testeur') {
        // Redirect to a default page based on the role if needed
        this.router.navigate(['/home']);
      }
    });
  }
}
