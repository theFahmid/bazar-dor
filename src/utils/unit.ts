export function unitExpression(unit: string) {
  if (unit === "kg") return "প্রতি কেজি";
  else if (unit === "litre") return "প্রতি লিটার";
  else if (unit === "dozen") return "প্রতি ডজন";
  else if (unit === "piece") return "প্রতি পিস";
  else return unit;
}
