import Image from 'next/image';

export default function UserForm({ children }) {
  return (
    <div className="relative mt-12 mb-16">
      <Image
        src="/images/userManagement/hollow-circle.svg"
        width={165}
        height={165}
        alt="Circle"
        className="absolute -right-32 top-4"
      />

      <div className="rounded-lg overflow-hidden relative bg-gradient-priamry shadow-primary-form-black">
        <div className="w-96 h-96 rounded-full bg-[#6FFF8F] absolute -top-36 -right-36 z-0"></div>

        <div className="absolute top-0 left-0 w-full h-full bg-primary-white/40 backdrop-blur-3xl"></div>

        <div className="p-10 relative z-10 min-w-[480px] max-w-[480px]">
          {children}
        </div>

        <Image
          src="/images/userManagement/quater-circle.svg"
          width={100}
          height={314}
          alt=""
          className="absolute right-0 bottom-0"
        />
      </div>

      <Image
        src="/images/userManagement/asterisk.svg"
        width={120}
        height={120}
        alt=""
        className="absolute -left-20 -bottom-12"
      />
    </div>
  );
}
