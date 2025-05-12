import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatbotService } from './services/chatbot.service';
import { Message } from './models/message.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  
  messages: Message[] = [];
  newMessage: string = '';
  isTyping: boolean = false;
  
  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    // Optional: Add a welcome message when the component initializes
    this.addBotMessage('Hi there! How can I help you today?');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (this.newMessage.trim() && !this.isTyping) {
      // Display the user's message immediately
      this.messages.push({ 
        sender: 'User', 
        content: this.newMessage, 
        timestamp: new Date() 
      });
      
      const userMessage = this.newMessage;
      this.newMessage = ''; // Clear input field immediately
      
      // Show typing indicator
      this.isTyping = true;
      
      // Add a slight delay to simulate typing
      setTimeout(() => {
        this.chatbotService.sendMessage(userMessage)
          .pipe(
            finalize(() => {
              this.isTyping = false;
            })
          )
          .subscribe(
            (response: any) => {
              const botResponse = response.response;
              this.addBotMessage(botResponse);
            },
            error => {
              console.error(error);
              this.addBotMessage('Sorry, I encountered an error. Please try again later.');
            }
          );
      }, 500); // 500ms delay to simulate typing start
    }
  }

  private addBotMessage(content: string): void {
    this.messages.push({ 
      sender: 'Bot', 
      content: content, 
      timestamp: new Date() 
    });
  }
}