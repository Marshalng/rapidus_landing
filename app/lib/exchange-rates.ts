export type ExchangeRates = {
  baseCode: string;
  lastUpdatedUtc: string;
  rates: Record<string, number>;
};

export type HistoricalExchangeRate = {
  date: string;
  rate: number;
};

async function fetchFxApiHistory(
  fromCurrency: string,
  toCurrency: string,
  currencies: string[],
  startDate: string,
  endDate: string,
  signal?: AbortSignal,
): Promise<HistoricalExchangeRate[]> {
  const fallbackHistories = await Promise.all(
    currencies.map(async (currency) => {
      const params = new URLSearchParams({ from: startDate, to: endDate });
      const response = await fetch(
        `https://fxapi.app/api/history/USD/${currency}.json?${params}`,
        { signal },
      );
      if (!response.ok) throw new Error("Unable to fetch historical exchange rates.");

      const payload: unknown = await response.json();
      if (!payload || typeof payload !== "object") {
        throw new Error("Invalid historical exchange-rate response.");
      }

      const data = payload as { base?: unknown; target?: unknown; rates?: unknown };
      if (data.base !== "USD" || data.target !== currency || !Array.isArray(data.rates)) {
        throw new Error("Invalid historical exchange-rate response.");
      }

      const rates = new Map<string, number>();
      for (const point of data.rates) {
        if (!point || typeof point !== "object") continue;
        const { date, rate } = point as { date?: unknown; rate?: unknown };
        if (
          typeof date === "string" && date >= startDate && date <= endDate &&
          typeof rate === "number" && Number.isFinite(rate) && rate > 0
        ) {
          rates.set(date, rate);
        }
      }
      return [currency, rates] as const;
    }),
  );
  const histories = new Map(fallbackHistories);
  const dates = histories.get(currencies[0])?.keys() ?? [];

  return [...dates]
    .flatMap((date) => {
      const fromRate = fromCurrency === "USD" ? 1 : histories.get(fromCurrency)?.get(date);
      const toRate = toCurrency === "USD" ? 1 : histories.get(toCurrency)?.get(date);
      if (fromRate === undefined || toRate === undefined) return [];
      return [{ date, rate: toRate / fromRate }];
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function fetchExchangeRateHistory(
  fromCurrency: string,
  toCurrency: string,
  range: "24h" | "7d" | "30d",
  signal?: AbortSignal,
): Promise<HistoricalExchangeRate[]> {
  if (fromCurrency === toCurrency) return [];

  const end = new Date();
  const start = new Date(end);
  const days = range === "24h" ? 1 : range === "7d" ? 6 : 29;
  start.setUTCDate(start.getUTCDate() - days);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const currencies = [fromCurrency, toCurrency].filter((currency) => currency !== "USD");
  const params = new URLSearchParams({ from: "USD", to: currencies.join(",") });
  const response = await fetch(
    `https://api.frankfurter.dev/v1/${startDate}..${endDate}?${params}`,
    { signal },
  );

  if (response.status === 404) {
    return fetchFxApiHistory(fromCurrency, toCurrency, currencies, startDate, endDate, signal);
  }

  if (!response.ok) throw new Error("Unable to fetch historical exchange rates.");

  const payload: unknown = await response.json();
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid historical exchange-rate response.");
  }

  const data = payload as { base?: unknown; rates?: unknown };
  if (data.base !== "USD" || !data.rates || typeof data.rates !== "object") {
    throw new Error("Invalid historical exchange-rate response.");
  }

  const dailyRates = Object.values(data.rates) as unknown[];
  const hasRequestedCurrencies = currencies.every((currency) =>
    dailyRates.some((rates) => {
      if (!rates || typeof rates !== "object") return false;
      const rate = (rates as Record<string, unknown>)[currency];
      return typeof rate === "number" && Number.isFinite(rate) && rate > 0;
    }),
  );
  if (!hasRequestedCurrencies) {
    return fetchFxApiHistory(fromCurrency, toCurrency, currencies, startDate, endDate, signal);
  }

  return Object.entries(data.rates)
    .filter(([date]) => date >= startDate && date <= endDate)
    .flatMap(([date, dailyRates]) => {
      if (!dailyRates || typeof dailyRates !== "object") return [];
      const values = dailyRates as Record<string, unknown>;
      const fromRate = fromCurrency === "USD" ? 1 : values[fromCurrency];
      const toRate = toCurrency === "USD" ? 1 : values[toCurrency];
      if (
        typeof fromRate !== "number" || !Number.isFinite(fromRate) || fromRate <= 0 ||
        typeof toRate !== "number" || !Number.isFinite(toRate) || toRate <= 0
      ) return [];
      return [{ date, rate: toRate / fromRate }];
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

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
