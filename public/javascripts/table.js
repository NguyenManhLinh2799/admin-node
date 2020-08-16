$(document).ready(function () {
  $('#table').DataTable({
    "language": {
      "lengthMenu": "Hiển thị _MENU_ dòng mỗi trang",
      "zeroRecords": "Không tìm thấy kết quả",
      "info": "Trang _PAGE_ trên _PAGES_",
      "infoEmpty": "Không tìm thấy kết quả",
      "infoFiltered": "(Lọc từ _MAX_ kết quả)",
      "search": "Tìm kiếm:",
      "oPaginate": {
        "sPrevious": "Trước",
        "sNext": "Sau",
      }
    }
  });
  $('.dataTables_length').addClass('bs-select');
});