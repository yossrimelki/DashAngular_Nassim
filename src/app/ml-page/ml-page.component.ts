import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ml-page',
  templateUrl: './ml-page.component.html',
  styleUrls: ['./ml-page.component.scss']
})
export class MlPageComponent implements OnInit {
  classResult: string = '';
  priceResult: string = '';
  clusterResult: string = '';
  forecastHtml: string = '';

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {}

  predictClass(form: NgForm): void {
    if (form.invalid) return;
    const formData = new FormData();
    formData.append('rest_quantity', form.value.rest_quantity);
    formData.append('Quantite', form.value.quantite);
    formData.append('Unit_Price', form.value.unit_price);
    formData.append('Manufacture_Date', form.value.manufacture_date);
    formData.append('Expiration_Date', form.value.expiration_date);

    this.http.post<any>('http://127.0.0.1:5000/predict_class', formData).subscribe(result => {
      this.classResult = result.Product_Classification
        ? `Predicted Class: ${result.Product_Classification}`
        : `Error: ${result.error}`;
    });
  }

  predictPrice(form: NgForm): void {
    if (form.invalid) return;
    const formData = new FormData();
    formData.append('Product_Name', form.value.product_name);
    formData.append('Quantite', form.value.quantite_price);
    formData.append('Material_Category', form.value.material_category);

    this.http.post<any>('http://127.0.0.1:5000/predict_price', formData).subscribe(result => {
      this.priceResult = result.Unit_Price_Prediction
        ? `Predicted Price: €${result.Unit_Price_Prediction}`
        : `Error: ${result.error}`;
    });
  }

  predictCluster(form: NgForm): void {
    if (form.invalid) return;
    this.http.post<any>(
      'http://127.0.0.1:5000/predict-cluster',
      {
        rest_quantity: form.value.rest_quantity_cluster,
        shelf_life: form.value.shelf_life,
        days_since_manufacture: form.value.days_since_manufacture
      }
    ).subscribe(result => {
      this.clusterResult = result.cluster
        ? `Predicted Cluster: ${result.cluster} (Label: ${result.label})`
        : `Error: ${result.error}`;
    });
  }

  fetchForecast(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/predict_forecast').subscribe(result => {
      let html = `<table border="1" cellpadding="8"><tr><th>Date</th><th>Prediction (€)</th><th>Lower</th><th>Upper</th></tr>`;
      result.forEach(row => {
        html += `<tr>
            <td>${row.ds}</td>
            <td>${parseFloat(row.yhat).toFixed(2)}</td>
            <td>${parseFloat(row.yhat_lower).toFixed(2)}</td>
            <td>${parseFloat(row.yhat_upper).toFixed(2)}</td>
          </tr>`;
      });
      html += `</table>`;
      this.forecastHtml = html;
    });
  }
}
