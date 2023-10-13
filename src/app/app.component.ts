import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<any[]>('https://newmetsaapi.azurewebsites.net/api/ships/')
      .subscribe((data: any[]) => {
        this.data = data;
      });
  }

  addShip() {
    this.http.post('https://newmetsaapi.azurewebsites.net/api/ships/', {
      name: this.shipName,
      capacity: parseInt(this.shipCapacity, 10)
    }).subscribe(() => {
      this.fetchData();
      this.shipName = '';
      this.shipCapacity = '';
    });
  }
}
