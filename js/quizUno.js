async function fetchData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/independent?status=true");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar datos de la API:", error);
        return [];
    }
}

async function fillSelect() {
    const data = await fetchData();
    const selectRegion = document.getElementById("selectRegion");

    data.forEach(country => {
        
            const option = document.createElement("option");
            option.textContent = country.region;
            selectRegion.appendChild(option);

        
    });
}

async function fillTable() {
    borarFilasTabla();
    const data = await fetchData();
    const tableBody = document.querySelector("#tablaPaises tbody");
    var selectRegion = document.getElementById("selectRegion");
    var datoRegionSeleccionado = selectRegion.value;

    data.forEach(country => {
        if (country.region == datoRegionSeleccionado) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${country.name.common}</td>
                <td>
                    <ul>
                        ${country.currencies ? Object.values(country.currencies).map(currency => `<li>${currency.name}</li>`).join("") : "N/A"}
                    </ul>
                </td>
                <td>
                    <ul>
                        <li><img src="${country.flags.svg}" alt="${country.name.common}" width="50"></li>
                    </ul> 
                </td>
                <td>${country.population}</td>
                <td>
                    <ul>
                        ${country.capital.map(capital => `<li>${capital}</li>`).join("")}
                    </ul>
                </td>
            `;
            
            tableBody.appendChild(row);
            console.log(country.name.common);
        }
        
    });

}

function borarFilasTabla() {

    var tabla = document.getElementById("tablaPaises");

    for (let i = tabla.rows.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }

}