import { useState, useEffect } from 'react';
import { useTheme } from '../stores/theme.store';
import SearchBar from '../components/SearchBar';

// ประเภทสำหรับกิจกรรม
interface ActivityCardProps {
  title: string;
  description: string;
  type: 'อบรม' | 'อาสา' | 'ช่วยงาน';
  image: string;
  date: string;
  location: string;
}

// ประเภทสำหรับฟิลเตอร์การค้นหา
interface SearchFilterType {
  id: string;
  label: string;
  checked: boolean;
}

// คอมโพเนนต์การ์ดกิจกรรม
function ActivityCard({ title, description, type, image, date, location }: ActivityCardProps) {
  const { theme } = useTheme();
  
  // กำหนดสีตามประเภทกิจกรรม
  const typeColor = {
    'อบรม': 'bg-blue-600 text-white',
    'อาสา': 'bg-green-600 text-white',
    'ช่วยงาน': 'bg-purple-600 text-white',
  }[type];

  return (
    <div className={`rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
      theme === 'dark' ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-md'
    }`}>
      <div className="relative h-40">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${typeColor}`}>
          {type}
        </span>
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>{title}</h3>
        <p className={`text-sm mb-3 line-clamp-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{description}</p>
        <div className={`flex items-center text-sm mb-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>
        <div className={`flex items-center text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        <div className="mt-4">
          <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilterType[]>([]);
  
  // ข้อมูลกิจกรรมตัวอย่าง
  const activities: ActivityCardProps[] = [
    {
      title: 'อบรมการเขียนโปรแกรม Python',
      description: 'เรียนรู้การเขียนโปรแกรมด้วยภาษา Python ตั้งแต่พื้นฐานจนถึงขั้นสูง เหมาะสำหรับผู้เริ่มต้น',
      type: 'อบรม',
      image: '/uxui.png',
      date: '15 พ.ค. 2566',
      location: 'ห้องปฏิบัติการคอมพิวเตอร์ อาคาร IT',
    },
    {
      title: 'ปลูกป่าชายเลน',
      description: 'ร่วมกันปลูกป่าชายเลนเพื่อรักษาระบบนิเวศชายฝั่งและลดการกัดเซาะชายฝั่ง',
      type: 'อาสา',
      image: '/uxui.png',
      date: '22 พ.ค. 2566',
      location: 'ป่าชายเลนบางปู จ.สมุทรปราการ',
    },
    {
      title: 'งานวิ่งการกุศล Run for Wildlife',
      description: 'ช่วยงานจัดการแข่งขันวิ่งการกุศลเพื่อระดมทุนช่วยเหลือสัตว์ป่า',
      type: 'ช่วยงาน',
      image: '/uxui.png',
      date: '30 พ.ค. 2566',
      location: 'สวนสาธารณะสวนหลวง ร.9',
    },
    {
      title: 'อบรมปฐมพยาบาลเบื้องต้น',
      description: 'เรียนรู้วิธีการปฐมพยาบาลเบื้องต้นในสถานการณ์ฉุกเฉิน การช่วยฟื้นคืนชีพ (CPR) และการใช้เครื่อง AED',
      type: 'อบรม',
      image: '/uxui.png',
      date: '5 มิ.ย. 2566',
      location: 'ห้องประชุมคณะพยาบาลศาสตร์',
    },
  ];

  // ฟังก์ชันสำหรับการจัดการการค้นหา
  const handleSearch = (query: string, filters: SearchFilterType[]) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  // กรองกิจกรรมตามประเภทที่เลือก
  const filteredActivities = activities
    .filter(activity => {
      // กรองตามประเภทที่เลือกจากปุ่ม
      if (selectedType && activity.type !== selectedType) {
        return false;
      }
      
      // กรองตามข้อความค้นหา
      if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !activity.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // กรองตามประเภทที่เลือกจาก SearchBar
      if (searchFilters.length > 0) {
        const activeFilters = searchFilters.filter(f => f.checked);
        if (activeFilters.length > 0) {
          const typeMap = {
            'training': 'อบรม',
            'volunteer': 'อาสา',
            'helper': 'ช่วยงาน'
          };
          
          // ตรวจสอบว่ามีฟิลเตอร์ที่เลือกตรงกับประเภทกิจกรรมหรือไม่
          const matchesFilter = activeFilters.some(filter => {
            return typeMap[filter.id as keyof typeof typeMap] === activity.type;
          });
          
          if (!matchesFilter) {
            return false;
          }
        }
      }
      
      return true;
    });

  return (
    <div className={`min-h-screen pl-64 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Search Bar */}
      <SearchBar 
        className="px-6 py-4" 
        onSearch={handleSearch}
      />
      
      <div className="p-6">
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            กิจกรรมแนะนำ
          </h1>
          
        </div>
        
        
      </div>
    </div>
  );
}

export default HomePage;