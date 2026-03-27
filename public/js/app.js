// Table search/filter
function filterTable() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const filter = input.value.toLowerCase();
  const table = document.getElementById('dataTable');
  if (!table) return;
  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    const text = rows[i].textContent.toLowerCase();
    rows[i].style.display = text.includes(filter) ? '' : 'none';
  }
}

// Re-highlight SQL blocks after page load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
});
