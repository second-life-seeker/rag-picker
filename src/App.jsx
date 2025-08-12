
import { useState } from 'react';

// import BottomNav from './BottomNav';
import GarbageMap from './GarbageMap';

function App() {
  const [page, setPage] = useState(0);

  return (
    <div style={{ paddingBottom: 56, minHeight: '100vh', background: '#f5f5f5' }}>
      {page === 0 && (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
          <GarbageMap />
        </div>
      )}
      {page === 1 && (
        <div style={{ padding: 24 }}>
          <h2>垃圾車</h2>
          <p>這裡顯示新北市垃圾車路線與時刻。</p>
        </div>
      )}
      {page === 2 && (
        <div style={{ padding: 24 }}>
          <h2>積分</h2>
          <p>這裡顯示您的垃圾分類積分。</p>
        </div>
      )}
      {page === 3 && (
        <div style={{ padding: 24 }}>
          <h2>設定</h2>
          <p>這裡可以調整個人化設定。</p>
        </div>
      )}
  {/* 導覽列已移除，定位按鈕將由 GarbageMap 控制 */}
    </div>
  );
}

export default App;
