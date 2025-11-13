# Google Sheets KPI Dashboard for Medical Providers

This repository contains a Google Apps Script that scaffolds a Google Sheets dashboard for monitoring daily, weekly, and monthly productivity metrics for up to eight medical providers. The layout is designed for manual data entry while surfacing the KPIs most practices rely on when they do not yet have an EMR integration.

## What the Dashboard Tracks

Each provider receives a daily row that captures:

- **New bookings** received that day
- **Same-day cancellations** (cancellations that happen on the appointment date)
- **Cancellations made more than 24 hours in advance**
- **Patients actually seen**

From those inputs, the sheet automatically calculates:

- **Net patients** (bookings minus cancellations)
- **Booked vs. seen percentage**
- **Week start** and **Month** helper columns that power the summaries
- Conditional formatting that turns the net patients column **red** whenever the value is negative

Weekly and monthly summary tabs roll the data up so you can compare provider performance over time. A lightweight dashboard tab surfaces today’s totals and the current week’s fill rate at a glance.

## Getting Started

1. **Create the Google Sheet**
   - Open Google Sheets and create a blank spreadsheet named something like `Provider Performance Dashboard`.

2. **Add the Script**
   - Select **Extensions → Apps Script**.
   - Delete any starter code and paste the contents of [`apps_script/dashboard_setup.gs`](apps_script/dashboard_setup.gs) into the editor.
   - Save the project, then click the run ▶️ button for `initializeDashboard`. Google will prompt you to authorize the script the first time.

3. **Populate the Provider List**
   - Return to the spreadsheet and open the **Provider List** tab.
   - Replace the placeholder provider names with your eight providers. The Daily Log sheet uses this list for a drop-down menu, so keep the list contiguous (no blank rows in the middle).

4. **Daily Data Entry**
   - Use the **Daily Log** tab to enter each provider’s performance every day.
   - Columns G–J are calculated automatically. Do not overwrite them.
   - Net values that fall below zero will highlight red so you can immediately spot issues.

5. **Review Weekly and Monthly Summaries**
   - The **Weekly Summary** tab groups each provider’s totals by the Monday start of the week.
   - The **Monthly Summary** tab groups metrics by calendar month (`YYYY-MM`).
   - Both tabs include net patients and booked-vs-seen percentages so you can compare productivity across time horizons.

6. **Use the Dashboard Snapshot**
   - The **Dashboard** tab aggregates today’s bookings and patients seen.
   - The right-hand card displays the current week fill rate (patients seen ÷ bookings) so you can gauge how full the schedule remains.

## Customising the Template

- **More than eight providers?** Add additional names under the provider list and extend the data validation range on the Daily Log’s Provider column.
- **Need other KPIs?** You can add more columns to the Daily Log sheet—just update the weekly/monthly formulas to include them.
- **Prefer charts?** Use Google Sheets’ built-in charts on the Weekly or Monthly Summary tabs without affecting the underlying formulas.

## File Overview

- [`apps_script/dashboard_setup.gs`](apps_script/dashboard_setup.gs) – Google Apps Script that builds and formats the entire workbook structure, including formulas, conditional formatting, and summary views.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
