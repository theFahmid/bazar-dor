export function unitExpression(unit: string) {
  if (unit === "kg") return "কেজি";
  else if (unit === "litre") return "লিটার";
  else if (unit === "dozen") return "ডজন";
  else if (unit === "piece") return "পিস";
  else return unit;
}
