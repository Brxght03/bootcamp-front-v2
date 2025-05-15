import { useState, useEffect } from 'react';
import { useTheme } from '../stores/theme.store';
import SearchBar from '../components/SearchBar';
import EventCard, { EventCardProps } from '../components/EventCard';
import { EventSectionCard } from '../components/layouts';
import Carousel from '../components/Carousel';

// ประเภทสำหรับฟิลเตอร์การค้นหา
interface SearchFilterType {
  id: string;
  label: string;
  checked: boolean;
}

function HomePage() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilterType[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // ข้อมูลกิจกรรมตัวอย่าง
  const events: EventCardProps[] = [
    {
      id: "1",
      title: 'อบรมการเขียนโปรแกรม Python สำหรับผู้เริ่มต้น',
      description: 'เรียนรู้การเขียนโปรแกรมด้วยภาษา Python ตั้งแต่พื้นฐานจนถึงขั้นสูง เหมาะสำหรับผู้เริ่มต้นที่ไม่มีประสบการณ์การเขียนโค้ดมาก่อน',
      eventType: 'อบรม',
      image: '/uxui.png',
      organizer: 'ชมรมคอมพิวเตอร์',
      startDate: '15 พ.ค. 2566',
      endDate: '16 พ.ค. 2566',
      maxParticipants: 30,
      score: 2,
      hours: 6,
      location: 'ห้องปฏิบัติการคอมพิวเตอร์ อาคาร IT',
    },
    {
      id: "2",
      title: 'ปลูกป่าชายเลนเพื่อโลกสีเขียว',
      description: 'ร่วมกันปลูกป่าชายเลนเพื่อรักษาระบบนิเวศชายฝั่งและลดการกัดเซาะชายฝั่ง พร้อมเรียนรู้ความสำคัญของระบบนิเวศป่าชายเลน',
      eventType: 'อาสา',
      image: '/uxui.png',
      organizer: 'ชมรมอนุรักษ์สิ่งแวดล้อม',
      startDate: '22 พ.ค. 2566',
      endDate: '22 พ.ค. 2566',
      maxParticipants: 50,
      score: 5,
      hours: 8,
      location: 'ป่าชายเลนบางปู จ.สมุทรปราการ',
    },
    {
      id: "3",
      title: 'งานวิ่งการกุศล Run for Wildlife',
      description: 'ช่วยงานจัดการแข่งขันวิ่งการกุศลเพื่อระดมทุนช่วยเหลือสัตว์ป่าที่ใกล้สูญพันธุ์ในประเทศไทย ผู้เข้าร่วมได้รับประสบการณ์ในการจัดงานขนาดใหญ่',
      eventType: 'ช่วยงาน',
      image: '/uxui.png',
      organizer: 'สโมสรนิสิต',
      startDate: '30 พ.ค. 2566',
      endDate: '30 พ.ค. 2566',
      maxParticipants: 20,
      score: 3,
      hours: 5,
      location: 'สวนสาธารณะสวนหลวง ร.9',
    },
    {
      id: "4",
      title: 'อบรมปฐมพยาบาลเบื้องต้นและการช่วยชีวิต',
      description: 'เรียนรู้วิธีการปฐมพยาบาลเบื้องต้นในสถานการณ์ฉุกเฉิน การช่วยฟื้นคืนชีพ (CPR) และการใช้เครื่อง AED โดยวิทยากรผู้เชี่ยวชาญ',
      eventType: 'อบรม',
      image: '/uxui.png',
      organizer: 'คณะพยาบาลศาสตร์',
      startDate: '5 มิ.ย. 2566',
      endDate: '5 มิ.ย. 2566',
      maxParticipants: 40,
      score: 3,
      hours: 6,
      location: 'ห้องประชุมคณะพยาบาลศาสตร์',
    },
    {
      id: "5",
      title: 'ค่ายอาสาพัฒนาโรงเรียน',
      description: 'ร่วมกันสร้างห้องสมุดและปรับปรุงสนามเด็กเล่นให้กับโรงเรียนในถิ่นทุรกันดาร พร้อมจัดกิจกรรมส่งเสริมการอ่านและกีฬาให้เด็กนักเรียน',
      eventType: 'อาสา',
      image: '/uxui.png',
      organizer: 'ชมรมค่ายอาสา',
      startDate: '10 มิ.ย. 2566',
      endDate: '13 มิ.ย. 2566',
      maxParticipants: 25,
      score: 10,
      hours: 32,
      location: 'โรงเรียนบ้านห้วยกระทิง จ.ตาก',
    },
    {
      id: "6",
      title: 'อบรมทักษะการนำเสนอและการพูดในที่สาธารณะ',
      description: 'พัฒนาทักษะการนำเสนองานอย่างมืออาชีพและเทคนิคการพูดในที่สาธารณะ เพิ่มความมั่นใจในการสื่อสาร',
      eventType: 'อบรม',
      image: '/uxui.png',
      organizer: 'ชมรมพัฒนาศักยภาพนิสิต',
      startDate: '18 มิ.ย. 2566',
      endDate: '19 มิ.ย. 2566',
      maxParticipants: 35,
      score: 2,
      hours: 8,
      location: 'ห้องประชุมคณะมนุษยศาสตร์',
    },
    {
      id: "7",
      title: 'งานบริจาคโลหิตเพื่อช่วยเหลือผู้ป่วย',
      description: 'ช่วยงานรับบริจาคโลหิต ซึ่งจะนำไปช่วยเหลือผู้ป่วยในโรงพยาบาลที่ขาดแคลน',
      eventType: 'ช่วยงาน',
      image: '/uxui.png',
      organizer: 'สภากาชาดไทย',
      startDate: '25 มิ.ย. 2566',
      endDate: '25 มิ.ย. 2566',
      maxParticipants: 15,
      score: 2,
      hours: 4,
      location: 'หอประชุมมหาวิทยาลัย',
    },
    {
      id: "8",
      title: 'โครงการสอนน้อง ปันความรู้สู่ชุมชน',
      description: 'ร่วมเป็นอาสาสมัครสอนวิชาคณิตศาสตร์และวิทยาศาสตร์ให้กับเด็กนักเรียนในชุมชนที่ขาดแคลนโอกาสทางการศึกษา',
      eventType: 'อาสา',
      image: '/uxui.png',
      organizer: 'ชมรมจิตอาสา',
      startDate: '1 ก.ค. 2566',
      endDate: '31 ก.ค. 2566',
      maxParticipants: 20,
      score: 8,
      hours: 24,
      location: 'โรงเรียนในชุมชนรอบมหาวิทยาลัย',
    },
    {
      id: "9",
      title: 'อบรมการประกอบคอมพิวเตอร์และการแก้ไขปัญหาเบื้องต้น',
      description: 'เรียนรู้วิธีการประกอบคอมพิวเตอร์ด้วยตนเอง เลือกซื้ออุปกรณ์ให้เหมาะสม และการแก้ไขปัญหาที่พบบ่อย',
      eventType: 'อบรม',
      image: '/uxui.png',
      organizer: 'ชมรมคอมพิวเตอร์',
      startDate: '2 ก.ค. 2566',
      endDate: '3 ก.ค. 2566',
      maxParticipants: 30,
      score: 2,
      hours: 6,
      location: 'ห้องปฏิบัติการคอมพิวเตอร์ อาคาร IT',
    },
  ];

  // แยกกิจกรรมตามประเภท
  const trainingEvents = events.filter(event => event.eventType === 'อบรม');
  const volunteerEvents = events.filter(event => event.eventType === 'อาสา');
  const helperEvents = events.filter(event => event.eventType === 'ช่วยงาน');
  
  // รูปภาพสำหรับ Carousel
  const carouselImages = [
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 1',
      caption: 'crin X เม.พะเยา ร่วมสร้างนักพัฒนาเกมบนมือถือผ่านสากล'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 2',
      caption: 'อบรมการเขียนโปรแกรม Python'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 3',
      caption: 'ปลูกป่าชายเลนเพื่อโลกสีเขียว'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 4',
      caption: 'งานวิ่งการกุศล Run for Wildlife'
    },
    {
      src: '/uxui.png',
      alt: 'กิจกรรมที่ 5',
      caption: 'อบรมปฐมพยาบาลเบื้องต้น'
    },
  ];

  // ฟังก์ชันสำหรับการจัดการการค้นหา
  const handleSearch = (query: string, filters: SearchFilterType[]) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  // ฟังก์ชันกรองกิจกรรมตามประเภท
  const getFilteredEvents = () => {
    if (activeTab === 'all') return events;
    if (activeTab === 'training') return trainingEvents;
    if (activeTab === 'volunteer') return volunteerEvents;
    if (activeTab === 'helper') return helperEvents;
    return events;
  };

  // ฟังก์ชันเปลี่ยนแท็บที่เลือก
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Search Bar */}
      <SearchBar 
        className="px-6 py-4" 
        onSearch={handleSearch}
      />
      
      <div className="p-6 pb-12">
        {/* หัวข้อหลัก */}
        <h1 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          กิจกรรมของมหาวิทยาลัย
        </h1>
        
        {/* Carousel */}
        <div className="mb-8">
          <Carousel 
            images={carouselImages}
            autoPlay={true}
            interval={5000}
            showIndicators={true}
            showArrows={true}
          />
        </div>
        
        {/* แท็บเลือกประเภทกิจกรรม */}
        <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
          <button 
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'all'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ทั้งหมด
          </button>
          <button 
            onClick={() => handleTabChange('training')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'training'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            อบรม
          </button>
          <button 
            onClick={() => handleTabChange('volunteer')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'volunteer'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            อาสา
          </button>
          <button 
            onClick={() => handleTabChange('helper')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === 'helper'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ช่วยงาน
          </button>
        </div>
        
        {/* แสดงกิจกรรมตามแท็บที่เลือก */}
        {activeTab === 'all' && (
          <>
            {/* กิจกรรมประเภทอบรม */}
            <EventSectionCard
              title="กิจกรรม"
              eventType="อบรม"
              events={trainingEvents}
              showMoreLink="/events/training"
            />
            
            {/* กิจกรรมประเภทอาสา */}
            <EventSectionCard
              title="กิจกรรม"
              eventType="อาสา"
              events={volunteerEvents}
              showMoreLink="/events/volunteer"
            />
            
            {/* กิจกรรมประเภทช่วยงาน */}
            <EventSectionCard
              title="กิจกรรม"
              eventType="ช่วยงาน"
              events={helperEvents}
              showMoreLink="/events/helper"
            />
          </>
        )}
        
        {activeTab === 'training' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
        
        {activeTab === 'volunteer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
        
        {activeTab === 'helper' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helperEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;