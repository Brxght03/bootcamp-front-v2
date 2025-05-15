import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../stores/theme.store';
import EventCard, { EventCardProps } from '../components/EventCard';
import SearchBar from '../components/SearchBar';

// ตัวเลือกประเภทกิจกรรม
type EventType = 'อบรม' | 'อาสา' | 'ช่วยงาน';

// ข้อมูลตัวอย่างของกิจกรรม (Mock Data)
const mockEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'ปลูกป่าชายเลนเพื่อโลกสีเขียว',
    description: 'ร่วมกันปลูกป่าชายเลนเพื่อรักษาระบบนิเวศชายฝั่งและลดการกัดเซาะชายฝั่ง',
    type: 'อาสา',
    organizer: 'ชมรมอนุรักษ์สิ่งแวดล้อม',
    startDate: '22 พ.ค. 2566',
    endDate: '22 พ.ค. 2566',
    location: 'ป่าชายเลนบางปู จ.สมุทรปราการ',
    imageUrl: '/path/to/image1.jpg',
  },
  {
    id: '2',
    title: 'ค่ายอาสาพัฒนาโรงเรียน',
    description: 'ร่วมกันสร้างห้องสมุดและปรับปรุงสนามเด็กเล่นให้กับโรงเรียนในถิ่นทุรกันดาร',
    type: 'อาสา',
    organizer: 'ชมรมค่ายอาสา',
    startDate: '10 มิ.ย. 2566',
    endDate: '13 มิ.ย. 2566',
    location: 'โรงเรียนบ้านห้วยกระทิง จ.ตาก',
    imageUrl: '/path/to/image2.jpg',
  },
  {
    id: '3',
    title: 'โครงการสอนน้อง ปันความรู้สู่ชุมชน',
    description: 'ร่วมเป็นอาสาสมัครสอนวิชาคณิตศาสตร์และวิทยาศาสตร์ให้กับเด็กนักเรียนในชุมชนที่ขาดแคลนโอกาสทางการศึกษา',
    type: 'อาสา',
    organizer: 'ชมรมจิตอาสา',
    startDate: '1 ก.ค. 2566',
    endDate: '31 ก.ค. 2566',
    location: 'โรงเรียนในชุมชนรอบมหาวิทยาลัย',
    imageUrl: '/path/to/image3.jpg',
  },
  {
    id: '4',
    title: 'อบรมการเขียนโปรแกรม Python',
    description: 'เรียนรู้การเขียนโปรแกรมด้วยภาษา Python ตั้งแต่พื้นฐานจนถึงขั้นสูง เหมาะสำหรับผู้เริ่มต้น',
    type: 'อบรม',
    organizer: 'ชมรมคอมพิวเตอร์',
    startDate: '15 พ.ค. 2566',
    endDate: '16 พ.ค. 2566',
    location: 'ห้องปฏิบัติการคอมพิวเตอร์ อาคาร IT',
    imageUrl: '/path/to/image4.jpg',
  },
  {
    id: '5',
    title: 'อบรมการใช้งาน Adobe Photoshop เบื้องต้น',
    description: 'เรียนรู้การใช้งาน Adobe Photoshop สำหรับการตกแต่งภาพและออกแบบกราฟิกเบื้องต้น',
    type: 'อบรม',
    organizer: 'ชมรมศิลปะดิจิทัล',
    startDate: '20 พ.ค. 2566',
    endDate: '21 พ.ค. 2566',
    location: 'ห้องปฏิบัติการคอมพิวเตอร์ คณะศิลปกรรมศาสตร์',
    imageUrl: '/path/to/image5.jpg',
  },
  {
    id: '6',
    title: 'อบรมการพูดในที่สาธารณะ',
    description: 'พัฒนาทักษะการพูดในที่สาธารณะ การนำเสนองาน และเทคนิคการสื่อสารอย่างมีประสิทธิภาพ',
    type: 'อบรม',
    organizer: 'ชมรมนักพูด',
    startDate: '25 พ.ค. 2566',
    endDate: '26 พ.ค. 2566',
    location: 'ห้องประชุมคณะมนุษยศาสตร์',
    imageUrl: '/path/to/image6.jpg',
  },
  {
    id: '7',
    title: 'ช่วยงานจัดนิทรรศการวิทยาศาสตร์',
    description: 'ร่วมเป็นส่วนหนึ่งในการจัดนิทรรศการวิทยาศาสตร์สำหรับเยาวชน ในงานสัปดาห์วิทยาศาสตร์แห่งชาติ',
    type: 'ช่วยงาน',
    organizer: 'คณะวิทยาศาสตร์',
    startDate: '18 ส.ค. 2566',
    endDate: '20 ส.ค. 2566',
    location: 'อาคารวิทยาศาสตร์',
    imageUrl: '/path/to/image7.jpg',
  },
  {
    id: '8',
    title: 'ช่วยงานรับน้องปฐมนิเทศ',
    description: 'ร่วมเป็นพี่เลี้ยงให้กับนิสิตใหม่ในงานปฐมนิเทศ แนะนำการใช้ชีวิตในมหาวิทยาลัย',
    type: 'ช่วยงาน',
    organizer: 'สโมสรนิสิต',
    startDate: '15 มิ.ย. 2566',
    endDate: '17 มิ.ย. 2566',
    location: 'หอประชุมมหาวิทยาลัย',
    imageUrl: '/path/to/image8.jpg',
  },
  {
    id: '9',
    title: 'ช่วยงานวิ่งการกุศล Run for Wildlife',
    description: 'ช่วยงานจัดการแข่งขันวิ่งการกุศลเพื่อระดมทุนช่วยเหลือสัตว์ป่า',
    type: 'ช่วยงาน',
    organizer: 'ชมรมอนุรักษ์สัตว์ป่า',
    startDate: '30 พ.ค. 2566',
    endDate: '30 พ.ค. 2566',
    location: 'สวนสาธารณะสวนหลวง ร.9',
    imageUrl: '/path/to/image9.jpg',
  },
  {
    id: '10',
    title: 'ปลูกต้นไม้ริมคลอง',
    description: 'ร่วมกันปลูกต้นไม้ริมคลองเพื่อเพิ่มพื้นที่สีเขียวและป้องกันการพังทลายของตลิ่ง',
    type: 'อาสา',
    organizer: 'ชมรมอนุรักษ์สิ่งแวดล้อม',
    startDate: '5 มิ.ย. 2566',
    endDate: '5 มิ.ย. 2566',
    location: 'คลองแสนแสบ',
    imageUrl: '/path/to/image10.jpg',
  },
  {
    id: '11',
    title: 'ค่ายอาสาสร้างฝายชะลอน้ำ',
    description: 'ร่วมสร้างฝายชะลอน้ำเพื่อรักษาความชุ่มชื้นให้ผืนป่าและแก้ปัญหาภัยแล้ง',
    type: 'อาสา',
    organizer: 'ชมรมค่ายอาสา',
    startDate: '20 มิ.ย. 2566',
    endDate: '23 มิ.ย. 2566',
    location: 'อุทยานแห่งชาติดอยอินทนนท์ จ.เชียงใหม่',
    imageUrl: '/path/to/image11.jpg',
  },
  {
    id: '12',
    title: 'อาสาเลี้ยงอาหารผู้สูงอายุ',
    description: 'ร่วมเลี้ยงอาหารกลางวันและทำกิจกรรมสันทนาการให้กับผู้สูงอายุในสถานสงเคราะห์',
    type: 'อาสา',
    organizer: 'ชมรมจิตอาสา',
    startDate: '12 ก.ค. 2566',
    endDate: '12 ก.ค. 2566',
    location: 'สถานสงเคราะห์คนชรา',
    imageUrl: '/path/to/image12.jpg',
  },
  {
    id: '13',
    title: 'อบรมเทคนิคการถ่ายภาพมืออาชีพ',
    description: 'เรียนรู้เทคนิคการถ่ายภาพระดับมืออาชีพ ทั้งการจัดองค์ประกอบและการใช้กล้อง DSLR/Mirrorless',
    type: 'อบรม',
    organizer: 'ชมรมถ่ายภาพ',
    startDate: '1 มิ.ย. 2566',
    endDate: '2 มิ.ย. 2566',
    location: 'ห้องสตูดิโอถ่ายภาพ คณะนิเทศศาสตร์',
    imageUrl: '/path/to/image13.jpg',
  },
  {
    id: '14',
    title: 'อบรมการทำอาหารเพื่อสุขภาพ',
    description: 'เรียนรู้เทคนิคการประกอบอาหารเพื่อสุขภาพ ที่ทั้งอร่อยและมีประโยชน์',
    type: 'อบรม',
    organizer: 'ชมรมอาหารและโภชนาการ',
    startDate: '10 มิ.ย. 2566',
    endDate: '10 มิ.ย. 2566',
    location: 'ห้องปฏิบัติการอาหาร คณะคหกรรมศาสตร์',
    imageUrl: '/path/to/image14.jpg',
  },
  {
    id: '15',
    title: 'อบรมภาษาอังกฤษเพื่อการสื่อสาร',
    description: 'พัฒนาทักษะภาษาอังกฤษเพื่อการสื่อสารในชีวิตประจำวันและการทำงาน',
    type: 'อบรม',
    organizer: 'ชมรมภาษาอังกฤษ',
    startDate: '15 มิ.ย. 2566',
    endDate: '16 มิ.ย. 2566',
    location: 'ห้องเรียน 301 อาคารเรียนรวม',
    imageUrl: '/path/to/image15.jpg',
  },
  {
    id: '16',
    title: 'ช่วยงานประชาสัมพันธ์งานเปิดบ้าน',
    description: 'ร่วมเป็นทีมประชาสัมพันธ์และต้อนรับในงานเปิดบ้านมหาวิทยาลัยประจำปี',
    type: 'ช่วยงาน',
    organizer: 'ฝ่ายประชาสัมพันธ์',
    startDate: '25 มิ.ย. 2566',
    endDate: '26 มิ.ย. 2566',
    location: 'มหาวิทยาลัย',
    imageUrl: '/path/to/image16.jpg',
  },
  {
    id: '17',
    title: 'ช่วยงานจัดการแข่งขันกีฬา',
    description: 'ร่วมเป็นกรรมการและทีมจัดการการแข่งขันกีฬาระหว่างคณะ',
    type: 'ช่วยงาน',
    organizer: 'สโมสรนิสิต',
    startDate: '1 ก.ค. 2566',
    endDate: '5 ก.ค. 2566',
    location: 'สนามกีฬามหาวิทยาลัย',
    imageUrl: '/path/to/image17.jpg',
  },
  {
    id: '18',
    title: 'ช่วยงานห้องสมุด',
    description: 'ช่วยงานจัดเรียงหนังสือ บริการยืม-คืน และแนะนำการใช้ห้องสมุดให้กับนิสิตใหม่',
    type: 'ช่วยงาน',
    organizer: 'สำนักหอสมุด',
    startDate: '10 มิ.ย. 2566',
    endDate: '31 ก.ค. 2566',
    location: 'สำนักหอสมุด',
    imageUrl: '/path/to/image18.jpg',
  }
];

