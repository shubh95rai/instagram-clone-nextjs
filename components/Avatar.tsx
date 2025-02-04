import Image from "next/image";

export default function Avatar({
  src,
  size = "size-12",
}: {
  src: string;
  size?: string;
}) {
  return (
    <Image
      src={src}
      alt="avatar"
      width={500}
      height={500}
      className={`aspect-square rounded-full object-cover shadow ${size} `}
      priority
    />
  );
}
