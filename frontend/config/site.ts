export type UserRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER" | "BANK_OFFICER" | "ADMIN";

export type SiteNavItem = {
  title: string;
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: SiteNavItem[];
};

export type SidebarItem = {
  title: string;
  href: string;
  icon:
    | "layout-dashboard"
    | "wallet"
    | "send"
    | "line-chart"
    | "shield-check"
    | "users"
    | "file-text"
    | "settings"
    | "history"
    | "inbox"
    | "user"
    | "help-circle"
    | "log-out";
  section?: "general" | "other" | "account";
};

export type SidebarRoleConfig = {
  roleLabel: string;
  appName: string;
  colorClass: string;
  items: SidebarItem[];
};

export const siteConfig = {
  name: "PrimeCore",
  description: "PrimeCore Digital Banking UI",
  navbar: {
    links: [
      { title: "Products", href: "/products" },
      { title: "Resources", href: "/resources" },
      { title: "About", href: "/about" },
      { title: "Support", href: "/support" },
    ] as SiteNavItem[],
    auth: {
      login: { title: "Login", href: "/login" },
      signup: { title: "Sign Up", href: "/register" },
    },
  },
  footer: {
    groups: [
      {
        title: "Company",
        links: [
          { title: "About", href: "/about" },
          { title: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Legal",
        links: [
          { title: "Privacy", href: "/privacy" },
          { title: "Terms", href: "/terms" },
        ],
      },
      {
        title: "Support",
        links: [
          { title: "Help Center", href: "/support" },
          { title: "Contact", href: "/contact" },
        ],
      },
    ] as FooterLinkGroup[],
    copyright: "© 2026 PrimeCore Bank. All rights reserved.",
  },
  sidebar: {
    PUBLIC_CUSTOMER: {
      roleLabel: "Public Customer",
      appName: "Bank Digital",
      colorClass: "bg-[#0b6d76]",
      items: [
        { title: "Dashboard", href: "/public-customer", icon: "layout-dashboard", section: "general" },
        { title: "SpendIQ", href: "/public-customer/spendiq", icon: "line-chart", section: "general" },
        { title: "CreditLens", href: "/public-customer/creditlens", icon: "shield-check", section: "general" },
        { title: "Log Out", href: "/login", icon: "log-out", section: "account" },
      ],
    },
    BANK_CUSTOMER: {
      roleLabel: "Bank Customer",
      appName: "Bank Digital",
      colorClass: "bg-[#3e9fd3]",
      items: [
        { title: "Dashboard", href: "/bank-customer", icon: "layout-dashboard", section: "general" },
        { title: "SpendIQ", href: "/bank-customer/spendiq", icon: "line-chart", section: "general" },
        { title: "CreditLens", href: "/bank-customer/creditlens", icon: "shield-check", section: "general" },
        { title: "LoanSense", href: "/bank-customer/loansense", icon: "file-text", section: "general" },
        { title: "Transact", href: "/bank-customer/transact", icon: "send", section: "general" },
        { title: "Log Out", href: "/login", icon: "log-out", section: "account" },
      ],
    },
    BANK_OFFICER: {
      roleLabel: "Bank Officer",
      appName: "Bank Officer",
      colorClass: "bg-[#0d3b66]", // Matching screenshot dark theme
      items: [
        { title: "Dashboard", href: "/bank-officer", icon: "layout-dashboard", section: "general" },
        { title: "All Customers", href: "/bank-officer/all-customers", icon: "users", section: "general" },
        { title: "Add Customer", href: "/bank-officer/add-customer", icon: "user", section: "general" },
        { title: "History", href: "/bank-officer/history", icon: "history", section: "general" },
        { title: "Credit Analysis", href: "/bank-officer/credit-analysis", icon: "line-chart", section: "general" },
        { title: "Transactions", href: "/bank-officer/transactions", icon: "wallet", section: "general" },
        { title: "Profile", href: "/bank-officer/profile", icon: "user", section: "general" },
        { title: "Help & Support", href: "/bank-officer/support", icon: "help-circle", section: "other" },
        { title: "Setting", href: "/bank-officer/settings", icon: "settings", section: "other" },
        { title: "Log Out", href: "/login", icon: "log-out", section: "account" }, 
      ],
    },
    ADMIN: {
      roleLabel: "Admin",
      appName: "PrimeCore",
      colorClass: "bg-[#0d3b66]", // Matching screenshot dark theme
      items: [
        { title: "Dashboard", href: "/admin", icon: "layout-dashboard", section: "general" },
        { title: "Add Customer", href: "/admin/add-customer", icon: "users", section: "general" },
        { title: "History", href: "/admin/history", icon: "history", section: "general" },
        { title: "Statistics", href: "/admin/statistics", icon: "line-chart", section: "general" },
        { title: "Inbox", href: "/admin/inbox", icon: "inbox", section: "general" },
        { title: "Profile", href: "/admin/profile", icon: "user", section: "general" },
        { title: "Help & Support", href: "/admin/support", icon: "help-circle", section: "other" },
        { title: "Setting", href: "/admin/settings", icon: "settings", section: "other" },
        { title: "Log Out", href: "/login", icon: "log-out", section: "account" },
      ],
    },
  } as Record<UserRole, SidebarRoleConfig>,
};

export function getSidebarItems(role: UserRole): SidebarItem[] {
  return siteConfig.sidebar[role].items;
}

export function getSidebarRoleConfig(role: UserRole): SidebarRoleConfig {
  return siteConfig.sidebar[role];
}
