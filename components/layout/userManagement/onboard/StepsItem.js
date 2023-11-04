import Image from 'next/image';

export default function StepView({ id, name, currentStep, img }) {
  const opacity = currentStep === id ? '' : 'opacity-60';
  return (
    <div className="flex flex-col items-center justify-start w-32 hover:bg-black/40 px-3 py-2 rounded-md cursor-default">
      <div
        className={`${
          currentStep === id ? 'bg-primary' : 'bg-primary/60'
        } p-1.5 rounded-full`}
      >
        <Image src={img} width={20} height={20} alt="step" />
      </div>

      <p
        className={`font-bold text-primary-white mt-2 text-sm leading-normal ${opacity}`}
      >
        Step {id}
      </p>

      <p
        className={`font-medium text-primary-white mt-0.5 text-sm text-center ${opacity}`}
      >
        {name}
      </p>
    </div>
  );
}
