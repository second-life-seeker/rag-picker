// 這個檔案只輸出一個函式，根據 time 傳回 marker 的 innerHTML
export function getGarbageMarkerHtml(time) {
  return `
    <div class="garbage-marker-icon">
      <i class='fa fa-truck'></i>
      <div class='garbage-marker-time'>${time}</div>
    </div>
  `;
}
