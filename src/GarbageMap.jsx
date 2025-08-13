import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AllInOne.css';

import { getGarbageMarkerHtml } from './GarbageMarkerHtml';
import * as extraMarkers from 'leaflet-extra-markers';
import { useEffect, useRef, useState } from 'react';
// import './LocateButton.css';
// import './LocationList.css';


const locations = [
  { village: '玉光里', address: '板橋區民生路二段36-1號', longitude: 121.4724, latitude: 25.0174, time: '06:00~22:00' },
  { village: '華東里', address: '板橋區華東街1-7號', longitude: 121.448879, latitude: 24.994645, time: '08:00~22:00' },
  { village: '華江里', address: '板橋區民生路二段89-9號', longitude: 121.472174, latitude: 25.01692, time: '08:00~22:00' },
  { village: '正義里', address: '自強路1段158號(市立圖書館)', longitude: 121.495988, latitude: 25.066001, time: '07:00~09:00' },
  { village: '福德里', address: '重新路4段臨121號', longitude: 121.4852678, latitude: 25.05262838, time: '07:00~21:00' },
  { village: '灰瑤里', address: '中和區和城路1段271巷1號(清潔隊本部)', longitude: 121.483254, latitude: 24.989676, time: '00:00~24:00' },
  { village: '德穗里', address: '中和區中山路3段與莒光路口(公路局駕訓中心旁)', longitude: 121.471839, latitude: 25.006323, time: '06:30~07:30' },
  { village: '秀山里', address: '中和區立人街與自強路口(秀山國小旁)', longitude: 121.520119, latitude: 24.995082, time: '07:00~08:00' },
  { village: '中安里', address: '中和區中安街132號對面(安平派出所旁)', longitude: 121.510849, latitude: 25.000469, time: '07:00~08:00' },
  { village: '景福里', address: '和平街65號旁', longitude: 121.505847, latitude: 24.991996, time: '07:00~08:00' },
  { village: '景平里', address: '中和區景平路159巷口', longitude: 121.512558, latitude: 24.992333, time: '07:00~08:00' },
  { village: '廟美里', address: '中和區中和路與廟美街口(中和農會旁)', longitude: 121.500249, latitude: 25.001403, time: '07:00~08:00' },
  { village: '福美里', address: '中和區莊敬路33巷口', longitude: 121.499949, latitude: 25.005545, time: '07:00~08:00' },
  { village: '錦和里', address: '中和區圓通路367巷2號(全家便利超商前)', longitude: 121.491237, latitude: 24.989364, time: '07:00~08:00' },
  { village: '河濱里', address: '永福橋下永和區清潔隊停車場', longitude: 121.52568, latitude: 25.00937, time: '06:00~18:00' },
  { village: '光明里', address: '國光路2號(圖書館永和分館旁)', longitude: 121.519964, latitude: 25.008462, time: '07:00~08:30' },
  { village: '復興里', address: '永和區光復街60巷18前(近環河東路1段網溪里土地公廟)', longitude: 121.5176544, latitude: 25.01755783, time: '07:00~08:30' },
  { village: '文明里', address: '中正路與新莊路口', longitude: 121.459412, latitude: 25.038135, time: '06:00~08:00' },
  { village: '立功里', address: '新泰路與中平路口', longitude: 121.444593, latitude: 25.042419, time: '06:00~08:00' },
  { village: '中華里', address: '中港路與中華路二段口', longitude: 121.452999, latitude: 25.044465, time: '06:00~08:00' },
  { village: '成德里', address: '龍安路與光明路口', longitude: 121.4243297, latitude: 25.01843555, time: '06:00~08:00' },
  { village: '德安里', address: '車子路土地公廟前', longitude: 121.505363, latitude: 24.952868, time: '06:30~08:30' },
  { village: '青潭里', address: '北宜路一段南青宮對面候車站旁', longitude: 121.546946, latitude: 24.952525, time: '06:30~08:00' },
  { village: '永安里', address: '新和街31巷口新和國小', longitude: 121.51911, latitude: 24.984816, time: '06:30~08:00' },
  { village: '國豐里', address: '民族路小金門友誼公園前', longitude: 121.537858, latitude: 24.976904, time: '07:00~09:00' },
  { village: '五峰里', address: '中正路95巷口五峰重劃區公園前', longitude: 121.5435227, latitude: 24.97039959, time: '07:00~08:00' },
  { village: '德安里', address: '薏仁坑路自強巷安康分隊', longitude: 121.496737, latitude: 24.958352, time: '08:00~20:00' },
  { village: '彭厝里', address: '清潔隊車庫，八德街339號', longitude: 121.41916, latitude: 24.974, time: '06:00~20:00' },
  { village: '樹西里', address: '中山路一段樹林火車站後站廣場前', longitude: 121.423875, latitude: 24.991263, time: '06:20~08:00' },
  { village: '二甲里', address: '鶯歌區清潔隊停車場大門口(鶯歌區環河路175-18號,北二高橋下)', longitude: 121.345827, latitude: 24.935045, time: '06:00~22:00' },
  { village: '北鶯里', address: '鶯歌區公所前停車場', longitude: 121.354634, latitude: 24.955727, time: '06:20~09:20,17:20~20:50' },
  { village: '中鶯里', address: '公有零售市場旁(鶯歌區建國路108號)', longitude: 121.353535, latitude: 24.953972, time: '12:30~13:30' },
  { village: '鳶山里', address: '本隊茅埔停車場(中山路553號對面)', longitude: 121.34872, latitude: 24.93287, time: '08:00~17:00' },
  { village: '鳶山里', address: '本區隊部(三峽區隆恩街243號)', longitude: 121.357634, latitude: 24.940958, time: '08:00~17:00' },
  { village: '幸福里', address: '英專路口', longitude: 121.445312, latitude: 25.168659, time: '06:10~08:30' },
  { village: '江北里', address: '康寧街901號(車庫)', longitude: 121.650983, latitude: 25.075214, time: '08:00~22:00' },
  { village: '龍興里', address: '明燈路三段2號(第一市場旁)', longitude: 121.809132, latitude: 25.107416, time: '07:30~08:30,12:00~13:00,21:00~21:30' },
  { village: '龍興里', address: '中正路、民生街交叉路口(中華電信前)', longitude: 121.805897, latitude: 25.107552, time: '21:30~22:00' },
  { village: '永寧里', address: '永寧路(北二高橋下)永寧停車場 (永寧路32巷口，左邊300公尺)', longitude: 121.4278, latitude: 24.9591, time: '06:00~22:00' },
  { village: '員福里', address: '中華路二段(全國加油站後)員福停車場(城林路6巷62號旁)', longitude: 121.4345, latitude: 24.9617, time: '06:00~22:00' },
  { village: '永寧里', address: '永和街(北二高橋下)資源回收場 (永和街25號旁，400公尺)', longitude: 121.438, latitude: 24.9797, time: '07:00~16:00' },
  { village: '清溪里', address: '清水消防隊(青雲路與立德路口)', longitude: 121.4592, latitude: 24.9882, time: '07:30~09:30' },
  { village: '仁義里', address: '尼加拉瓜公園(集賢路上)', longitude: 121.481177, latitude: 25.08394, time: '08:00~09:00' },
  { village: '正義里', address: '蘆洲慈惠堂', longitude: 121.4605238, latitude: 25.08299694, time: '08:00~09:00' },
  { village: '更寮里', address: '中興路2段39號旁(高速公路橋下)', longitude: 121.462032, latitude: 25.075913, time: '07:20~09:00' },
  { village: '成州里', address: '成泰路3段433號對面(成州2路)(五股鹹粥對面)', longitude: 121.4498, latitude: 25.0977, time: '07:20~09:00' },
  { village: '五股里', address: '成泰路2段91巷(坑口公園廣場)', longitude: 121.437547, latitude: 25.084423, time: '07:20~09:00' },
  { village: '水碓里', address: '德音消防隊旁(新北市五股區明德路8號)', longitude: 121.433585, latitude: 25.071331, time: '07:20~09:00' },
  { village: '貴和里', address: '明志路三段357號OK便利商店對面', longitude: 121.421762, latitude: 25.034952, time: '07:15~09:00' },
  { village: '義仁里', address: '泰林路二段與中港南路口', longitude: 121.436822, latitude: 25.055411, time: '07:15~09:00' },
  { village: '楓樹里', address: '明志路一段(與文化街口)', longitude: 121.433436, latitude: 25.063729, time: '07:15~09:00' },
  { village: '黎明里', address: '黎明技術學院門口(橫窠雅路)', longitude: 121.41887, latitude: 25.065218, time: '07:15~09:00' },
  { village: '明志里', address: '應化街', longitude: 121.4237918, latitude: 25.04364411, time: '14:35~14:50,19:35~20:10' },
  { village: '東林里', address: '林口區粉寮路二段128號(清潔隊調度場)', longitude: 121.404945, latitude: 25.090817, time: '08:00~21:00' },
  { village: '深坑里', address: '北深路2段192號（公有立體停車場）', longitude: 121.6135061, latitude: 25.00195562, time: '07:00~10:00' },
  { village: '土庫里', address: '北深路1段26號', longitude: 121.629421, latitude: 25.008749, time: '07:00~09:00' },
  { village: '阿柔里', address: '阿柔洋40號', longitude: 121.612394, latitude: 24.998899, time: '07:00~10:00' },
  { village: '深坑里', address: '平埔街22巷8號旁', longitude: 121.614974, latitude: 25.001068, time: '07:00~22:00' },
  { village: '埔坪里', address: '停二停車場旁(中山路三段與中正路二段交叉口)', longitude: 121.502984, latitude: 25.254315, time: '06:30~08:30' },
  { village: '埔頭里', address: '中興、公正街口', longitude: 121.498319, latitude: 25.256653, time: '17:47~18:19' },
  { village: '埔坪里', address: '淡金公路郵局', longitude: 121.5027016, latitude: 25.25952717, time: '18:55~19:35' },
  { village: '埤頭里', address: '八里區清潔隊資源回收場(八里區博物館路10號之1)', longitude: 121.415268, latitude: 25.164, time: '08:00~17:00' },
  { village: '新基里', address: '自行車站(雙溪區新基里自強路5-1號)', longitude: 121.866429, latitude: 25.038847, time: '06:45~07:15' },
  { village: '雙溪里', address: '綜合市場(雙溪區雙溪里太平路50號)', longitude: 121.8647894, latitude: 25.03549479, time: '07:20~07:50' },
  { village: '三貂里', address: '政光3-5號(資源回收場)', longitude: 121.8507014, latitude: 25.06344972, time: '17:20~18:00' },
  { village: '共和里', address: '東榮街31號旁', longitude: 121.8662345, latitude: 25.03360015, time: '17:20~18:00' },
  { village: '貢寮里', address: '清潔隊車庫(朝陽街1-2號)', longitude: 121.91201, latitude: 25.02129, time: '08:00~17:00' },
  { village: '仁里里', address: '貢寮區清潔隊資收場(台2線97公里處)', longitude: 121.92927, latitude: 25.03578777, time: '08:00~17:00' },
  { village: '磺港里', address: '金山區清潔隊資源回收場(磺清路135號旁)', longitude: 121.639327, latitude: 25.22754, time: '08:00~12:00,13:00~17:00,17:30~21:30' },
  { village: '萬里里', address: '清潔隊停車場(獅頭路上）', longitude: 121.693284, latitude: 25.178299, time: '00:00~24:00' },
  { village: '烏來里', address: '烏來立體停車場(烏來街47號）', longitude: 121.551873, latitude: 24.865052, time: '07:00~08:00' },
];

