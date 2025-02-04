"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <button onClick={handleClick}>
      <FaChevronLeft />
    </button>
  );
}
