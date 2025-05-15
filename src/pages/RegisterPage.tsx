import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  // ซ่อน Navbar (ตอนนี้จัดการใน App.tsx แล้ว แต่ยังคงไว้เผื่อกรณีพิเศษ)
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  // สถานะสำหรับข้อมูลการสมัคร
  const [formData, setFormData] = useState({
    username: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
    faculty: '',
    major: '',
    phone: ''
  });

  // สถานะสำหรับการแสดง/ซ่อนรหัสผ่าน
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ตัวเลือกสำหรับคณะ/วิทยาลัย
  const faculties = [
    "คณะวิทยาศาสตร์",
    "คณะวิศวกรรมศาสตร์",
    "คณะมนุษยศาสตร์และสังคมศาสตร์"
  ];

  // ตัวเลือกสำหรับสาขาวิชา (อาจจะเปลี่ยนตามคณะที่เลือก)
  const majors: Record<string, string[]> = {
    "คณะวิทยาศาสตร์": ["วิทยาการคอมพิวเตอร์", "คณิตศาสตร์", "ฟิสิกส์"],
    "คณะวิศวกรรมศาสตร์": ["วิศวกรรมคอมพิวเตอร์", "วิศวกรรมไฟฟ้า", "วิศวกรรมโยธา"],
    "คณะมนุษยศาสตร์และสังคมศาสตร์": ["ภาษาอังกฤษ", "รัฐศาสตร์", "นิติศาสตร์"]
  };

  // ตัวเลือกสาขาวิชาที่จะแสดงให้ผู้ใช้ขึ้นกับคณะที่เลือก
  const availableMajors = formData.faculty ? majors[formData.faculty] || [] : [];

  // ฟังก์ชันสำหรับการอัปเดตข้อมูลฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // รีเซ็ตสาขาเมื่อมีการเปลี่ยนคณะ
    if (name === 'faculty') {
      setFormData(prev => ({
        ...prev,
        major: ''
      }));
    }
  };

  // ฟังก์ชันสำหรับการสลับแสดง/ซ่อนรหัสผ่าน
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ฟังก์ชันสำหรับการสลับแสดง/ซ่อนยืนยันรหัสผ่าน
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // ตรวจสอบข้อมูล
    if (formData.password !== formData.confirmPassword) {
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!/^\d{8}$/.test(formData.studentId)) {
      alert('รหัสนิสิตต้องเป็นตัวเลข 8 หลัก');
      return;
    }

    // ในโค้ดจริงจะมีการส่งข้อมูลไปยัง API
    console.log('ข้อมูลที่ส่ง:', formData);
    
    // นำทางกลับไปยังหน้า login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4">
      {/* ส่วนหัว - โลโก้และชื่อระบบ */}
      <div className="flex items-center mb-4">
        <img 
          src="/logo.png" 
          alt="ระบบจัดการงานอาสา" 
          className="h-12 w-12"
        />
        <h1 className="text-lg font-bold text-gray-800 ml-2">ระบบจัดการงานอาสาและกิจกรรมมหาวิทยาลัย</h1>
      </div>
      
      {/* ส่วนฟอร์มสมัครสมาชิก */}
      <div className="w-full max-w-lg p-6 border-2 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-2">สมัครสมาชิก</h2>
        <p className="text-center text-gray-600 mb-6">สร้างบัญชีใหม่เพื่อเข้าใช้งานระบบ</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ชื่อผู้ใช้ */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label htmlFor="username" className="flex items-center mb-1 text-gray-700">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span className="text-sm font-medium">ชื่อผู้ใช้</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="กรุณากรอกชื่อผู้ใช้"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* รหัสนิสิต */}
            <div className="w-1/2">
              <label htmlFor="studentId" className="flex items-center mb-1 text-gray-700">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                </svg>
                <span className="text-sm font-medium">รหัสนิสิต</span>
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="กรุณากรอกรหัสนิสิต 8 ตัว"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                maxLength={8}
                required
              />
            </div>
          </div>
          
          {/* อีเมล */}
          <div>
            <label htmlFor="email" className="flex items-center mb-1 text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span className="text-sm font-medium">อีเมล</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรุณากรอกอีเมล"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* รหัสผ่าน */}
          <div>
            <label htmlFor="password" className="flex items-center mb-1 text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span className="text-sm font-medium">รหัสผ่าน</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="กรุณากรอกรหัสผ่าน"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                required
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                aria-label="toggle password visibility"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* ยืนยันรหัสผ่าน */}
          <div>
            <label htmlFor="confirmPassword" className="flex items-center mb-1 text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span className="text-sm font-medium">ยืนยันรหัสผ่าน</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="กรุณายืนยันรหัสผ่าน"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                required
              />
              <button 
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                aria-label="toggle password visibility"
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* คณะ/วิทยาลัย */}
            <div className="w-1/2">
              <label htmlFor="faculty" className="flex items-center mb-1 text-gray-700">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <span className="text-sm font-medium">คณะ/วิทยาลัย</span>
              </label>
              <div className="relative">
                <select
                  id="faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  required
                >
                  <option value="" disabled>กรุณาเลือกคณะหรือวิทยาลัย</option>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>{faculty}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* สาขา */}
            <div className="w-1/2">
              <label htmlFor="major" className="flex items-center mb-1 text-gray-700">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <span className="text-sm font-medium">สาขา</span>
              </label>
              <div className="relative">
                <select
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  required
                  disabled={!formData.faculty}
                >
                  <option value="" disabled>กรุณาเลือกสาขา</option>
                  {availableMajors.map((major, index) => (
                    <option key={index} value={major}>{major}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* เบอร์โทรศัพท์ */}
          <div>
            <label htmlFor="phone" className="flex items-center mb-1 text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span className="text-sm font-medium">เบอร์โทรศัพท์</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* ปุ่มสมัครสมาชิก */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md mt-4"
          >
            สมัครสมาชิก
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              มีบัญชีอยู่แล้ว? <Link to="/login" className="text-blue-600 hover:underline">เข้าสู่ระบบ</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;