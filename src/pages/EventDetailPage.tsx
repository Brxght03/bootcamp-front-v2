import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../stores/theme.store';
import { CardContainer, CardBody, CardItem } from '../components/ui/3dCard';
import { mockEvents } from '../data/mockEvents';
import { EventCardProps } from '../components/EventCard';
import { useAuth } from '../hooks/UseAuth.hook';

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState<EventCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // โหลดข้อมูลกิจกรรม
  useEffect(() => {
    if (id) {
      // สมมติว่าเราใช้ mockEvents จากไฟล์ mockEvents.ts
      const foundEvent = mockEvents.find(e => e.id.toString() === id);
      
      if (foundEvent) {
        setEvent(foundEvent);
        // ตรวจสอบว่าผู้ใช้สมัครแล้วหรือยัง (จำลองจาก localStorage)
        const registeredEvents = localStorage.getItem('registeredEvents');
        if (registeredEvents) {
          const eventIds = JSON.parse(registeredEvents) as string[];
          setIsRegistered(eventIds.includes(id));
        }
      }
      
      setLoading(false);
    }
  }, [id]);

  // ฟังก์ชันจัดการการสมัครกิจกรรม
  const handleRegister = () => {
    if (!isAuthenticated) {
      // ถ้ายังไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
      navigate('/login', { state: { from: `/events/detail/${id}` } });
      return;
    }
    
    setShowConfirmDialog(true);
  };

  // ฟังก์ชันยืนยันการสมัครกิจกรรม
  const confirmRegistration = () => {
    // บันทึกข้อมูลการสมัครลงใน localStorage
    const registeredEvents = localStorage.getItem('registeredEvents');
    let eventIds: string[] = [];
    
    if (registeredEvents) {
      eventIds = JSON.parse(registeredEvents);
    }
    
    if (!eventIds.includes(id!)) {
      eventIds.push(id!);
      localStorage.setItem('registeredEvents', JSON.stringify(eventIds));
    }
    
    setIsRegistered(true);
    setShowConfirmDialog(false);
  };

  // ฟังก์ชันยกเลิกการแสดง dialog
  const cancelRegistration = () => {
    setShowConfirmDialog(false);
  };

  // กำหนดสีตามประเภทกิจกรรม
  const getEventTypeColor = (type: string): string => {
    switch (type) {
      case 'อบรม':
        return theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
      case 'อาสา':
        return theme === 'dark' ? 'text-green-400' : 'text-green-600';
      case 'ช่วยงาน':
        return theme === 'dark' ? 'text-purple-400' : 'text-purple-600';
      default:
        return '';
    }
  };

  // ถ้ากำลังโหลด ให้แสดง loading
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ถ้าไม่พบกิจกรรม
  if (!event) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <h1 className="text-2xl font-bold mb-4">ไม่พบกิจกรรมที่ต้องการ</h1>
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          กลับไปหน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        {/* ชื่อกิจกรรม */}
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {event.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* คอลัมน์ซ้าย - แสดงการ์ด 3D */}
          <div>
            <CardContainer className="py-0">
              <CardBody className={`relative w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl border border-gray-200 shadow-xl p-6`}>
                {/* รูปภาพกิจกรรม */}
                <CardItem translateZ="100" className="w-full">
                  <img
                    src={event.image || "/api/placeholder/600/400"}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                </CardItem>

                {/* ข้อมูลผู้จัด */}
                <CardItem translateZ="50" className="w-full mt-2">
                  <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="font-medium">ผู้จัด : {event.organizer}</span>
                  </div>
                </CardItem>

                {/* สถานะ */}
                <CardItem translateZ="50" className="w-full mt-4">
                  <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">สถานะ :</span>
                      <span className="text-blue-600 font-medium">รับสมัคร</span>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          {/* คอลัมน์ขวา - รายละเอียดกิจกรรม */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl border border-gray-200 shadow-md`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              รายละเอียด
            </h2>
            
            <div className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>{event.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* ประเภท */}
              <div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  ประเภท
                </h3>
                <p className={`font-medium ${getEventTypeColor(event.eventType)}`}>
                  {event.eventType}
                </p>
              </div>
              
              {/* ระยะเวลา */}
              <div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  ระยะเวลา
                </h3>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {event.startDate} - {event.endDate}
                </p>
              </div>
              
              {/* จำนวนรับสมัคร */}
              <div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  จำนวนรับสมัคร
                </h3>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  0 / {event.maxParticipants} คน
                </p>
              </div>
              
              {/* จำนวนคะแนนที่ได้รับ */}
              <div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  จำนวนคะแนนที่ได้รับ
                </h3>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {event.score} คะแนน
                </p>
              </div>
              
              {/* จำนวนชั่วโมงที่ได้รับ */}
              <div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  จำนวนชั่วโมงที่ได้รับ
                </h3>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {event.hours} ชั่วโมง
                </p>
              </div>
              
              {/* สถานที่ */}
              <div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  สถานที่
                </h3>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {event.location}
                </p>
              </div>
            </div>

              {/* ปุ่มสมัครกิจกรรม */}
              <div className="mt-2">
              {isRegistered ? (
                <button 
                  disabled
                  className="w-full py-2 px-4 bg-gray-500 text-white font-medium rounded-md cursor-not-allowed"
                >
                  สมัครแล้ว
                </button>
              ) : (
                <button 
                  onClick={handleRegister}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  สมัครกิจกรรม
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className={`max-w-md w-full p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              ยืนยันการสมัครกิจกรรม
            </h2>
            <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {event.title}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={cancelRegistration}
                className={`flex-1 py-2 px-4 rounded-md border ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmRegistration}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetailPage;