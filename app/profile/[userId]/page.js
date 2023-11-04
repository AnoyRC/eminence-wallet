'use client';

import { useEffect, useState } from 'react';
import useGetServer from '@/hooks/useGetServer';

import ProfilePay from '@/components/layout/profile/payment/ProfilePay';
import CardContainer from '@/components/layout/profile/userProfile/CardContainer';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { getUserByPubkey } = useGetServer();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByPubkey(params.userId);
      setUser(user);
    };

    getUser();
  }, []);

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="w-screen h-screen bg-primary-black">
      <div className="relative flex flex-row gap-20 mx-auto h-full justify-center items-center">
        <Button
          label="Go to Dashboard"
          rounded
          color="bg-gradient-priamry"
          style="font-bold py-2 rounded-lg absolute top-5 left-5 px-5"
          onClick={handleClick}
        />

        <CardContainer user={user} />

        <ProfilePay user={user} />
      </div>
    </div>
  );
};

export default page;
