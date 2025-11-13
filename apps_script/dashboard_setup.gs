/**
 * Initializes the Provider Performance Dashboard structure inside a Google Sheet.
 *
 * Usage:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script and replace the default code with this file.
 * 3. Save and run initializeDashboard().
 */
function initializeDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNames = ['Daily Log', 'Provider List', 'Weekly Summary', 'Monthly Summary', 'Dashboard'];

  sheetNames.forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    } else {
      sheet.clearContents();
      sheet.clearFormats();
    }
    if (name === 'Daily Log') {
      setupDailyLogSheet(sheet);
    } else if (name === 'Provider List') {
      setupProviderListSheet(sheet);
    }
  });

  setupWeeklySummary(ss.getSheetByName('Weekly Summary'));
  setupMonthlySummary(ss.getSheetByName('Monthly Summary'));
  setupDashboard(ss.getSheetByName('Dashboard'));
}

function setupProviderListSheet(sheet) {
  sheet.getRange('A1').setValue('Provider Name');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumn(1);
  sheet.getRange('A2:A9').setValue('');
  sheet.getRange('A2').setValue('Provider 1');
  sheet.getRange('A3').setValue('Provider 2');
  sheet.getRange('A4').setValue('Provider 3');
  sheet.getRange('A5').setValue('Provider 4');
  sheet.getRange('A6').setValue('Provider 5');
  sheet.getRange('A7').setValue('Provider 6');
  sheet.getRange('A8').setValue('Provider 7');
  sheet.getRange('A9').setValue('Provider 8');
}

function setupDailyLogSheet(sheet) {
  var headers = ['Date', 'Provider', 'New Bookings', 'Same-Day Cancellations', 'Cancellations > 24 hrs', 'Patients Seen', 'Booked vs Seen %', 'Net Patients', 'Week Start', 'Month'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);

  var providerRange = "Provider List!A2:A";
  var validation = SpreadsheetApp.newDataValidation()
    .requireValueInRange(SpreadsheetApp.getActive().getRange(providerRange), true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('B2:B').setDataValidation(validation);

  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd');

  sheet.getRange('G2').setFormula('=ARRAYFORMULA(IF(A2:A="",,IF(C2:C=0,0,IFERROR(F2:F/C2:C,0))))');
  sheet.getRange('H2').setFormula('=ARRAYFORMULA(IF(A2:A="",,C2:C-D2:D-E2:E))');
  sheet.getRange('I2').setFormula('=ARRAYFORMULA(IF(A2:A="",,A2:A-WEEKDAY(A2:A,2)+1))');
  sheet.getRange('J2').setFormula('=ARRAYFORMULA(IF(A2:A="",,TEXT(A2:A,"yyyy-mm")))');

  sheet.getRange('G:G').setNumberFormat('0.0%');
  sheet.getRange('H:H').setNumberFormat('0');
  sheet.getRange('I:I').setNumberFormat('yyyy-mm-dd');

  var rules = sheet.getConditionalFormatRules();
  var negativeRule = SpreadsheetApp.newConditionalFormatRule()
    .setRanges([sheet.getRange('H2:H')])
    .whenNumberLessThan(0)
    .setBackground('#f4c7c3')
    .setFontColor('#b71c1c')
    .build();
  rules.push(negativeRule);
  sheet.setConditionalFormatRules(rules);
}

function setupWeeklySummary(sheet) {
  sheet.getRange('A1:H1').setValues([[
    'Week Start',
    'Provider',
    'New Bookings',
    'Same-Day Cancellations',
    'Cancellations > 24 hrs',
    'Patients Seen',
    'Net Patients',
    'Booked vs Seen %'
  ]]);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 8);

  var formula = "=ARRAYFORMULA(IFERROR(LET(data, QUERY({'Daily Log'!I2:I,'Daily Log'!B2:B,'Daily Log'!C2:F}, \"select Col1, Col2, sum(Col3), sum(Col4), sum(Col5), sum(Col6) where Col1 is not null group by Col1, Col2 label sum(Col3) '', sum(Col4) '', sum(Col5) '', sum(Col6) ''\", 0), ";
  formula += "wk, INDEX(data,,1), prov, INDEX(data,,2), book, INDEX(data,,3), same, INDEX(data,,4), early, INDEX(data,,5), seen, INDEX(data,,6), net, book - same - early, pct, IF(book=0, 0, seen/book), HSTACK(wk, prov, book, same, early, seen, net, pct)), \"\"))";
  sheet.getRange('A2').setFormula(formula);
  sheet.getRange('H:H').setNumberFormat('0.0%');
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd');
}

function setupMonthlySummary(sheet) {
  sheet.getRange('A1:H1').setValues([[
    'Month',
    'Provider',
    'New Bookings',
    'Same-Day Cancellations',
    'Cancellations > 24 hrs',
    'Patients Seen',
    'Net Patients',
    'Booked vs Seen %'
  ]]);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 8);

  var formula = "=ARRAYFORMULA(IFERROR(LET(data, QUERY({'Daily Log'!J2:J,'Daily Log'!B2:B,'Daily Log'!C2:F}, \"select Col1, Col2, sum(Col3), sum(Col4), sum(Col5), sum(Col6) where Col1 is not null group by Col1, Col2 label sum(Col3) '', sum(Col4) '', sum(Col5) '', sum(Col6) ''\", 0), ";
  formula += "month, INDEX(data,,1), prov, INDEX(data,,2), book, INDEX(data,,3), same, INDEX(data,,4), early, INDEX(data,,5), seen, INDEX(data,,6), net, book - same - early, pct, IF(book=0, 0, seen/book), HSTACK(month, prov, book, same, early, seen, net, pct)), \"\"))";
  sheet.getRange('A2').setFormula(formula);
  sheet.getRange('H:H').setNumberFormat('0.0%');
}

function setupDashboard(sheet) {
  sheet.getRange('A1').setValue('Provider Performance Snapshot');
  sheet.getRange('A1').setFontSize(18).setFontWeight('bold');
  sheet.getRange('A3').setValue("Today's Bookings");
  sheet.getRange('A4').setFormula("=IFERROR(SUM(FILTER('Daily Log'!C:C, 'Daily Log'!A:A = TODAY())),0)");
  sheet.getRange('A4').setNumberFormat('0');
  sheet.getRange('B3').setValue("Today's Patients Seen");
  sheet.getRange('B4').setFormula("=IFERROR(SUM(FILTER('Daily Log'!F:F, 'Daily Log'!A:A = TODAY())),0)");
  sheet.getRange('B4').setNumberFormat('0');
  sheet.getRange('C3').setValue('Current Week Fill Rate');
  sheet.getRange('C4').setFormula("=IFERROR(SUM(FILTER('Weekly Summary'!F:F, 'Weekly Summary'!A:A = TODAY()-WEEKDAY(TODAY(),2)+1))/SUM(FILTER('Weekly Summary'!C:C, 'Weekly Summary'!A:A = TODAY()-WEEKDAY(TODAY(),2)+1)),0)");
  sheet.getRange('C4').setNumberFormat('0.0%');
}
