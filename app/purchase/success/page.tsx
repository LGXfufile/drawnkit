import { PurchaseStatus } from "@/components/purchase-status";

export default async function PurchaseSuccess({ searchParams }: { searchParams: Promise<{ claim?: string }> }) {
  const { claim = "" } = await searchParams;
  return <PurchaseStatus claim={claim} />;
}
