"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  CreditCard,
  Home,
  Landmark,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Wallet,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useToast,
} from "@/src/components/ui";
import { LogoutButton } from "@/src/components/logout-button";
import { MockFeaturePage } from "@/src/components/mock-feature-page";

export default function UIKitPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const { showToast } = useToast();

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Email format is invalid";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <main className="min-h-screen bg-(--primecore-background) px-6 py-10 text-(--primecore-foreground) md:px-10 ">
      <div className="mx-auto max-w-7xl space-y-8">
        <nav className="sticky top-3 z-40 flex items-center justify-between rounded-xl border border-(--primecore-border) bg-(--primecore-surface) px-4 py-3 backdrop-blur dark:bg-(--primecore-surface)/85">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Building2 size={18} />
            <span>PrimeCore UI</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <LayoutDashboard size={15} />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ShieldCheck size={15} />
              Secure
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <UserCircle2 size={15} />
              Team
            </Button>
          </div>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-xl border border-[#0a436f] bg-[#063154] p-4 text-[#e8f0f7] lg:sticky lg:top-24 dark:border-(--primecore-border) dark:bg-[linear-gradient(160deg,#08253d,#0d3150)]">
            <div className="mb-4 flex items-center gap-2">
              <LayoutDashboard size={17} className="text-[#2F9D94]" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#d4e7f7]/85">Sidebar</h2>
            </div>
            <div className="space-y-2">
              <button className="flex w-full items-center justify-between rounded-lg border border-[#2F9D94]/45 bg-[#2F9D94]/20 px-3 py-2 text-left text-sm font-medium text-[#f4fdff]">
                <span className="flex items-center gap-2">
                  <Home size={16} />
                  Overview
                </span>
                <Badge variant="info">UI</Badge>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border border-[#2a5d85] px-3 py-2 text-left text-sm font-medium hover:bg-[#0e446f] dark:border-(--primecore-border) dark:hover:bg-[#2F9D94]/12">
                <span className="flex items-center gap-2">
                  <Wallet size={16} />
                  Accounts
                </span>
                <Badge variant="success">3</Badge>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border border-[#2a5d85] px-3 py-2 text-left text-sm font-medium hover:bg-[#0e446f] dark:border-(--primecore-border) dark:hover:bg-[#2F9D94]/12">
                <span className="flex items-center gap-2">
                  <Landmark size={16} />
                  Transfers
                </span>
                <Badge variant="warning">2</Badge>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border border-[#2a5d85] px-3 py-2 text-left text-sm font-medium hover:bg-[#0e446f] dark:border-(--primecore-border) dark:hover:bg-[#2F9D94]/12">
                <span className="flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </span>
                <Badge variant="danger">!</Badge>
              </button>
            </div>
          </aside>

          <div className="space-y-8">
            <header className="space-y-3 rounded-xl border border-(--primecore-border) bg-(--primecore-surface) p-6 dark:bg-(--primecore-surface)/45">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#2F9D94]" />
                <h1 className="text-3xl font-bold">PrimeCore UI Kit</h1>
              </div>
              <p className="text-sm text-(--primecore-foreground)/75">
                Shared design system preview for all team members.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="info">Banking UI</Badge>
                <Badge variant="success">Dark Mode Ready</Badge>
                <Badge variant="warning">Reusable Components</Badge>
              </div>
            </header>

            <Card>
              <CardHeader>
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Bell size={17} className="text-[#2F9D94]" />
                  Notifications
                </h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-(--notice-success-border) bg-(--notice-success-bg) p-3">
                  <div>
                    <p className="text-sm font-medium text-(--notice-success-text)">Transfer Completed</p>
                    <p className="text-xs text-(--notice-success-subtext)">LKR 48,000 sent to A. Fernando</p>
                  </div>
                  <Badge variant="success">New</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-(--notice-danger-border) bg-(--notice-danger-bg) p-3">
                  <div>
                    <p className="text-sm font-medium text-(--notice-danger-text)">Security Alert</p>
                    <p className="text-xs text-(--notice-danger-subtext)">New login detected from Colombo</p>
                  </div>
                  <Badge variant="danger">High</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-(--notice-warning-border) bg-(--notice-warning-bg) p-3">
                  <div>
                    <p className="text-sm font-medium text-(--notice-warning-text)">Card Payment Due</p>
                    <p className="text-xs text-(--notice-warning-subtext)">Due in 2 days • LKR 12,500</p>
                  </div>
                  <Badge variant="warning">Reminder</Badge>
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <CreditCard size={17} className="text-[#2F9D94]" />
                Buttons
              </h2>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button loading>Loading</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Badges</h2>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </CardContent>
          </Card>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Input with helper and error</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Perera"
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={errors.name}
                helperText={!errors.name ? "Enter account holder name" : undefined}
              />
              <Input
                type="email"
                label="Email"
                placeholder="john@primecore.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={errors.email}
                helperText={!errors.email ? "Used for notifications" : undefined}
              />
            </CardContent>
            <CardFooter className="justify-start">
              <Button
                variant="secondary"
                onClick={() => {
                  if (validate()) {
                    showToast({
                      type: "success",
                      title: "Form validated",
                      description: "Inputs passed validation checks.",
                    });
                  }
                }}
              >
                Validate Inputs
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Switch + Modal/Dialog + Toast</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch checked={isSwitchOn} onCheckedChange={setIsSwitchOn} aria-label="Sample switch" />
                <span className="text-sm">{isSwitchOn ? "Enabled" : "Disabled"}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                  Open Dialog
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    showToast({
                      type: "info",
                      title: "Toast message",
                      description: "This is a minimal global toast.",
                    })
                  }
                >
                  Show Toast
                </Button>
              </div>
            </CardContent>
          </Card>
            </section>

            <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Simple Table</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Savings • 4432</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>LKR 1,248,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Credit • 8851</TableCell>
                  <TableCell>
                    <Badge variant="warning">Review</Badge>
                  </TableCell>
                  <TableCell>LKR 120,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Feature Components</h2>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium opacity-70">Logout Button</h3>
                  <div className="rounded-lg border border-dashed p-4">
                    <LogoutButton />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium opacity-70">Mock Feature Page</h3>
                  <div className="overflow-hidden rounded-lg border border-dashed">
                    <div className="scale-[0.6] origin-top-left w-[166%] h-[600px] border-b bg-background p-6">
                      <MockFeaturePage 
                        title="Feature Preview" 
                        description="This is how a feature under construction looks."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Skeletons</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
            </Card>

            <footer className="rounded-xl border border-(--primecore-border) px-4 py-3 text-center text-xs text-(--primecore-foreground)/70">
              PrimeCore Design System • UI Kit Preview • Light/Dark Consistent Components
            </footer>
          </div>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Confirm Transfer"
        description="This is the shared modal/dialog component."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                showToast({ type: "success", title: "Transfer confirmed" });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        Review transaction details before continuing.
      </Dialog>
    </main>
  );
}
