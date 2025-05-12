import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { User } from '../auth/models/user.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loading = true;
    // First get current user profile
    this.profileService.getProfile().subscribe(
      (user) => {
        this.currentUser = user;
        this.fetchUsersByRole();
      },
      (error) => {
        this.loading = false;
        this.error = 'Failed to load your profile information. Please try again later.';
        console.error('Error fetching current user profile', error);
      }
    );
  }

  fetchUsersByRole() {
    if (!this.currentUser || !this.currentUser.role) {
      this.loading = false;
      this.error = 'Unable to determine your role. Please try logging in again.';
      return;
    }

    this.profileService.getUsersByRole(this.currentUser.role).subscribe(
      (response) => {
        this.users = response.users || [];
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.error = 'Error fetching users with your role. Please try again later.';
        console.error('Error fetching users by role', error);
      }
    );
  }
}