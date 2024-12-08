import { specialityData } from "@/public/assets";
import TextBox from "@/components/textBox";
import React from "react";

interface SidebarProps {
  onSpecialtySelect: (specialty: string) => void;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ onSpecialtySelect }) => {
  console.log("Sidebar Rendered");
  return (
    <aside className="w-80 p-6">
      <h2 className="text-2xl font-bold mb-4">Filter</h2>
      <nav className="flex-1">
        {specialityData.map((spec) => (
          <div key={spec.id} onClick={() => onSpecialtySelect(spec.speciality)}>
            <TextBox text={spec.speciality} iconSrc={spec.image} />
          </div>
        ))}
      </nav>
    </aside>
  );
});

// Add a displayName for React DevTools and linting
Sidebar.displayName = "Sidebar";

export default Sidebar;
