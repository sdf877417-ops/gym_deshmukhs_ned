export function todayInput() {
  return new Date().toISOString().slice(0, 10);
}

export function addMonths(value, months) {
  const d = new Date(`${value}T12:00:00`);
  const originalDay = d.getDate();
  d.setMonth(d.getMonth() + Number(months));
  if (d.getDate() !== originalDay) d.setDate(0);
  return d.toISOString().slice(0, 10);
}

export function daysLeft(value) {
  const now = new Date();
  now.setHours(0,0,0,0);
  const end = new Date(value);
  end.setHours(0,0,0,0);
  return Math.ceil((end - now) / 86400000);
}

export function status(value) {
  const d = daysLeft(value);
  return d < 0 ? "EXPIRED" : d <= 7 ? "EXPIRING_SOON" : "ACTIVE";
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });
}
