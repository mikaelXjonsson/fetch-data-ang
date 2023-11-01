import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any[] = [];
  showData = false;
  shipName = '';
  shipCapacity = '';

  constructor(private http: HttpClient) {}

  toggleData() {
    if (this.showData) {
      this.showData = false;
    } else {
      this.fetchData();
      this.showData = true;
    }
  }

  fetchData() {
  this.http.get<any[]>(`${environment.apiUrl}/api/ships/`)
    .subscribe(data => {
      this.data = data;
    });
  }

  addShip() {
    this.http.post(`${environment.apiUrl}/api/ships/`, {
      name: this.shipName,
      capacity: parseInt(this.shipCapacity, 10)
    }).subscribe(() => {
      this.shipName = '';
      this.shipCapacity = '';
      this.fetchData();
    });
  }

}
