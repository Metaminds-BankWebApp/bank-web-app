# PrimeCore - Digital Banking Platform

A modern, comprehensive digital banking web application built with Next.js 16, TypeScript, and Tailwind CSS. PrimeCore offers a seamless experience for both existing bank customers and public users, featuring advanced financial tools like SpendIQ, CreditLens, LoanSense, and Transact.

## 🚀 Technical Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode support)

## ✨ Key Features

### 🔐 Authentication & Roles
- **Role-Based Access Control (RBAC):** Secure routing for different user types (`BANK_CUSTOMER`, `PUBLIC_CUSTOMER`).
- **Auth Guard:** Protected routes that redirect unauthorized users.
- **Session Management:** Persisted authentication state using Zustand.

### 🏦 Feature Modules
The application is divided into specialized financial modules:

1.  **SpendIQ** 📊
    - Expense tracking and history.
    - Budget management.
    - Categorized spending insights.

2.  **CreditLens** 🛡️
    - Credit score monitoring.
    - Risk assessment dashboard.
    - Improvement tips and alerts.

3.  **LoanSense** 💰 *(Bank Customer Exclusive)*
    - Loan eligibility checker.
    - Personal, Vehicle, and Education loan application flows.
    - Policy overview.

4.  **Transact** 💸 *(Bank Customer Exclusive)*
    - Secure fund transfers.
    - Transaction history.
    - Digital receipts.

### 🎨 UI System
- **Component Library:** A comprehensive set of reusable UI components (`/src/components/ui`) including Cards, Badges, Buttons, Dialogs, and Toasts.
- **UI Kit:** A dedicated showcase page (`/ui-kit`) for developers to preview and test components.
- **Layout System:** Smart layouts that adapt based on user roles and active features.

## 📂 Project Structure

```
frontend/
├── app/                  # Next.js App Router pages
│   ├── (landing)/        # Public landing page
│   ├── (roles)/          # Role-protected routes
│   │   ├── bank-customer/# Bank Customer dashboard & features
│   │   └── public-customer/# Public User dashboard & features
│   ├── login/            # Authentication pages
│   └── ui-kit/           # Component library preview
├── src/
│   ├── components/       # Reusable React components
│   │   ├── auth/         # Auth guards & logic
│   │   ├── layout/       # Sidebars, Navbars, Footers
│   │   └── ui/           # Core UI primitives
│   ├── lib/              # Utilities (cn, helpers)
│   └── store/            # Zustand state stores
└── public/               # Static assets
```

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Bank-Web-App.git
    cd Bank-Web-App
    ```

2.  **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
