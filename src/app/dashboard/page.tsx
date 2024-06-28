import { assertAuthenticated } from "@/lib/session";

export default async function DashboardPage() {
  await assertAuthenticated();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>put your dashboardy stuff here</p>
    </div>
  );
}
