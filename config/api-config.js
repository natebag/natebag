// BagOS API Configuration
// Keep all your API keys, endpoints, and configurations organized here

const BagOSConfig = {
  // API Endpoints
  apis: {
    // Example APIs you might use
    solana: {
      endpoint: 'https://api.mainnet-beta.solana.com',
      // apiKey: 'your-solana-api-key-here' // Add when needed
    },
    
    coingecko: {
      endpoint: 'https://api.coingecko.com/api/v3',
      // Free tier - no key needed for basic calls
    },
    
    twitter: {
      endpoint: 'https://api.twitter.com/2',
      // bearerToken: 'your-twitter-bearer-token-here' // Add when needed
    },
    
    // Add more APIs as needed
    github: {
      endpoint: 'https://api.github.com',
      // token: 'your-github-token-here' // Add when needed
    }
  },

  // App Settings
  settings: {
    refreshInterval: 30000, // 30 seconds
    maxRetries: 3,
    timeout: 10000, // 10 seconds
    
    // Theme settings
    defaultTheme: 'theme-xp',
    availableThemes: ['theme-xp', 'theme-95', 'theme-seven', 'theme-cube', 'theme-portal', 'theme-zombies'],
    
    // Music player settings
    musicVolume: 0.7,
    autoplay: true,
    shuffle: false,
  },

  // Local Storage Keys
  storage: {
    theme: 'bagos-theme',
    volume: 'bagos-volume',
    notes: 'bagos-notes',
    playlist: 'bagos-playlist'
  },

  // Feature Flags
  features: {
    enableBootSequence: true,
    enableMiniPlayer: true,
    enableKonamiCode: true,
    enableSystemHum: false, // Disabled since we removed it
    enableContextMenu: true,
    enableDragDrop: true
  },

  // External Resources
  resources: {
    fonts: [
      'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap'
    ],
    
    // Add CDN resources if needed
    libraries: {
      // ruffle: 'https://unpkg.com/@ruffle-rs/ruffle' // For Flash games
    }
  },

  // Development vs Production
  environment: {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    debugMode: false, // Set to true for console logging
    version: '0.113'
  }
};

// Utility functions for API calls
const BagOSAPI = {
  // Generic fetch wrapper
  async fetchData(url, options = {}) {
    const config = {
      timeout: BagOSConfig.settings.timeout,
      ...options
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (BagOSConfig.environment.debugMode) {
        console.error('API fetch error:', error);
      }
      throw error;
    }
  },

  // Example: Get SOL price
  async getSolPrice() {
    try {
      const data = await this.fetchData(
        `${BagOSConfig.apis.coingecko.endpoint}/simple/price?ids=solana&vs_currencies=usd`
      );
      return data.solana.usd;
    } catch (error) {
      console.error('Failed to fetch SOL price:', error);
      return null;
    }
  },

  // Add more API methods as needed
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.BagOSConfig = BagOSConfig;
  window.BagOSAPI = BagOSAPI;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BagOSConfig, BagOSAPI };
}