// Datos de posiciones futuras
const futuresData = {
    contracts: [
        {
            symbol: 'K',
            long: 55.156,
            short: -85.58,
            net: -30.424,
            pending: 23.02,
            fnd: '2025-04-22'
        },
        {
            symbol: 'N',
            long: 0,
            short: 0,
            net: -2.1,
            pending: 14.23,
            fnd: '2025-05-20'
        },
        {
            symbol: 'U',
            long: 0,
            short: 0,
            net: 1.1,
            pending: 10.72,
            fnd: '2025-06-17'
        }
    ]
};

// Función para formatear fechas
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-GT', { month: 'numeric', day: 'numeric', year: 'numeric' });
};

// Configuración del gráfico de cascada para posiciones futuras
const futuresWaterfallChart = new Chart(document.getElementById('futuresWaterfallChart'), {
    type: 'bar',
    data: {
        labels: futuresData.contracts.map(c => `${c.symbol} (FND: ${formatDate(c.fnd)})`),
        datasets: [{
            label: 'Posición Neta',
            data: futuresData.contracts.map(c => c.net),
            backgroundColor: futuresData.contracts.map(c => {
                if (c.net === 0) return 'rgba(255, 193, 7, 0.7)'; // Amarillo para net = 0
                if (Math.abs(c.net) > 20) return 'rgba(220, 53, 69, 0.7)'; // Rojo para valores críticos
                return c.net > 0 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)';
            }),
            borderColor: futuresData.contracts.map(c => {
                if (c.net === 0) return 'rgb(255, 193, 7)';
                if (Math.abs(c.net) > 20) return 'rgb(220, 53, 69)';
                return c.net > 0 ? 'rgb(40, 167, 69)' : 'rgb(220, 53, 69)';
            }),
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Posiciones Netas por Contrato',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const contract = futuresData.contracts[context.dataIndex];
                        return [
                            `Net: ${contract.net.toFixed(3)}`,
                            `Long: ${contract.long.toFixed(3)}`,
                            `Short: ${contract.short.toFixed(3)}`,
                            `Pendiente: ${contract.pending.toFixed(2)}`
                        ];
                    }
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Posición (MT)'
                }
            }
        }
    }
});

// Configuración del gráfico de burbujas para pendientes
const futuresBubbleChart = new Chart(document.getElementById('futuresBubbleChart'), {
    type: 'bubble',
    data: {
        datasets: futuresData.contracts.map(contract => ({
            label: `Contrato ${contract.symbol}`,
            data: [{
                x: new Date(contract.fnd),
                y: contract.pending,
                r: Math.abs(contract.net) * 2
            }],
            backgroundColor: contract.net === 0 ? 'rgba(255, 193, 7, 0.7)' :
                           Math.abs(contract.net) > 20 ? 'rgba(220, 53, 69, 0.7)' :
                           contract.net > 0 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
            borderColor: contract.net === 0 ? 'rgb(255, 193, 7)' :
                        Math.abs(contract.net) > 20 ? 'rgb(220, 53, 69)' :
                        contract.net > 0 ? 'rgb(40, 167, 69)' : 'rgb(220, 53, 69)'
        }))
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Pendientes por Fijar vs FND',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const contract = futuresData.contracts[context.datasetIndex];
                        return [
                            `Contrato: ${contract.symbol}`,
                            `FND: ${formatDate(contract.fnd)}`,
                            `Pendiente: ${contract.pending.toFixed(2)} MT`,
                            `Net: ${contract.net.toFixed(3)} MT`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM yyyy'
                    }
                },
                title: {
                    display: true,
                    text: 'Fecha FND'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Pendiente por Fijar (MT)'
                }
            }
        }
    }
}); 