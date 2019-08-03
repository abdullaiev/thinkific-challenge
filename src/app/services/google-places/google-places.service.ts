/// <reference types="@types/googlemaps" />

import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { WeatherLocation } from "src/app/models/weather-location";
import { ApiConfig } from "src/config/api.config";

import AutocompletePrediction = google.maps.places.AutocompletePrediction;

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  googleAutocomplete = new google.maps.places.AutocompleteService();

  constructor(private http: HttpClient) {
  }

  getPlaces(searchQuery: string): Observable<any> {
    let body = {
      input: searchQuery
    };

    let placesSubject = new Subject<AutocompletePrediction[]>();

    this.googleAutocomplete.getPlacePredictions(body, (predictions) => {
      placesSubject.next(predictions);
      placesSubject.complete();
    });

    return placesSubject.asObservable();
  }

  getWeatherLocation(place: AutocompletePrediction): Observable<WeatherLocation> {
    let url = GooglePlacesService.getUrl('geocode/json', {
      place_id: place.place_id
    });

    return this.http.get(url).pipe(
      map((response: any) => {
        if (!response || response.status !== 'OK') {
          throw new Error(`[GooglePlacesService] ERROR: geocode request failed for place_id ${place.place_id}`);
        }

        return response.results;
      }),
      map((results: any) => {
        let location = results && results[0];
        let geometry = location && location.geometry;

        if (!geometry) {
          throw new Error(`[GooglePlacesService] ERROR: geometry property is missing for place_id ${place.place_id}`);
        }

        return {
          lat: geometry.location.lat,
          lon: geometry.location.lng
        };
      }),
      map((coords) => {
        return {
          description: place.structured_formatting.main_text,
          secondaryDescription: place.structured_formatting.secondary_text,
          coords
        };
      }));
  }


  static getUrl(endpoint: string, params: Object) {
    let url = `${ApiConfig.GoogleMaps.API}${endpoint}?key=${ApiConfig.GoogleMaps.API_KEY}`;

    for (let key in params) {
      url += `&${key}=${params[key]}`;
    }

    return url;
  }
}
