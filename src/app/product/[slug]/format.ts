export function bnInt(n: number) {
  return n.toLocaleString("bn-bd");
}

export function bn1(n: number) {
  return n.toLocaleString("bn-bd", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function bnAvg(n: number) {
  if (Number.isInteger(n)) return bnInt(n);
  return n.toLocaleString("bn-bd", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function marketAvg(market: { min: number; max: number }) {
  return (market.min + market.max) / 2;
}
