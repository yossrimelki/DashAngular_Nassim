import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}/api/chatbot/chat`, { message });
  }
}
