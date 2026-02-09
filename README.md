# OffPeak

Nice—this is a great candidate for a **tight, insight-dense MVP**. I’ll keep this **systems-level, first-principles**, and deliberately *not* overbuild.

---

# MVP Sketch — “Off-Peak Intelligence for Travel”

## 1. Core Job to Be Done (anchor everything)

> *“Given my flexibility, tell me **when** to travel to maximize value, and quantify the trade-off.”*

Everything else is noise.

---

## 2. MVP Scope (what you ship in v1)

### User Inputs (minimal friction)

You only need **one** of these to start:

* **Origin** (city or country)
* **Date flexibility**

  * Fixed month OR
  * ± X weeks
* **Trip length** (optional, default = 7 nights)
* **Tolerance slider** (important)

  * Weather risk
  * Crowd tolerance

That’s it. No accounts initially.

---

## 3. Core Output (the “aha” moment)

One screen. No scrolling.

### For each destination (top 3–5):

**Card structure**

```
Thailand · Phuket
Best value window: 5–22 Sept

↓ 42% cheaper than peak
€1,180 vs €2,030 (typical)

Trade-offs:
• Rain risk: Moderate (18% days)
• Crowds: Low
• Flight reliability: Normal

Why this works:
Monsoon lowers hotel demand, flights stay frequent.
```

This **% delta vs peak** is the killer feature.

---

## 4. The Core Engine (first principles)

You are NOT building a travel agency.
You are building a **seasonality arbitrage layer**.

### Inputs into the model

For a given `(origin, destination, date window)`:

1. **Flight price time series**

   * Monthly median fares (historical)
2. **Accommodation index**

   * Use proxy: hotel ADR index or scraped averages
3. **Demand signal**

   * Google Trends / historical booking curves
4. **Seasonality penalty**

   * Weather (rain days, temp variance)
   * Known events / holidays

---

### Core Metric (MVP math)

```
Value Score = (Peak Cost – Window Cost) / Peak Cost
```

Expressed as:

> **“42% cheaper than peak season”**

Then apply a **penalty multiplier**:

```
Adjusted Value = Value Score × (1 – Risk Penalty)
```

Where:

* Risk Penalty ∈ [0–0.3] in MVP
* Driven by weather + volatility only (keep it simple)

---

## 5. Ranking Logic (simple but powerful)

Sort destinations by:

```
Adjusted Value Score
```

Filter out anything below, say:

* 20% savings (otherwise not interesting)

---

## 6. Data Sources (MVP-realistic)

You can ship this without contracts.

### Flights

* Skyscanner / Kiwi / Amadeus (cached, not real-time)

### Hotels

* Booking.com ADR scraping (monthly medians)
* Or Numbeo / tourism board data as proxy

### Weather

* NOAA / Meteostat monthly aggregates

### Season Labels

* Hardcoded v1:

  * Peak
  * Shoulder
  * Off-peak

---

## 7. UX Flow (extremely lean)

**Screen 1**

* “Where are you flying from?”
* “When can you travel?” (month or ± flexibility)

**Screen 2**

* Slider: *“How flexible are you?”*

  * Conservative ←→ Adventurous

**Screen 3 (magic)**

* Ranked destination cards
* Savings % dominates visually
* Small “Why this is cheaper” explainer

No booking yet. That’s v2.

---

## 8. What You Deliberately Do NOT Build (yet)

❌ User accounts
❌ Real-time pricing
❌ Exact itineraries
❌ AI chat
❌ Dynamic packages

Your wedge is **insight**, not execution.

---

## 9. Monetization (MVP-aligned)

### Phase 1

* Affiliate links (deep-link out)
* “Book this window” → partner

### Phase 2

* **Pro tier**:

  * Alert me when value > X%
  * Custom destinations
  * Family / school-holiday mode

---

## 10. Why this MVP Works

From a systems lens:

* You exploit **temporal inefficiency** in travel markets
* You convert hidden complexity → **single scalar (% savings)**
* You train users to think in *time windows*, not dates
* You can expand horizontally:

  * Events
  * Workations
  * Climate-aware travel
  * Corporate travel optimization

This is a **thin wedge with massive surface area**.

---


