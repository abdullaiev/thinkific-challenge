import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material";
import { of } from "rxjs";

import { debounceTime, filter, flatMap } from "rxjs/operators";
import { WeatherLocation } from "src/app/models/weather-location";

import { GooglePlacesService } from "src/app/services/google-places/google-places.service";
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})

export class LocationSearchComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, {static: false}) autoComplete;
  @ViewChild('placeInput', {static: false}) input;
  @Output() selectWeatherLocation = new EventEmitter<WeatherLocation>();
  placeControl = new FormControl();
  predictions: AutocompletePrediction[] = [];

  constructor(private googlePlacesService: GooglePlacesService) {
  }

  ngOnInit() {
    this.subscribeToInputChanges();
  }

  subscribeToInputChanges() {
    this.placeControl.valueChanges.pipe(
      debounceTime(100),
      filter((searchQuery: string) => {
        return !(this.predictions.length && this.predictions[0].description === searchQuery);
      }),
      flatMap((citySearchQuery: string) => {
        if (citySearchQuery) {
          return this.googlePlacesService.getPlaces(citySearchQuery);
        }

        return of([]);
      })
    ).subscribe((predictions: AutocompletePrediction[]) => {
      this.predictions = predictions || [];
    });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    let selectionOption = this.predictions.find((place: AutocompletePrediction) => {
      return event.option.value === place.description;
    });
    this.selectPlace(selectionOption);
  }

  selectPlace(prediction: AutocompletePrediction) {
    this.googlePlacesService.getWeatherLocation(prediction).subscribe((location: WeatherLocation) => {
      this.selectWeatherLocation.emit(location);
    });
  }

  trackByFunction(index: number, prediction: AutocompletePrediction) {
    return prediction ? prediction.place_id : null;
  }
}
