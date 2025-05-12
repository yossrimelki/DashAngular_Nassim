import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-power-bi-display',
  templateUrl: './power-bi-display.component.html',
  styleUrls: ['./power-bi-display.component.css']
})
export class PowerBiDisplayComponent implements OnInit {
  role: string | null = null;
  reportUrl: SafeResourceUrl | null = null;
  title: string = '';

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.role = this.authService.currentUserValue?.role || null;
    let url = '';
    switch (this.role) {
      case 'production_manager':
        this.title = 'BECHX';
        url = 'https://app.powerbi.com/reportEmbed?reportId=b982b0d2-863e-4e3d-beae-518ae20eabcc&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730';
        break;
      case 'marketing_manager':
        this.title = 'Marketing_manager';
        url = 'https://app.powerbi.com/reportEmbed?reportId=a06ad2bb-a382-4bf9-aeb2-c25644fc566e&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730';
        break;
      case 'logistics_manager':
        this.title = 'logistic';
        url = 'https://app.powerbi.com/reportEmbed?reportId=035aa55b-a703-4163-a408-a181859a94fd&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730';
        break;
      default:
        return;
    }
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
