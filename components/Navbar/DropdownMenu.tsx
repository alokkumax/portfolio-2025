"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import HoverCard from "./HoverCard";
import { DropdownItem } from "@/types";

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-white font-semibold uppercase text-sm px-3 py-1.5 rounded-full transition-all hover:bg-white hover:text-black">
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
      <HoverCard items={items} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}


