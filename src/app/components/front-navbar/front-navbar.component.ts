import { Component } from '@angular/core';

@Component({
  selector: 'app-front-navbar',
 templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.css'
})
export class FrontNavbarComponent {
  selectedLink: string = '';

  setSelectedLink(linkName: string) {
    this.selectedLink = linkName;
  }
}
