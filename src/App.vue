<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-4 weather-gradient" dark>
            <v-card-title class="text-center">
              <v-icon left>mdi-weather-partly-cloudy</v-icon>
              <h2>Weather App</h2>
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="city"
                label="Enter city"
                @keyup.enter="fetchWeather"
                color="light-blue lighten-3"
                prepend-icon="mdi-city"
                class="mt-4"
              ></v-text-field>

              <!-- Button Row -->
              <v-row>
                <v-col cols="6">
                  <v-btn color="light-blue lighten-3" @click="fetchWeather" block dark>
                    <v-icon left>mdi-cloud-search</v-icon>
                    Get Weather
                  </v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn color="red lighten-2" @click="clearWeatherList" block dark>
                    <v-icon left>mdi-close-circle</v-icon>
                    Clear Cities
                  </v-btn>
                </v-col>
              </v-row>

              <v-alert v-if="error" type="error" icon="mdi-alert-circle">
                {{ error }}
              </v-alert>

              <!-- Weather Cards for Multiple Cities -->
              <v-row v-if="weatherList.length" class="mt-4">
                <v-col
                  v-for="weather in weatherList"
                  :key="weather.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card
                    color="blue darken-2"
                    dark
                    class="weather-card"
                  >
                    <v-card-title class="text-h5">{{ weather.name }}</v-card-title>
                    <v-card-subtitle>
                      <v-icon left>mdi-weather-cloudy</v-icon>
                      {{ weather.weather[0].description }}
                    </v-card-subtitle>
                    <v-card-text>
                      <p>
                        <v-icon left>mdi-thermometer</v-icon>
                        <strong>Temperature:</strong> {{ weather.main.temp }} °C
                      </p>
                      <p>
                        <v-icon left>mdi-gauge</v-icon>
                        <strong>Pressure:</strong> {{ weather.main.pressure }} hPa
                      </p>
                      <p>
                        <v-icon left>mdi-water-percent</v-icon>
                        <strong>Humidity:</strong> {{ weather.main.humidity }}%
                      </p>
                      <p>
                        <v-icon left>mdi-weather-windy</v-icon>
                        <strong>Wind Speed:</strong> {{ weather.wind.speed }} m/s
                      </p>
                      <p>
                        <v-icon left>mdi-weather-sunset-up</v-icon>
                        <strong>Sunrise:</strong> {{ formatTime(weather.sys.sunrise) }}
                      </p>
                      <p>
                        <v-icon left>mdi-weather-sunset-down</v-icon>
                        <strong>Sunset:</strong> {{ formatTime(weather.sys.sunset) }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      weatherList: [], // To store weather data for multiple cities
      error: ''
    };
  },
  methods: {
    async fetchWeather() {
      if (this.city.trim() === '') {
        this.error = 'Please enter a city name.';
        return;
      }

      try {
        const apiKey = 'c5e804feccee41bf54ed486501555a76'; // Replace with your OpenWeatherMap API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod === 200) {
          this.weatherList.push(data); // Add the weather data to the list
          this.error = '';
          this.city = ''; // Clear the input field
        } else {
          this.error = 'City not found.';
        }
      } catch (error) {
        this.error = 'Unable to fetch weather data.';
      }
    },
    clearWeatherList() {
      this.weatherList = []; // Clear the weather list
    },
    formatTime(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);
      return date.toLocaleTimeString();
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f4f8;
}

h2{
  color: rgba(255, 255, 255, 0.721);
}
.weather-gradient {
  background: linear-gradient(135deg, #1e88e5, #0d47a1);
}
.v-card-title {
  text-align: center;
  font-size: 2rem !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.weather-card {
  height: 400px;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-light.png');
  transition: transform 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
}

.weather-card .v-card-title {
  font-size: 1.5rem !important;
}

.weather-card .v-card-subtitle,
.weather-card .v-card-text {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.weather-card .v-card-text p {
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .weather-card {
    height: auto;
  }
}
</style>