function EventTypePage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<EventCardProps[]>([]);
  const eventsPerPage = 9; // 3 x 3 grid

  // แปลงประเภทกิจกรรมจาก URL parameter (ที่อาจจะเป็นภาษาอังกฤษหรือถูกเข้ารหัส) เป็นภาษาไทย
  const getEventTypeFromParam = (): EventType => {
    if (type === 'training' || type === 'อบรม') return 'อบรม';
    if (type === 'volunteer' || type === 'อาสา') return 'อาสา';
    if (type === 'helper' || type === 'ช่วยงาน') return 'ช่วยงาน';
    return 'อบรม'; // ค่าเริ่มต้น
  };

  const eventType = getEventTypeFromParam();

  // กำหนดสีตามประเภทกิจกรรม
  const getEventTypeColor = (type: EventType): string => {
    const colorMap: Record<EventType, string> = {
      'อบรม': 'text-blue-600',
      'อาสา': 'text-green-600',
      'ช่วยงาน': 'text-purple-600'
    };
    return colorMap[type];
  };

  // กรองกิจกรรมตามประเภทและคำค้นหา
  useEffect(() => {
    const filtered = mockEvents.filter(event => {
      // กรองตามประเภท
      if (event.type !== eventType) return false;
      
      // กรองตามคำค้นหา (ถ้ามี)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower) ||
          event.organizer.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
    
    setFilteredEvents(filtered);
    setCurrentPage(1); // รีเซ็ตหน้าเมื่อมีการเปลี่ยนแปลงการกรอง
  }, [eventType, searchTerm]);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // อินเด็กซ์ของกิจกรรมแรกและสุดท้ายที่แสดงในหน้าปัจจุบัน
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // ฟังก์ชันเปลี่ยนหน้า
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // ฟังก์ชันสำหรับการค้นหา
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        {/* Header with Type */}
        <div className="flex items-center mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            ประเภท
          </h1>
          <span className={`ml-3 text-3xl font-bold ${getEventTypeColor(eventType)}`}>
            {eventType}
          </span>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={(query) => handleSearch(query)}
            className="mb-4"
          />
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
            />
          ))}
        </div>

        {/* ถ้าไม่มีกิจกรรมที่ตรงกับเงื่อนไข */}
        {currentEvents.length === 0 && (
          <div className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-xl">ไม่พบกิจกรรมที่ตรงกับเงื่อนไข</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className={`mt-4 px-4 py-2 rounded-md ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                ล้างการค้นหา
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md mr-2 ${
                currentPage === 1 
                  ? `${theme === 'dark' ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400'} cursor-not-allowed` 
                  : `${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-md mx-1 ${
                  currentPage === index + 1
                    ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                    : `${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ml-2 ${
                currentPage === totalPages 
                  ? `${theme === 'dark' ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400'} cursor-not-allowed` 
                  : `${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventTypePage;
