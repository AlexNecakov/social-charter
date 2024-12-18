Requirements

    Framework & Tools:
        Next.js (v13+) or Remix: Leverage server-side rendering and data fetching capabilities.
        Tailwind CSS: For rapid, responsive UI styling.
        shadcn/ui: For consistent, accessible UI components like buttons, inputs, and dropdowns.
        Charting Library: Use a modern React charting library (e.g., recharts, react-chartjs-2, visx) to visualize the fetched data.
        TypeScript (Preferred): For type safety and improved developer experience.
        AI-Assisted Coding Tools: Feel free to use Cursor, GitHub Copilot, or similar tools to speed up development and experiment with code generation.

    UI Features & Workflow:
        Platform Selection: A toggle, dropdown, or tabs to switch between querying meta and tiktok endpoints.
        Metrics & Dimensions/Breakdowns Selectors:
            For TikTok: metrics and dimensions (multi-select).
            For Meta: metrics and breakdowns (multi-select).
        Level Selector: A single-select for the allowed levels per endpoint (TikTok uses AUCTION_... types, Meta uses account, campaign, etc.).
        Date Range Input:
            Support selecting dateRangeEnum or a custom date range (dateRange with from and to).
            Use a date picker for custom ranges.
        Time Increment (Meta only): If desired, choose the timeIncrement (optional).
        Fetch Data Button: Trigger an API call with the selected parameters.
        Loading & Error States:
            Show a spinner while data is loading.
            Display an error alert if the request fails or parameters are invalid.
        Chart Visualization:
            Once data is fetched, render it in a chart.
            Consider a line or bar chart:
                For time series data (if breakdown/time-based), a line chart could show changes over time.
                For categorical dimensions, a bar chart could compare metric values across different categories.
            At minimum, show one metric’s values plotted against one or more dimensions/breakdowns.

    Validation & Error Handling:
        If no date range or date range enum is selected, show a validation error.
        If required parameters are missing (e.g., no metrics), disable the "Fetch Data" button or show a validation error.
        On failed network requests, show a user-friendly error message (not just console errors).

    Code Structure:
        Keep data fetching logic separate from presentation components (e.g., use Next.js server components or Remix loaders).
        Make components small and focused.
        Document any complex logic with inline comments or brief docstrings.

    Deployment & Configuration:
        Use environment variables for the token (e.g., .env.local).
        Include instructions in the README for how to configure and run the application locally (npm install && npm run dev or yarn dev).

    Submission:
        Provide a GitHub repository link.
        Include a README with:
            Setup instructions
            How to run the project locally
            Any environment variable configuration required
        Mention if and how you used AI tools like Cursor or Copilot in your approach.

