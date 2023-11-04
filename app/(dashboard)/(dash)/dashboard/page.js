import MyWallet from '@/components/layout/dashboard/home/MyWallet';
import Graph from '@/components/layout/dashboard/home/Graph';
import TransactionV2 from '@/components/layout/dashboard/home/TransactionV2';
import ContactV2 from '@/components/layout/dashboard/home/ContactV2';
import DashboardBtn from '@/components/layout/dashboard/home/DashboardBtn';

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col gap-5 pb-5 ">
      <div className="flex justify-between">
        <MyWallet />
        <DashboardBtn />
      </div>
      <TransactionV2 />
      <Graph />
    </section>
  );
}
