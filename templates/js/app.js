	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
    mapboxgl.accessToken = '';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/s102115825/cmfeq2x8q00a801so8plcaz2i',
        zoom: 13, // initial zoom level, 0 is the world view, higher values zoom in
        center: [145.122467, -38.141399], // center the map on this longitude and latitude
        attributionControl: false
    });

  let ctx = document.getElementById('chart-temp').getContext('2d');
  new Chart(ctx, {
    type: 'bar', // can be 'line', 'pie', 'doughnut', etc.
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Temperature (°C)',
        data: [10, 11, 12, 13, 14, 15],
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgb(255, 159, 64)'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

ctx = document.getElementById('chart-shore').getContext('2d');
  new Chart(ctx, {
    type: 'line', // can be 'line', 'pie', 'doughnut', etc.
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Change (%)',
        data: [10, 9, 8, 7, 6, 5],
        borderWidth: 1,
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgb(54, 162, 235)'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

ctx = document.getElementById('chart-erosion').getContext('2d');
  new Chart(ctx, {
    type: 'line', // can be 'line', 'pie', 'doughnut', etc.
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Rate',
        data: [10, 11, 12, 13, 14, 15],
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgb(255, 159, 64)'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  ctx = document.getElementById('chart-detail').getContext('2d');
  new Chart(ctx, {
    type: 'bar', // can be 'line', 'pie', 'doughnut', etc.
    data: {
      labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Temperature (°C)',
        data: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgb(255, 159, 64)'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });