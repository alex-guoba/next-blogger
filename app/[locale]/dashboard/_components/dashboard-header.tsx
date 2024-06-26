import React from "react";
import { AuthDropdown } from "@/components/layouts/auth-dropdown";
import { User } from "@supabase/supabase-js";

interface DashboardHeaderProps {
  user: User;
  children: React.ReactNode;
}

export default function DashboardHeader({ children, user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95">
      <div className="flex h-14 items-center px-6">
        {children}

        <div className="itens-center flex flex-1 justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <AuthDropdown user={user}></AuthDropdown>
          </nav>
        </div>
      </div>
    </header>
  );
}
