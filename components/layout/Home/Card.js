import Image from 'next/image';

const Card = () => {
  return (
    <section className="relative mx-auto w-fit py-32">
      <h2 className="text-primary-black text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-normal relative z-10 mb-10">
        Get your <span className="text-white leading-normal">Own Card</span>
        <div>
          Des<span className="text-white leading-normal">ign</span>
        </div>
      </h2>

      <div className="flex flex-col xl:flex-row relative z-10 prevent-select">
        <Image
          src="/images/home/3d-card-dark.png"
          width={576}
          height={311}
          alt="Black Front and Back Card Design"
        />

        <Image
          src="/images/home/3d-card.png"
          width={556}
          height={320}
          alt="Front and Back Card Design"
        />
      </div>

      <Image
        src="/images/home/divider.svg"
        fill
        objectFit="contain"
        alt="launch app"
        className="absolute w-full h-full rotate-180 prevent-select"
      />
    </section>
  );
};

export default Card;
