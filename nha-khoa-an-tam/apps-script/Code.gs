/**
 * Google Apps Script – nhận form đặt lịch, ghi Google Sheets + báo Telegram cho lễ tân.
 * Cách dùng:
 *  1. Tạo Google Sheet, vào Tiện ích mở rộng > Apps Script, dán file này.
 *  2. Điền TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID (tạo bot qua @BotFather).
 *  3. Triển khai > Ứng dụng web > Ai có quyền truy cập: "Bất kỳ ai" > copy URL.
 *  4. Dán URL vào CONFIG.formEndpoint trong js/main.js.
 */
var TELEGRAM_BOT_TOKEN = '';
var TELEGRAM_CHAT_ID = '';
var SHEET_NAME = 'Leads';
var HEADERS = ['Thời gian', 'Họ tên', 'SĐT', 'Nhu cầu', 'Mã ưu đãi', 'utm_source', 'utm_campaign', 'Trang'];

function doPost(e) {
  var p = e.parameter || {};
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

  sh.appendRow([new Date(), p.name, "'" + p.phone, p.need, p.code, p.utm_source || '', p.utm_campaign || '', p.page || '']);

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    var text = '🦷 LỊCH HẸN MỚI – gọi xác nhận trong 5 phút\n'
      + '👤 ' + p.name + '\n📞 ' + p.phone + '\n🎁 ' + p.need + '\n🔖 ' + p.code
      + (p.utm_source ? '\n📣 Nguồn: ' + p.utm_source : '');
    UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
      method: 'post', contentType: 'application/json',
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text }),
      muteHttpExceptions: true
    });
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
