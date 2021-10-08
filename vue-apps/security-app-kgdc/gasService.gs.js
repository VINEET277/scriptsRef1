function doGet(e) {
  let { action } = e.parameter;

  if(action == 'makeentry'){
    let { datetime, entryexit, vehicleid, name, designation, vehicletype, vehicleno, model, color } = e.parameter;

    let sheet = SpreadsheetApp.openById('1ayR2YZchyXfpPmwjm2Nedc5WG0jxyWjj3Zcbm5TTeBc').getSheetByName('Activity');
    sheet.appendRow([datetime, entryexit, vehicleid, name, designation, vehicletype, vehicleno, model, color]);

    return HtmlService.createHtmlOutput('success');
  } else {
    return HtmlService.createHtmlOutput('unauthorized');
  }
}