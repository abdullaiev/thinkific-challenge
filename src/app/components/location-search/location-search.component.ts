import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { WeatherLocation } from 'src/app/data-models/weather-location';
import { GooglePlacesService } from 'src/app/services/google-places/google-places.service';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
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
      debounceTime(200),
      switchMap((citySearchQuery: string) => {
        if (citySearchQuery) {
          return this.googlePlacesService.getPlaces(citySearchQuery);
        }
        // Do not send a request if search query has been emptied.
        return of([]);
      })
    ).subscribe((predictions: AutocompletePrediction[]) => {
      this.predictions = predictions;
    });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectionOption = this.predictions.find((place: AutocompletePrediction) => {
      return event.option.value === place.description;
    });
    this.getGeoCoordinates(selectionOption);
  }

  getGeoCoordinates(prediction: AutocompletePrediction) {
    this.googlePlacesService.getWeatherLocation(prediction).subscribe((location: WeatherLocation) => {
      this.selectWeatherLocation.emit(location);
    }, () => {});
  }

  // Track places in autocomplete by their place_id for performance.
  trackByFunction(index: number, prediction: AutocompletePrediction) {
    return prediction ? prediction.place_id : null;
  }
}
