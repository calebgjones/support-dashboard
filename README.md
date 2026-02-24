<div align="center">
  
  # Lightspeed DMS Support Dashboard
  
  **Centralized Support Resources for Lightspeed Dealer Management System**
  
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

  <p align="center">
    <em>Your one-stop resource for Lightspeed DMS support documentation, security requirements, and module reference.</em>
  </p>
</div>

---

## Overview

The Lightspeed DMS Support Dashboard helps support teams quickly find the information they need when assisting dealerships with Lightspeed Dealer Management System. Access security requirements, module documentation, knowledgebase article links, and support notes in one centralized location.

## Features

| Feature | Description |
|---------|-------------|
| 🔐 **Security Requirements** | Look up security permissions required for each DMS function to verify user access rights |
| 📚 **DMS Module Reference** | Navigate Parts, Service, Sales, Rental, Accounting modules with organized sections |
| 📖 **Knowledgebase Links** | Direct links to detailed step-by-step instructions and troubleshooting guides |
| 📝 **Support Notes** | Tips, caveats, and important information to help resolve issues faster |
| 📊 **Support Analytics** | Track ticket volumes, response times, and workload trends |
| 🔍 **Quick Search** | Instantly find modules, sections, and documentation across the entire dashboard |

## Lightspeed DMS Modules

The dashboard covers documentation for the following Lightspeed modules:

- **Application** – Settings, recent documents/reports, store switching, screen lock
- **Parts** – Invoicing, inventory, ordering, receiving, special orders, transfers
- **Service** – Estimates, repair orders, technician time, warranty claims, scheduling
- **Sales** – Sales documentation and processes
- **Rental** – Rental management and documentation
- **Receivables** – Accounts receivable
- **Payables** – Accounts payable
- **General Ledger** – GL entries and financial documentation
- **Payroll** – Payroll processing
- **System** – System-level configurations and settings

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/calebgjones/support-dashboard.git

# Navigate to the project directory
cd support-dashboard

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

## Tech Stack

- **React 19** – UI Framework
- **Vite** – Build tool & dev server
- **React Router 7** – Client-side routing
- **Tailwind CSS 4** – Utility-first styling

## Project Structure

```
support-dashboard/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── HomePage/         # Landing page
│   │   ├── Modules/          # Module-specific components
│   │   ├── NavigationBar/    # Navigation with dropdowns
│   │   ├── SearchBox/        # Site-wide search
│   │   ├── SecurityModal/    # Security info popups
│   │   └── contentArray.js   # Module/section data
│   ├── utils/
│   │   └── parseMarkup.jsx   # Text formatting utility
│   ├── App.jsx               # Main app with routing
│   └── main.jsx              # Entry point
└── package.json
```

## Content Markup

The dashboard supports custom text formatting in security descriptions and notes:

| Tag | Effect |
|-----|--------|
| `~i text ~i` | *Italic* |
| `~b text ~b` | **Bold** |
| `~u text ~u` | Underline |
| `~n` | Line break |

Tags can be nested: `~b~u bold underline ~u~b`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

<div align="center">
  <strong>Lightspeed DMS Support Dashboard</strong>
</div>