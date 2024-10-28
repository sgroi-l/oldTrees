const axios = require('axios');

const createDummyTrees = async () => {
  const trees = [
    { Name: 'Oak', Species: 'Quercus', Age: 100, Latitude: 51.5074, Longitude: -0.1278 },
    { Name: 'Maple', Species: 'Acer', Age: 50, Latitude: 51.5154, Longitude: -0.1414 },
    { Name: 'Pine', Species: 'Pinus', Age: 70, Latitude: 51.5274, Longitude: -0.1478 },
  ];

  for (const tree of trees) {
    try {
      const response = await axios.post('http://localhost:1337/api/treess', {
        data: tree
      });
      console.log(`Created tree: ${response.data.data.id}`);
    } catch (error) {
      console.error('Error creating tree:', error);
    }
  }
};

createDummyTrees();
