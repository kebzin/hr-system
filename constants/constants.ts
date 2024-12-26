import {
  Users,
  ClipboardList,
  Landmark,
  HandCoins,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Layers3,
  BringToFront,
} from "lucide-react";

export const SidebarItemData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Cashup Ltd",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Layers3,
      isActive: true,
    },
    {
      title: "Department",
      url: "/department",
      icon: BringToFront,
    },
    {
      title: "Employee",
      url: "/employee",
      icon: Users,
    },

    {
      title: "Attendance",
      url: "/attendance",
      icon: ClipboardList,
    },
    {
      title: "Accounting",
      url: "#",
      icon: Landmark,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Recent Transactions",
          url: "#",
        },
        {
          title: "Expense",
          url: "/accounting/expense",
        },
        {
          title: "Bills",
          url: "/accounting/bill",
        },
        {
          title: "Journal Enteries",
          url: "/accounting/jonalEntery",
        },
        {
          title: "Chart of Account",
          url: "/accounting/chartofAccount",
        },
        {
          title: "Reports",
          url: "/accounting/report",
        },
        {
          title: "Invoice",
          url: "/accounting/invoice",
        },

        {
          title: "Bank",
          url: "/accounting/bank",
        },
      ],
    },
    {
      title: "Payroll",
      url: "/payroll",
      icon: HandCoins,
    },
  ],

  projects: [
    {
      name: "Transaction",
      url: "/",
      icon: Frame,
    },
    {
      name: "Invoice",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export const settingSidebarData = [
  {
    id: 1,
    title: "General Settings",
    href: "/setting/general",
  },
  {
    id: 2,
    title: "Employee Management",
    href: "/settings/employee-management",
  },
  {
    id: 3,
    title: "Attendance",
    href: "/setting/attendance",
  },
  {
    id: 4,
    title: "Payroll Setting ",
    href: "/settings/payroll-setting",
  },
  {
    id: 5,
    title: "Role & Permissions",
    href: "/setting/roles-permissions",
  },
  {
    id: 6,
    title: "Accounting Settings",
    href: "/setting/accounting",
  },
  {
    id: 7,
    title: "Notification Settings",
    href: "/settings/notifications",
  },
  {
    id: 8,
    title: "Security Setting",
    href: "settings/security",
  },
  {
    id: 9,
    title: "Account Management",
    href: "settings/account-management",
  },
];
