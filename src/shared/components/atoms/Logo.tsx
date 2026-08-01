import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/Logo.png"
        alt="كلينيكا"
        width={120}
        height={30}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
