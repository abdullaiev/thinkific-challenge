import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs";
import { debounceTime, flatMap, startWith } from "rxjs/operators";

import { GooglePlacesService } from "src/app/services/google-places/google-places.service";

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})

export class LocationSearchComponent implements OnInit {
  cityControl = new FormControl();
  foundCities: Observable<any>;
  readonly DEBOUNCE_TIMEOUT = 100;

  constructor(private googlePlacesService: GooglePlacesService) {
  }

  ngOnInit() {
    this.foundCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      debounceTime(this.DEBOUNCE_TIMEOUT),
      flatMap((citySearchQuery: string) => {
        return this.googlePlacesService.getPlaces(citySearchQuery);
      })
    );
  }

  selectCity(city: string) {
    console.log(city);
  }
}
