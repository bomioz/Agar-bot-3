const regionURLs = {
  east1: 'wss://ws.east1.agar.io/',
  west1: 'wss://ws.west1.agar.io/',
  eu: 'wss://ws.eu.agar.io/'
};

const url = regionURLs[region] || 'wss://ws.east1.agar.io/';
