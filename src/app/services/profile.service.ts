import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, ProfileUpdateResponse } from '../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get current user profile
   */
  getProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/api/profile`, { headers });
  }

  /**
   * Get users with the same role as the logged-in user
   */
  getUsersByCurrentUserRole(): Observable<any> {
    // First get the current user's profile to determine their role
    return this.getProfile().pipe(
      switchMap(user => {
        // Then use that role to fetch users with the same role
        return this.getUsersByRole(user.role);
      })
    );
  }

  /**
   * Get users by specific role
   */
  getUsersByRole(role: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/api/profile/users/by-role/${role}`, { headers });
  }

  /**
   * Update user profile
   */
  updateProfile(userData: any, imageFile?: File): Observable<ProfileUpdateResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // If we have file data, use FormData for multipart/form-data
    if (imageFile) {
      const formData = new FormData();
      
      // Add all user data to form
      Object.keys(userData).forEach(key => {
        if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      });
      
      // Add the profile image
      formData.append('profile_image', imageFile);
      
      return this.http.put<ProfileUpdateResponse>(
        `${this.apiUrl}/api/profile`, 
        formData,
        { headers }
      );
    } else {
      // No file to upload, just send JSON data
      return this.http.put<ProfileUpdateResponse>(
        `${this.apiUrl}/api/profile`, 
        userData,
        { headers }
      );
    }
  }
}