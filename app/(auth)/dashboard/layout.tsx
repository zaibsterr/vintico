'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { ensureUserProfile } from '@/lib/user-profile';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, getToken } = useAuth();

  useEffect(() => {
    const ensureProfile = async () => {
      if (!userId) return;
      
      try {
        const token = await getToken();
        if (!token) return;
        
        // Get user email from Clerk or fallback to empty string
        // The email will be available in the user profile from Clerk
        await ensureUserProfile(token, userId, '');
      } catch (error) {
        console.error('Error ensuring user profile:', error);
      }
    };

    ensureProfile();
  }, [userId, getToken]);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
