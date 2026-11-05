import { MobileNav } from '@/components/MobileNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pb-20 md:pb-0">{children}</div>
      <MobileNav />
    </div>
  )
}
