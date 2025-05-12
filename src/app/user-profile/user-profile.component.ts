import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { User } from '../auth/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;
  message: string = '';
  isLoading: boolean = false;
  profileImageFile: File = null;
  profileImagePreview: string | ArrayBuffer = '';

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUserProfile();
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      country: [''],
      postalCode: [''],
      aboutMe: [''],
      password: [''] // Optional field for password updates
    });
  }

  loadUserProfile() {
    this.isLoading = true;
    this.profileService.getProfile().subscribe(
      (data: User) => {
        this.user = data;
        this.profileForm.patchValue({
          username: this.user.username,
          email: this.user.email
        });
        
        if (this.user.profile_image) {
          this.profileImagePreview = `${this.user.profile_image}`;
        }
        
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.snackBar.open('Failed to load profile data', 'Close', {
          duration: 3000
        });
        console.error('Error loading profile:', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.profileImageFile = file;
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    const formData = {
      ...this.profileForm.value
    };
    
    // Only include password if provided
    if (!formData.password) {
      delete formData.password;
    }
    
    this.profileService.updateProfile(formData, this.profileImageFile).subscribe(
      response => {
        this.user = response.user;
        this.message = response.message;
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000
        });
        this.isLoading = false;
        
        // Reset password field
        this.profileForm.controls['password'].setValue('');
      },
      error => {
        this.isLoading = false;
        const errorMessage = error?.error?.message || 'Failed to update profile';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000
        });
        console.error('Error updating profile:', error);
      }
    );
  }
}
