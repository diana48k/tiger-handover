export const getThaiDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

export const formatThaiDateRange = (startStr, endStr) => {
  if (!startStr) return '';
  const t1 = getThaiDate(startStr);
  if (!endStr || startStr === endStr) return t1;
  const d1 = new Date(startStr);
  const d2 = new Date(endStr);
  const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()) {
    return `${d1.getDate()}-${d2.getDate()} ${months[d1.getMonth()]} ${d1.getFullYear() + 543}`;
  }
  return `${t1} ถึง ${getThaiDate(endStr)}`;
};
