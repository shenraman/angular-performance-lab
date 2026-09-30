# Angular Performance Lab

A practical Angular performance troubleshooting project focused on identifying and reducing unnecessary recalculation in a data-heavy UI.

## 🎯 Project Objective

This project demonstrates a real-world style Angular performance investigation:

**Reproduce → Measure → Investigate → Optimize → Measure Again**

The application contains a customer dashboard with **5,000 records**, search functionality, revenue calculations, and an on-screen performance monitor.

---

## 🔎 The Problem

The initial implementation used template-bound getters for derived data:

```typescript
get filteredCustomers(): Customer[] {
  // filtering logic
}

get totalRevenue(): number {
  // calculation logic
}
```

These getters were referenced by the Angular template.

When the component went through change detection, the filtering and calculation logic could be executed repeatedly.

With a small dataset this may not be noticeable, but the same pattern can become expensive when working with:

* Thousands of records
* Large report sections
* Complex calculations
* Nested loops
* Data transformations
* Frequently changing UI state

---

## 📊 Baseline Measurement

The application was instrumented with calculation counters.

During interaction with the search field, the initial implementation produced:

| Metric               | Baseline |
| -------------------- | -------: |
| Filter calculations  |  **167** |
| Revenue calculations |   **67** |

The exact number of evaluations can vary depending on the interaction and development environment. The important observation was the repeated execution of the same calculations.

---

## 🛠️ Optimization

The derived values were changed from regular getters to Angular computed signals.

### Filtered customers

```typescript
filteredCustomers = computed(() => {
  const search = this.searchText().trim().toLowerCase();

  if (!search) {
    return this.customers;
  }

  return this.customers.filter(
    customer =>
      customer.name.toLowerCase().includes(search) ||
      customer.country.toLowerCase().includes(search),
  );
});
```

### Total revenue

```typescript
totalRevenue = computed(() => {
  return this.filteredCustomers().reduce(
    (total, customer) => total + customer.revenue,
    0,
  );
});
```

---

## 📈 Result

After converting the derived values to computed signals:

| Metric               | Before |  After |
| -------------------- | -----: | -----: |
| Filter calculations  |    167 | **30** |
| Revenue calculations |     67 | **30** |

The application also felt smoother during local search testing.

### What changed?

Angular computed signals provide memoized reactive derived state.

In this example, the filtering calculation depends on:

```text
searchText()
```

When the search value changes, the computed value is recalculated.

When unrelated change-detection activity occurs, Angular can reuse the existing computed result instead of automatically executing the filtering logic again.

---

## 🧠 Key Learning

A template-bound getter is **not automatically a performance bug**.

The problem becomes more significant when a getter performs expensive work.

For example:

```text
Template
   ↓
Expensive getter
   ↓
Filter 5,000 records
   ↓
Sort / calculate / transform
   ↓
Render
```

If this work happens repeatedly during change detection, the cost can become noticeable.

The correct approach is:

> **Measure first, identify the expensive operation, then apply a targeted optimization.**

---

## 🔬 Performance Investigation Process

When investigating a slow Angular page:

1. Reproduce the performance problem.
2. Identify the user interaction causing the slowdown.
3. Identify expensive template expressions.
4. Instrument suspicious calculations.
5. Establish a baseline.
6. Apply a targeted optimization.
7. Measure again.
8. Verify that application behaviour remains correct.
9. Document the result.

---

## 💼 Real-World Relevance

This approach can be applied to existing Angular applications containing:

* Customer dashboards
* Financial reports
* Tax/reporting screens
* Large forms
* Data grids
* Search/filter interfaces
* Large report sections
* Complex calculated fields

The objective is to troubleshoot and improve an existing application rather than rebuild it from scratch.

---

## 🧰 Technology

* Angular 21
* TypeScript
* Angular Signals
* `computed()`
* `FormsModule`
* Angular `CurrencyPipe`
* Git / GitHub

---

## ▶️ Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Then open:

```text
http://localhost:4200/
```

---

## 📌 Project Status

### Completed

* Customer dashboard
* 5,000-record test dataset
* Search functionality
* Performance instrumentation
* Baseline measurement
* Computed-signal optimization
* Before/after measurement

### Planned

* Angular DevTools profiling
* Change-detection investigation
* Large-list rendering optimization
* Additional Angular performance scenarios
* Production-oriented performance troubleshooting examples

---

## 👨‍💻 About This Project

This repository is part of a practical Angular troubleshooting portfolio focused on diagnosing and fixing performance issues in existing applications.

The emphasis is on **problem solving, measurement and targeted optimization**, rather than building UI templates from scratch.
