// Pie Chart
document.addEventListener('DOMContentLoaded', function(){
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                hoverOffset: 4
            }]   
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Pie Chart'
                }
            }
        }
    });
});


// Scatter Plot
document.addEventListener('DOMContentLoaded', function(){
    const ctx = document.getElementById('myScatterPlot').getContext('2d');
    const scatterPlot = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [{
                    x: -8,
                    y: 2.5
                }, {
                    x: -7,
                    y: 1
                }, {
                    x: -3,
                    y: -4
                }, {
                    x: -9,
                    y: -1.5
                }, {
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }, {
                    x: 0.5,
                    y: 5.5
                }, {
                    x: 0.3,
                    y: 5.1
                }, {
                    x: 0.1,
                    y: 0.5
                }, {
                    x: 2.5,
                    y: 4.5
                }]
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Scatter Plot'
                }
            }   
        }
    });
});


// Line Chart
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myLineChart').getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Dataset 1',
                data: [65, -59, 80, 81, -56, 55, -40, 30, -45, 50, 77, -20],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }, {
                label: 'Dataset 2',
                data: [28, 48, -40, 19, 86, 27, 90, 81, 72, 35, 46, 71],
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
        },
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Line Chart'
            }
        }
    }
});
});