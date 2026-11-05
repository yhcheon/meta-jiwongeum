'use client'
export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] flex justify-around py-2 md:hidden z-50">
      {[
        { icon: '📊', label: '대시보드', active: true },
        { icon: '🎯', label: '맞춤공고', active: false },
        { icon: '📜', label: '인증관리', active: false },
        { icon: '👤', label: '마이페이지', active: false },
      ].map((tab, i) => (
        <button key={i} className={`flex flex-col items-center p-2 min-w-[44px] min-h-[44px] ${tab.active ? 'text-[#2563EB]' : 'text-[#64748B]'}`}>
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
