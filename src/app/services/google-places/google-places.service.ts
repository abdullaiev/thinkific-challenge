import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  cities = [
    {
      name: 'Vancouver'
    },
    {
      name: 'New York'
    },
    {
      name: 'Kyiv'
    }
  ];

  constructor() { }

  getPlaces(searchQuery: string) {
    return of(this.cities.filter((city) => {
      return city.name.toLowerCase().includes(searchQuery);
    }));
  }
}
