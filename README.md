# Google Sheets KPI Dashboard for Medical Providers

This project is a Google Sheets-based dashboard designed to help healthcare practices track key performance indicators (KPIs) for medical providers. The goal is to monitor the daily performance of providers, including patient bookings, cancellations, and the number of patients actually seen. The dashboard includes daily, weekly, and monthly summaries, and flags any negative performance outcomes.

## Features

- **Daily Tracker for Each Provider**:
  - Tracks the number of **new bookings** received each day.
  - Tracks **same-day cancellations** (cancellations made on the same day as the booking).
  - Tracks **cancellations made more than 24 hours in advance**.
  - Tracks the **number of patients actually seen** by each provider.

- **Calculations & Averages**:
  - Automatically calculates daily totals and averages for each provider.
  - Shows weekly and monthly summaries for easy analysis.
  - Calculates the **percentage of booked patients vs. seen patients**.
  
- **Visual Flags**:
  - Flags negative values (e.g., when the total number of patients seen is less than the booked appointments) by turning the corresponding cell **red**.
  
- **Monthly & Weekly Summaries**:
  - Displays **weekly** and **monthly performance metrics** for each provider.
  - Helps identify trends in bookings and cancellations over time.
  
- **Manual Data Entry**:
  - Since the practice’s EMR system doesn’t integrate, the dashboard allows easy **manual data entry** by office staff.
  - The system is designed to be user-friendly, requiring no technical knowledge to input data.

## Setup Instructions

1. **Create a New Google Sheets File**:
   - Open Google Sheets and create a new sheet titled "Provider Performance Dashboard."

2. **Add the Script**:
   - Open the script editor in Google Sheets by selecting `Extensions > Apps Script`.
   - Copy and paste the `app script code` provided into the script editor.

3. **Script Configuration**:
   - The script will auto-generate the daily tracker, weekly, and monthly summaries.
   - Ensure that the sheet contains columns for:
     - **Provider Name**
     - **New Bookings**
     - **Same-Day Cancellations**
     - **Cancellations > 24 Hours**
     - **Patients Seen**
   - The script will automatically calculate the daily totals and averages.

4. **Customize the Dashboard**:
   - Adjust the range for daily, weekly, and monthly views based on your needs.
   - Set up conditional formatting (e.g., turning cells red when values are negative).
   - Customize the layout to suit your practice's needs (adding additional columns for provider names, etc.).

## Example Spreadsheet Layout

| **Date**       | **Provider Name** | **New Bookings** | **Same-Day Cancellations** | **Cancellations > 24 hrs** | **Patients Seen** | **Daily Total** | **Average** |
|----------------|-------------------|------------------|----------------------------|---------------------------|-------------------|------------------|-------------|
| 2025-11-10     | Dr. John Doe      | 5                | 1                          | 0                         | 4                 | 5                | 80%         |
| 2025-11-10     | Dr. Jane Smith    | 4                | 0                          | 1                         | 3                 | 4                | 75%         |
| ...            | ...               | ...              | ...                        | ...                       | ...               | ...              | ...         |

## How to Use

- **Data Entry**: Office staff should enter the data manually each day. They will need to record:
  - The number of **new bookings** made.
  - Any **same-day cancellations**.
  - Cancellations made more than 24 hours in advance.
  - The number of **patients actually seen**.
  
- **Daily Review**: The dashboard will display each provider's performance on a daily basis. At the end of each day, the total values and averages will be calculated automatically.

- **Weekly & Monthly Summaries**: The dashboard will update weekly and monthly views, giving a clear overview of the practice's overall performance.

## Future Enhancements

- **Automated Data Imports**: In future versions, we plan to explore integrations with EMR systems for automated data import (if feasible).
- **Custom Reports**: Ability to export the data to custom reports for stakeholders or regulatory purposes.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. If you have any suggestions for improvements or encounter any issues, please open an issue in the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
