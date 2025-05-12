import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot.component';
import { ChatbotService } from './services/chatbot.service';

@NgModule({
  declarations: [
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    ChatbotService
  ],
  exports: [
    ChatbotComponent
  ]
})
export class ChatbotModule { }
