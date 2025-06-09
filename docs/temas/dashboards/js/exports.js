// Datos de exportaciones y contratos
const exportsData = {
    current: {
        labels: [
            'Total Exportaciones',
            'Exportaciones con Partida',
            'Exportaciones sin Partida',
            'Contratos Cobrados',
            'Pendiente de Pago',
            'Contratos de pronto pago despachados',
            'Contratos de pronto pago no despachados'
        ],
        values: [
            29331758.98,
            12712751.92,
            16619007.07,
            2557493.03,
            738565.49,
            2513158.79,
            6903534.61
        ]
    },
    previous: {
        values: [
            26107661.73,
            11334133.14,
            14773517.58,
            1922288.97,
            1373769.55,
            1906356.16,
            6131739.46
        ]
    }
};

// Función para formatear valores en quetzales
const formatCurrency = (value) => {
    return `Q${value.toLocaleString('es-GT', {minimumFractionDigits: 2})}`;
};

// Función para ordenar datos
function sortData(sortBy) {
    const data = exportsData.current.labels.map((label, index) => ({
        label,
        value: exportsData.current.values[index],
        previousValue: exportsData.previous.values[index]
    }));

    if (sortBy === 'value') {
        data.sort((a, b) => b.value - a.value);
    } else if (sortBy === 'name') {
        data.sort((a, b) => a.label.localeCompare(b.label));
    }

    return data;
}

// Configuración del gráfico de barras horizontales para exportaciones
const exportsBarChart = new Chart(document.getElementById('exportsBarChart'), {
    type: 'bar',
    data: {
        labels: exportsData.current.labels,
        datasets: [
            {
                label: 'Monto Actual',
                data: exportsData.current.values,
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgb(0, 123, 255)',
                borderWidth: 1
            },
            {
                label: 'Monto Anterior',
                data: exportsData.previous.values,
                backgroundColor: 'rgba(108, 117, 125, 0.7)',
                borderColor: 'rgb(108, 117, 125)',
                borderWidth: 1
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Exportaciones y Contratos por Monto',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return formatCurrency(value);
                    }
                }
            }
        }
    }
});

// Configuración del gráfico de líneas para diferencias
const exportsLineChart = new Chart(document.getElementById('exportsLineChart'), {
    type: 'line',
    data: {
        labels: exportsData.current.labels,
        datasets: [{
            label: 'Diferencia con Semana Anterior',
            data: exportsData.current.values.map((value, index) => 
                value - exportsData.previous.values[index]
            ),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Variación Semanal',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const prefix = value >= 0 ? '+' : '';
                        return `${prefix}${formatCurrency(value)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        return formatCurrency(value);
                    }
                }
            }
        }
    }
});

// Manejo de eventos para ordenamiento
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const sortBy = this.dataset.sort;
        const sortedData = sortData(sortBy);
        
        // Actualizar gráfico de barras
        exportsBarChart.data.labels = sortedData.map(item => item.label);
        exportsBarChart.data.datasets[0].data = sortedData.map(item => item.value);
        exportsBarChart.update();

        // Actualizar gráfico de líneas
        exportsLineChart.data.labels = sortedData.map(item => item.label);
        exportsLineChart.data.datasets[0].data = sortedData.map(item => 
            item.value - item.previousValue
        );
        exportsLineChart.update();

        // Actualizar estado de botones
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
}); 