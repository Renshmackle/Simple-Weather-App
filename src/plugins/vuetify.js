// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/lib/iconsets/mdi'; // Now using mdi

// Custom theme
const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2', // Blue
        secondary: '#424242', // Dark Grey
        accent: '#82B1FF', // Light Blue
        error: '#FF5252', // Red
        info: '#2196F3', // Info Blue
        success: '#4CAF50', // Green
        warning: '#FFC107', // Yellow
      },
    },
  },
  icons: {
    defaultSet: 'mdi', // Material Design Icons
    sets: {
      mdi, // Using mdi here
    },
  },
});

export default vuetify;
