import Image from 'next/image';
import Link from 'next/link';

export default function SideBarButton({ logo, label, active, href }) {
  return (
    <Link className="flex items-center hover:cursor-pointer" href={href}>
      <>
        <Image
          src={active ? logo + '-gradient.svg' : logo + '.svg'}
          width={24}
          height={24}
          alt="image"
        />
        <p
          className={`text-xl ml-4 ${
            active
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#4AFF93] to-[#26FFFF] font-bold'
              : 'text-primary-white'
          }`}
        >
          {label}
        </p>
      </>
    </Link>
  );
}