const center = [25.0174, 121.4724]; // 以玉光里為地圖中心

export default function GarbageMap() {
  const [userPos, setUserPos] = useState(null);
  const [geoError, setGeoError] = useState(false);
  const [showList, setShowList] = useState(false);
  const [sortedList, setSortedList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const mapRef = useRef(null);
  const listRef = useRef(null);
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=delivery_truck_bolt';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // 計算距離（Haversine）
  function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = x => x * Math.PI / 180;
    const R = 6371e3;
    const φ1 = toRad(lat1), φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 網頁標題 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '78px',
          background: '#ffae00',
          color: '#fff',
          fontSize: '32px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          letterSpacing: '2px',
          boxShadow: '0 2px 8px #bbb'
        }}
      >
        新北市定點丟垃圾地圖
      </div>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100vh', width: '100vw' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, idx) => {
          const iconHtml = getGarbageMarkerHtml(loc.time);
          const customIcon = L.divIcon({
            html: iconHtml,
            className: '',
            iconSize: [44, 56],
            iconAnchor: [22, 56],
            popupAnchor: [0, -56],
          });
          return (
            <Marker key={idx} position={[loc.latitude, loc.longitude]} icon={customIcon}>
              <Popup>
                <b>{loc.village}</b><br />
                {loc.address}<br />
                時間：{loc.time}
              </Popup>
            </Marker>
          );
        })}
        {userPos && (
          <Marker position={userPos} icon={L.divIcon({
            html: `<div style='width:22px;height:22px;border-radius:50%;background:#2196f3;border:3px solid #fff;box-shadow:0 1px 4px #888;'></div>`,
            className: '',
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          })} />
        )}
      </MapContainer>
      {/* 定位按鈕 */}
      <button
        className="locate-btn"
        onClick={() => {
          if (!navigator.geolocation) {
            setGeoError(true);
            return;
          }
          navigator.geolocation.getCurrentPosition(
            pos => {
              setUserPos([pos.coords.latitude, pos.coords.longitude]);
              setGeoError(false);
              if (mapRef.current && mapRef.current.flyTo) {
                mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 16, { animate: true, duration: 1.2 });
              } else if (mapRef.current && mapRef.current._leaflet_id && mapRef.current.setView) {
                mapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 16);
              } else if (mapRef.current && mapRef.current.leafletElement && mapRef.current.leafletElement.flyTo) {
                mapRef.current.leafletElement.flyTo([pos.coords.latitude, pos.coords.longitude], 16, { animate: true, duration: 1.2 });
              }

              const sorted = locations.map(loc => ({
                ...loc,
                distance: getDistance(pos.coords.latitude, pos.coords.longitude, loc.latitude, loc.longitude)
              })).sort((a, b) => a.distance - b.distance);
              setSortedList(sorted);
              setShowList(true);
              setActiveIdx(0);
              // fit map bounds to userPos 與最近地點
              if (sorted.length > 0) {
                const group = [
                  [pos.coords.latitude, pos.coords.longitude],
                  [sorted[0].latitude, sorted[0].longitude]
                ];
                if (mapRef.current && mapRef.current.fitBounds) {
                  mapRef.current.fitBounds(group, { padding: [80, 80], animate: true });
                } else if (mapRef.current && mapRef.current._leaflet_id && mapRef.current.leafletElement && mapRef.current.leafletElement.fitBounds) {
                  mapRef.current.leafletElement.fitBounds(group, { padding: [80, 80], animate: true });
                }
              }
              // 捲動清單到最近地點
              setTimeout(() => {
                if (listRef.current) {
                  listRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }, 200);
            },
            () => setGeoError(true),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        }}
        title="定位到目前位置"
      >
        {geoError ? (
          <i className="fa-solid fa-circle-question error-icon"></i>
        ) : (
          <i className="fa-solid fa-location-crosshairs"></i>
        )}
      </button>
      {/* 橫式卡片清單 */}
      {showList && sortedList.length > 0 && (
        <div
          className="location-list"
          ref={listRef}
          onWheel={e => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
              e.preventDefault();
            }
          }}
        >
          {sortedList.slice(0, 10).map((loc, idx) => (
            <div
              key={loc.village+loc.address}
              className={"location-list-card" + (idx === activeIdx ? " active" : "")}
              onClick={() => {
                setActiveIdx(idx);
                if (mapRef.current && mapRef.current.flyTo) {
                  mapRef.current.flyTo([loc.latitude, loc.longitude], 16, { animate: true, duration: 1.2 });
                } else if (mapRef.current && mapRef.current._leaflet_id && mapRef.current.setView) {
                  mapRef.current.setView([loc.latitude, loc.longitude], 16);
                } else if (mapRef.current && mapRef.current.leafletElement && mapRef.current.leafletElement.flyTo) {
                  mapRef.current.leafletElement.flyTo([loc.latitude, loc.longitude], 16, { animate: true, duration: 1.2 });
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="location-list-card-title">{loc.village}</div>
              <div className="location-list-card-address">{loc.address}</div>
              <div className="location-list-card-time">定點丟垃圾時間：{loc.time} </div>
              <div className="location-list-card-distance">距離：{loc.distance < 1000 ? `${loc.distance.toFixed(0)} 公尺` : `${(loc.distance/1000).toFixed(2)} 公里`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
