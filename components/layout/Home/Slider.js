import Image from 'next/image';

export default function Slider() {
  const dataArray = [
    {
      heading: 'Non Custodial Security',
      description:
        'Your wallet empowers you with full control. You own your private keys, ensuring the utmost security for your Solana assets. No intermediaries, just you and your crypto.',
      image: '/images/home/non-custodial.svg',
      alt: 'Using finger print to unlock wallet',
    },
    {
      heading: 'Crypto Meets Social',
      description:
        "We've made crypto more than transactions; it's a space for social connection. Easily link up with friends and family in the crypto world, turning transactions into conversations.",
      image: '/images/home/crypto-social.svg',
      alt: 'Boy chatting with friends sitting on a chair',
    },
    {
      heading: 'Smart Contacts',
      description:
        "Keeping track of your crypto network is a breeze. Save contacts and send Solana with a few taps – it's quick, easy, and hassle-free.",
      image: '/images/home/smart-contracts.svg',
      alt: '4 people standing in a circle with laptops',
    },
    {
      heading: 'Effortless Payments',
      description:
        "Simplify receiving payments with your unique link. It's a no-fuss way for others to send you Solana securely, anytime, anywhere.",
      image: '/images/home/payments.svg',
      alt: 'Sending payment to a friend using a mobile phone',
    },
    {
      heading: 'One-Stop Solana Shop',
      description:
        'Easily acquire Solana without leaving your wallet. A seamless experience awaits both beginners and seasoned crypto users, all powered by Moonpay.',
      image: '/images/home/solana-transaction.svg',
      alt: 'Sending solana to a friend using a mobile phone',
    },
  ];

  return (
    <>
      {dataArray.map((item, index) => (
        <div key={index} className="h-screen w-screen bg-gradient-linear">
          <div className="max-w-7xl flex justify-between relative items-center slider-item h-full mx-auto">
            <div className="flex flex-col justify-between max-w-[400px] md:max-w-[450px] lg:max-w-[500px] slider-content">
              <div className="max-w-xs md:max-w-sm lg:max-w-md">
                <p className=" text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black mb-20">
                  {index + 1}.
                </p>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black mb-9">
                  {item.heading}
                </h3>

                <p className="text-base md:text-lg lg:text-xl text-primary-black mt-5">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="w-[340px] h-[340px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              <Image
                src={item.image}
                width={500}
                height={500}
                alt={item.alt}
                layout="responsive"
                className="prevent-select"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
