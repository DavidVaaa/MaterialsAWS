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
  
  fetch("URL_DE_TU_FUNCION_LAMBDA", {
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
