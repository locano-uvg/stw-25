// Datos de ventas semanales
const chartTypes = ['bar', 'doughnut', 'line', 'pie', 'polarArea', 'radar', 'scatter'];
const salesData = {
    semanas: ['S24', 'S25', 'S26'],
    ventas: [66448.47, 70901.18, 75353.89],
    contenedores: [161.9, 171.88, 181.86],
    margenes: [8.0, 8.0, 8.0],
    totales: [1936412.42, 2381669.02, 2826925.62],
    margenes_pendientes: [88063.33, 386068.65, 681324.27]
};



// CREAR FILTRO DE SEMANAS
const dropdown = document.getElementById('sales-dropdown');
const optionAll = document.createElement('option');
optionAll.value = 'all';
optionAll.textContent = 'Todas las semanas';
dropdown.appendChild(optionAll);
salesData.semanas.forEach(week => {
    const option = document.createElement('option');
    option.value = week;
    option.textContent = week;
    dropdown.appendChild(option);
});


// // AGREGA UN DROPDOWN PARA SELECCIONAR LAS SEMANAS
dropdown.addEventListener('change', (e) => {
    const selectedWeek = e.target.value;
    console.log(selectedWeek);
    if (selectedWeek === 'all') {
        salesChart.data.labels = salesData.semanas;
        salesChart.data.datasets[0].data = salesData.ventas;
        salesChart.update();

        containersChart.data.labels = salesData.semanas;
        containersChart.data.datasets[0].data = salesData.contenedores;
        containersChart.update();

        marginChart.data.labels = salesData.semanas;
        marginChart.data.datasets[0].data = salesData.margenes;
        marginChart.update();

        document.getElementById('total-sales').textContent = '$' + salesData.totales.reduce((acc, curr) => acc + curr, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 });
        document.getElementById('margin-realized').textContent = salesData.margenes.reduce((acc, curr) => acc + curr, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 }) + '%';
        document.getElementById('margin-pending').textContent = '$' + salesData.margenes_pendientes.reduce((acc, curr) => acc + curr, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 });
    } else {
        salesChart.data.labels = [selectedWeek];
        let weekIndex = salesData.semanas.indexOf(selectedWeek);
        salesChart.data.datasets[0].data = [salesData.ventas[weekIndex]];
        salesChart.update();



        containersChart.data.labels = [selectedWeek];
        containersChart.data.datasets[0].data = [salesData.contenedores[weekIndex]];
        containersChart.update();

        marginChart.data.labels = [selectedWeek];
        marginChart.data.datasets[0].data = [salesData.margenes[weekIndex]];
        marginChart.update();

        document.getElementById('total-sales').textContent = '$' + salesData.totales[weekIndex].toLocaleString('es-MX', { minimumFractionDigits: 2 });
        document.getElementById('margin-realized').textContent = salesData.margenes[weekIndex].toLocaleString('es-MX', { minimumFractionDigits: 2 }) + '%';
        document.getElementById('margin-pending').textContent = '$' + salesData.margenes_pendientes[weekIndex].toLocaleString('es-MX', { minimumFractionDigits: 2 });



    }
});


// Configuración del gráfico de barras de ventas
const salesChart = new Chart(document.getElementById('salesChart'), {
    type: 'bar',
    data: {
        labels: salesData.semanas,
        datasets: [{
            label: 'Ventas Semanales',
            data: salesData.ventas,
            backgroundColor: [
                'rgba(40, 167, 69, 0.7)',
                'rgba(40, 167, 69, 0.7)'
            ],
            borderColor: [
                'rgb(40, 167, 69)',
                'rgb(40, 167, 69)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Comparativa de Ventas Semanales',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Ventas: $${context.raw.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '$' + value.toLocaleString('es-MX');
                    }
                }
            }
        }
    }
});

// Configuración del gráfico de donut para márgenes
const marginChart = new Chart(document.getElementById('marginChart'), {
    type: 'doughnut',
    data: {
        labels: ['Margen Realizado', 'Margen por Realizar'],
        datasets: [{
            data: [
                salesData.totales[1] * (salesData.margenes[1] / 100),
                salesData.margenes_pendientes[1]
            ],
            backgroundColor: [
                'rgba(40, 167, 69, 0.7)',
                'rgba(220, 53, 69, 0.7)'
            ],
            borderColor: [
                'rgb(40, 167, 69)',
                'rgb(220, 53, 69)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Distribución de Márgenes S25',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return `${context.label}: $${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
                    }
                }
            }
        }
    }
});

const containersChart = new Chart(document.getElementById('containersChart'), {
    type: 'line',
    data: {
        labels: salesData.semanas,
        datasets: [{
            label: 'Contenedores Semanales',
            data: salesData.contenedores,
            backgroundColor: [
                'rgba(40, 167, 69, 0.7)',
                'rgba(220, 53, 69, 0.7)'
            ],
            borderColor: [
                'rgb(40, 167, 69)',
                'rgb(220, 53, 69)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Comparativa de Contenedores Semanales',
                font: {
                    size: 16
                }
            }
        }
    }
});

// start
salesChart.data.labels = salesData.semanas;
salesChart.data.datasets[0].data = salesData.ventas;
salesChart.update();

containersChart.data.labels = salesData.semanas;
containersChart.data.datasets[0].data = salesData.contenedores;
containersChart.update();

marginChart.data.labels = salesData.semanas;
marginChart.data.datasets[0].data = salesData.margenes;
marginChart.update();

document.getElementById('total-sales').textContent = '$' + salesData.totales.reduce((acc, curr) => acc + curr, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 });
document.getElementById('margin-realized').textContent = salesData.margenes.reduce((acc, curr) => acc + curr, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 }) + '%';
document.getElementById('margin-pending').textContent = '$' + salesData.margenes_pendientes.reduce((acc, curr) => acc + curr, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 });

