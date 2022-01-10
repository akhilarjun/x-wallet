Chart.defaults.plugins.legend.display = false;
let chartColors = ['#F3D5C0', '#FFADAD', '#79B4B7', '#FFB319', '#3490DE', '#F8485E', '#595260', '#C9D6DF', '#BE9FE1'];
let toPropercase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

$Router.config([
    { path: 'home', templateUrl: 'web/partial/home.html' },
    { path: 'studies', templateUrl: 'web/partial/details.html' },
    { path: 'savings', templateUrl: 'web/partial/details.html' },
    { path: 'bills', templateUrl: 'web/partial/details.html' },
    { path: 'food', templateUrl: 'web/partial/details.html' },
    { path: 'grocery', templateUrl: 'web/partial/details.html' },
    { path: 'shopping', templateUrl: 'web/partial/details.html' },
    { path: 'travels', templateUrl: 'web/partial/details.html' },
    { path: 'personal', templateUrl: 'web/partial/details.html' },
    { path: 'scooty', templateUrl: 'web/partial/details.html' },
], {
    activateLinks: false,
    useHashStrategy: true,
    afterRouteChange: (path) => {
        switch (path) {
            case 'home':
                let labelKeys = [];
                expenseKeys.forEach(expense => {
                    labelKeys.push(toPropercase(expense));
                });
                const data = {
                    labels: labelKeys,
                    datasets: [{
                        label: 'Expenditure',
                        data: Object.values(totalExpenses),
                        // barThickness: 30,
                        backgroundColor: chartColors,
                        borderRadius: 10,
                    }]
                };
                const config = {
                    type: 'bar',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: false
                                }
                            },
                            x: {
                                title: {
                                    padding: 10
                                },
                                grid: {
                                    display: false
                                }
                            }
                        }
                    },
                };
                const ctx = document.getElementById('homeChart');
                const ctx1 = document.getElementById('homeDoughnutChart');
                const myChart = new Chart(ctx, config);
                const doughnutChart = new Chart(ctx1, {
                    type: 'doughnut',
                    data: {
                        labels: ['Income', 'Expenditure', 'Savings'],
                        datasets: [{
                            label: 'Income',
                            data: [totalIncome, 0, 0],
                            backgroundColor: chartColors.slice(4, 7)
                        }, {
                            label: 'Breakup for Income',
                            data: [0, totalExpense, totalSavings],
                            backgroundColor: chartColors.slice(4, 7)
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let total = context.dataset.data.reduce((a, b) => a + b);
                                        let percentage = Math.floor(((context.raw / total) * 100) + 0.5);
                                        return context.label + ' - ' + context.formattedValue + ' (' + percentage + '%)';
                                    }
                                }
                            }
                        }
                    }
                });
                break;
            case 'studies':
            case 'savings':
            case 'bills':
            case 'food':
            case 'grocery':
            case 'shopping':
            case 'travels':
            case 'personal':
            case 'scooty':
                document.getElementById('typeOfExpense').textContent = toPropercase(activeKey);
                let detailsChartCtx = document.getElementById('detailsChart');
                let monthlyData = expenses.map(ex => {
                    return ex.expense[activeKey];
                });
                let detailsChart = new Chart(detailsChartCtx, {
                    type: 'bar',
                    data: {
                        labels: monthLabels,
                        datasets: [{
                            label: activeKey.toUpperCase(),
                            data: monthlyData,
                            backgroundColor: chartColors,
                            borderRadius: 10
                        }]
                    }, options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: false
                                }
                            },
                            x: {
                                title: {
                                    padding: 10
                                },
                                grid: {
                                    display: false
                                }
                            }
                        }
                    },
                });
                break;
        }
    }
});