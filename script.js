tableau.extensions.initializeAsync().then(() => {
  const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
  worksheet.getSummaryDataAsync().then(dataTable => {
    let csv = '';
    const columns = dataTable.columns.map(col => col.fieldName);
    csv += columns.join(',') + '\n';

    dataTable.data.forEach(row => {
      csv += row.map(cell => `"${cell.formattedValue}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  });
});
