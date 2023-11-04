import TransactionV2 from "@/components/layout/dashboard/home/TransactionV2";

export default function Home() {
  return (
    <section>
      <TransactionV2 limit={20} />
    </section>
  );
}
