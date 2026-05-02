import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react'; // 해 아이콘
import { Button } from '../../../shared/ui/Button'; // Shadcn 버튼 가정

export const Header = () => {
  const [time, setTime] = useState(new Date());

  // 실시간 시계 기능
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  return (
    <header className="flex h-[60px] w-full items-center justify-between border-b border-[#252A30] bg-[#181C25] px-6 text-white">
      {/* 왼쪽: 로고 및 서비스 이름 */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold tracking-tight">CRYPTOVIEW</h1>
        
        {/* 실시간 시간 표시 */}
        <span className="text-lg font-medium text-slate-400">
          {formatTime(time)}
        </span>
      </div>

      {/* 오른쪽: 테마 토글 및 기타 유틸리티 */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:bg-[#252A30] hover:text-white"
        >
          <Sun className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};