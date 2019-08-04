export interface DailyForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  threeHourPartitions: ThreeHourForecast[];
  weather: WeatherCondition;
}

export interface ThreeHourForecast {
  dt_txt: string;
  time: string;
  main: {
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '3h': number;
  };
}

export interface WeatherCondition {
  description: string;
  icon: string;
}
