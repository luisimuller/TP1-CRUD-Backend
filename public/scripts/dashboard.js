async function getClientes(){
    try {
        
        const response = await fetch("/clientes");
        
        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getEnvios(){
    try {
        
        const response = await fetch("envios/api");
        
        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getVehiculos(){
    try {
        
        const response = await fetch("/vehiculos");
        
        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

function cantVehiculosActivos() {
    getVehiculos().then( response => {
        const cant = response.filter(v => v.estado == 'Activo').length

        document.getElementById('cant-vehiculos').textContent = `${cant} Vehiculos`;
    })
}

function cantEnviosActivos() {
    getEnvios().then( response => {
        const cant = response.length

        document.getElementById('cant-envios').textContent = `${cant} Envios`;
    })
}

function numberClients(){
    getClientes().then(response => {
        document.getElementById('cant-clientes').textContent = `${response.length} Clientes`;
    });
}

function cargarDashboard(){
    cantEnviosActivos();
    numberClients();
    cantVehiculosActivos();
}

document.addEventListener('DOMContentLoaded', cargarDashboard);
