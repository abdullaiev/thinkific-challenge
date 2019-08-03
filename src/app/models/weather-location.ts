export interface WeatherLocation {
  description: string;
  secondaryDescription: string;
  coords: {
    lat: number;
    lon: number;
  }
}
