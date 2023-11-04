import AsideContainer from '@/components/layout/dashboard/home/AsideContainer';

export default function DashLayout({ children }) {
  return (
    <main
      className="flex justify-between w-full"
      style={{
        height: 'calc(100% - 72px)',
      }}
    >
      <div className="flex justify-center flex-grow relative overflow-auto">
        <div className="w-[668px] px-[16px] py-[20px]">{children}</div>
      </div>

      <AsideContainer />
    </main>
  );
}
