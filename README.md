<div align="center">
  
  # 👁️ Beholder
  
  **Your Comprehensive Security & Documentation Reference System**
  
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

  <p align="center">
    <em>Navigate Lightspeed's complex structure with clarity and precision.</em>
  </p>
</div>

---

## 📖 Overview

Beholder is an internal documentation and security reference system designed to help teams understand and navigate **Lightspeed's** comprehensive software structure. It provides detailed information about security permissions, module functionality, and access requirements across all system modules.

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Security Documentation</h3>
      <p>Detailed security permission requirements for every function, helping teams understand exactly what access rights are needed for each operation.</p>
    </td>
    <td width="50%">
      <h3>📚 Module Navigation</h3>
      <p>Browse through all system modules including Parts, Service, Sales, Rental, Payables, Receivables, and more with organized sections.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📖 Knowledge Base Integration</h3>
      <p>Direct references to detailed knowledge base articles for in-depth information about specific features and functionality.</p>
    </td>
    <td width="50%">
      <h3>📝 Contextual Notes</h3>
      <p>Additional notes and important information about specific functions, caveats, and special considerations.</p>
    </td>
  </tr>
</table>

## 🏗️ Modules

Beholder covers documentation for the following Lightspeed modules:

| Module | Description |
|--------|-------------|
| **Application** | View settings, recent documents/reports, store switching, screen lock |
| **Parts** | Parts invoicing, inventory, ordering, receiving, special orders, transfers |
| **Service** | Estimates, repair orders, technician time entry, warranty claims, scheduling |
| **Sales** | Sales documentation and processes |
| **Rental** | Rental management and documentation |
| **Management Activity** | Management-level operations and reporting |
| **Receivables** | Accounts receivable documentation |
| **Payables** | Accounts payable documentation |
| **General Ledger** | GL entries and financial documentation |
| **Payroll** | Payroll processing documentation |
| **System** | System-level configurations and settings |
| **Help** | Help resources and documentation |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/beholder.git

# Navigate to the project directory
cd beholder

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first styling |
| **ESLint** | Code linting |

## 📁 Project Structure

```
beholder/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── HomePage/         # Landing page
│   │   ├── Modules/          # Module-specific components
│   │   │   ├── Application/
│   │   │   ├── Parts/
│   │   │   ├── Service/
│   │   │   ├── Sales/
│   │   │   └── ...
│   │   ├── NavigationBar/    # Dynamic navigation
│   │   ├── SecurityModal/    # Security info popups
│   │   └── contentArray.js   # Module/section data
│   ├── utils/
│   │   └── parseMarkup.jsx   # Text formatting utility
│   ├── App.jsx               # Main app with routing
│   └── main.jsx              # Entry point
├── docs/                # Documentation
└── package.json
```

## 📝 Content Markup

Beholder supports custom text formatting in security descriptions and notes:

| Tag | Effect | Example |
|-----|--------|---------|
| `~i text ~i` | *Italic* | `~i important ~i` |
| `~b text ~b` | **Bold** | `~b required ~b` |
| `~u text ~u` | Underline | `~u critical ~u` |
| `~n` | Line break | `Line 1 ~n Line 2` |

Tags can be nested: `~b~i bold italic ~i~b`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    <strong>Built with ❤️ for the Lightspeed team</strong>
  </p>
</div>