document.getElementById("rangeForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var minE = document.getElementById("minE").value;
  var maxE = document.getElementById("maxE").value;
  var minRo = document.getElementById("minRo").value;
  var maxRo = document.getElementById("maxRo").value;
  
  var request = {
    "E": [minE, maxE],
    "Ro": [minRo, maxRo]
  };
  
  fetch("https://62so2ogeudyhhrhpupzcw7ai6i0ftsku.lambda-url.us-east-1.on.aws/", {
    method: "POST",
    body: JSON.stringify(request)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    displayResults(data);
  })
  .catch(function(error) {
    console.log("Error:", error);
  });
});

function displayResults(data) {
  var materialList = document.getElementById("materialList");
  materialList.innerHTML = ""; // Limpiar la lista de materiales anteriores
  
  if (data.statusCode === 200) {
    var materials = JSON.parse(data.body);
    
    if (materials.length > 0) {
      materials.forEach(function(material) {
        var materialItem = document.createElement("div");
        materialItem.textContent = material.Material;
        materialList.appendChild(materialItem);
      });
      
      document.getElementById("resultSection").style.display = "block";
    } else {
      materialList.textContent = "No se encontraron materiales que cumplan con los rangos especificados.";
      document.getElementById("resultSection").style.display = "block";
    }
  } else {
    materialList.textContent = "Error al obtener los materiales.";
    document.getElementById("resultSection").style.display = "block";
  }
}

// Código JavaScript para generar los gráficos

// Función para cargar los datos del archivo CSV
function cargarDatosCSV(url) {
  return fetch(url)
    .then(response => response.text())
    .then(data => Papa.parse(data, { header: true }).data);
}

// Función para generar el histograma
function generarHistograma(idCanvas, datos, titulo) {
  const valores = datos.map(dato => parseFloat(dato.Value));

  const ctx = document.getElementById(idCanvas).getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datos.map(dato => dato.Bin),
      datasets: [{
        label: titulo,
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
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
}

// Función para generar el gráfico de líneas
function generarGraficoLineas(idCanvas, datos, titulo) {
  const valores = datos.map(dato => parseInt(dato.Value));

  const ctx = document.getElementById(idCanvas).getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: datos.map(dato => dato.Date),
      datasets: [{
        label: titulo,
        data: valores,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true
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
}

// Cargar los datos y generar los gráficos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  cargarDatosCSV('Distribución_de_E_1684697647701.csv')
    .then(datos => generarHistograma('histogramaEChart', datos, 'Distribución de E'));

  cargarDatosCSV('Distribución_de_Ro_1684697722157.csv')
    .then(datos => generarHistograma('histogramaRoChart', datos, 'Distribución de Ro'));

  cargarDatosCSV('Número_de_registros__1684697774089.csv')
    .then(datos => generarGraficoLineas('graficoLineasChart', datos, 'Número de Registros'));
});
