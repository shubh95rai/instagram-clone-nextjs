"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  async function handleQuery(formData: FormData) {
    const query = formData.get("query") as string;

    router.push(`/search?query=${query}`);
  }
 
  return (
    <form action={handleQuery}>
      <Input
        type="text"
        placeholder="Search for posts or users..."
        name="query"
      />
    </form>
  );
}
