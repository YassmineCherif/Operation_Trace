import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.css']
})
export class FrontNavbarComponent implements OnInit {
  userRole: string | null = null;
  userLogin: string | null = null;
  selectedLink: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedLink(event.urlAfterRedirects);
      }
    });

    // Subscribe to user role and login
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
    this.authService.userLogin$.subscribe(login => {
      this.userLogin = login;
    });
  }

  // Update the selected link based on the route
  updateSelectedLink(url: string): void {
    if (url.includes('/trace/all')) {
      this.selectedLink = 'Traces';
    } else if (url.includes('/home')) {
      this.selectedLink = 'Home';
    } else if (url.includes('/operation/all')) {
      this.selectedLink = 'Operations';
    } else if (url.includes('/numserie/all')) {
      this.selectedLink = 'Serial Numbers';
    } else if (url.includes('/operation/create')) {
      this.selectedLink = 'Create Operation';
    } else if (url.includes('/operation/edit')) {
      this.selectedLink = 'Edit Operation';
    } else if (url.includes('/numserie/create')) {
      this.selectedLink = 'Create Serial Number';
    } else if (url.includes('/numserie/edit')) {
      this.selectedLink = 'Edit Serial Number';
    } else {
      this.selectedLink = '';
    }
  }

  setSelectedLink(linkName: string) {
    this.selectedLink = linkName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
