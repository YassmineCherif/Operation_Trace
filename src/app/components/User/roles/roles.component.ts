import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Roles, User } from '../../../models/User';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  roles = Object.values(Roles);
  selectedRole: Roles | null = null;
  Roles = Roles;  // Add this line

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data.map(user => ({
          ...user,
          role: user.role || Roles.DEFAULT // Set default role if undefined
        }));
        this.filteredUsers = this.users;
      },
      error => console.error('Error loading users', error)
    );
  }

  onRoleChange(user: User, newRole: Roles): void {
    user.role = newRole;
    this.userService.updateUser(user).subscribe(
      () => {
        console.log('User role updated');
      },
      error => console.error('Error updating user role', error)
    );
  }

  onFilterChange(): void {
    if (this.selectedRole) {
      this.filteredUsers = this.users.filter(user => user.role === this.selectedRole);
    } else {
      this.filteredUsers = this.users;
    }
  }
}
