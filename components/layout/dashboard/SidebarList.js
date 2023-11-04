'use client';

import { usePathname } from 'next/navigation';
import SideBarButton from '@/components/ui/SideBarButton';

const SidebarList = () => {
  const path = usePathname();

  return (
    <div className="px-[38px] w-full flex flex-col gap-[24px]">
      <SideBarButton
        logo={'/images/Dashboard/SideBar/dashboard'}
        active={path === '/dashboard'}
        label={'Dashboard'}
        href="/dashboard"
      />
      <SideBarButton
        logo={'/images/Dashboard/SideBar/deposit'}
        active={path === '/deposit'}
        label={'Deposit'}
        href="/deposit"
      />
      <SideBarButton
        logo={'/images/Dashboard/SideBar/transactions'}
        active={path === '/transactions'}
        label={'Transaction'}
        href="/transactions"
      />
      <hr className="w-full border-primary-white border-opacity-50" />
      <SideBarButton
        logo={'/images/Dashboard/SideBar/profile'}
        active={path === '/profile'}
        label={'Profile'}
        href="/profile"
      />
      <SideBarButton
        logo={'/images/Dashboard/SideBar/vouchers'}
        active={path === '/myVouchers'}
        label={'My Vouchers'}
        href="/myVouchers"
      />
      <SideBarButton
        logo={'/images/Dashboard/SideBar/contacts'}
        active={path === '/contacts'}
        label={'Contacts'}
        href="/contacts"
      />
    </div>
  );
};

export default SidebarList;
