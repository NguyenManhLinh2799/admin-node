
var myChart = document.getElementById('chart').getContext('2d');
let labels = ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020', '08/2020', '09/2020', '10/2020', '11/2020', '12/2020'];
// var myChart = document.getElementById('chart')
// var labels = [];
var data = [];
for (let i = 0; i < 12; i++) {
  data.push(Math.floor(Math.random() * 1001));
}

var chart = new Chart(myChart, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Số lượt đăng ký mới',
      data: data,
      backgroundColor: 'rgba(204, 179, 15, 1)',
      fill: 'false',
      borderColor: 'rgba(204, 179, 15, 1)',
      lineTension: 0
    }]
  },
  option: {

  }
});