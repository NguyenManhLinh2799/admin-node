
var myChart = document.getElementById('chart').getContext('2d');

var labels = document.getElementById('labels').value.split(',');
labels.pop();

var dataStr = document.getElementById('data').value.split(',');
dataStr.pop();
var data = [];
// Parse each dataStr element to number
dataStr.forEach(entry => {
  data.push(parseInt(entry))
});

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