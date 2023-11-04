import LoadingAnimation from '@/components/LoadingAnimation';

const loading = () => {
  return (
    <LoadingAnimation
      width={'w-full'}
      height={'h-full'}
      size={80}
      background={'bg-transparent'}
    />
  );
};

export default loading;
