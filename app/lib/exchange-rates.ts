export type ExchangeRates = {
  baseCode: string;
  lastUpdatedUtc: string;
  rates: Record<string, number>;
};

export async function fetchExchangeRates(signal?: AbortSignal): Promise<ExchangeRates> {
  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Unable to fetch exchange rates.");
  }

  const payload: unknown = await response.json();

  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid exchange-rate response.");
  }

  const data = payload as {
    result?: unknown;
    base_code?: unknown;
    time_last_update_utc?: unknown;
    rates?: unknown;
  };

  if (
    data.result !== "success" ||
    data.base_code !== "USD" ||
    typeof data.time_last_update_utc !== "string" ||
    !Number.isFinite(Date.parse(data.time_last_update_utc)) ||
    !data.rates ||
    typeof data.rates !== "object"
  ) {
    throw new Error("Invalid exchange-rate response.");
  }

  const rates = Object.fromEntries(
    Object.entries(data.rates).filter(
      ([code, rate]) =>
        /^[A-Z]{3}$/.test(code) &&
        typeof rate === "number" &&
        Number.isFinite(rate) &&
        rate > 0,
    ),
  );

  if (!rates.EUR || !rates.GBP) {
    throw new Error("EUR or GBP rates are unavailable.");
  }

  return {
    baseCode: data.base_code,
    lastUpdatedUtc: data.time_last_update_utc,
    rates,
  };
}
