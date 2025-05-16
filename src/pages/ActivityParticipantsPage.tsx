import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../stores/theme.store";

// ประเภทข้อมูลสำหรับผู้เข้าร่วมกิจกรรม
interface ParticipantItem {
  id: string;
  name: string;
  studentId: string;
  faculty: string;
  major: string;
  registrationDate: string;
  attendanceStatus: "มาเข้าร่วม" | "ไม่ได้เข้าร่วม" | "รอเข้าร่วม";
}

// ประเภทข้อมูลสำหรับกิจกรรม
interface ActivityDetail {
  id: string;
  title: string;
  eventType: "อบรม" | "อาสา" | "ช่วยงาน";
  startDate: string;
  endDate: string;
  status: "รับสมัคร" | "กำลังดำเนินการ" | "เสร็จสิ้น" | "ยกเลิก";
  participants: number;
  maxParticipants: number;
}

// ประเภทสำหรับการเรียงข้อมูล
type SortField =
  | "name"
  | "studentId"
  | "faculty"
  | "major"
  | "registrationDate"
  | "attendanceStatus";
type SortOrder = "asc" | "desc";

function ActivityParticipantsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [activityDetail, setActivityDetail] = useState<ActivityDetail | null>(
    null
  );
  const [participants, setParticipants] = useState<ParticipantItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>("registrationDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // โหลดข้อมูลกิจกรรมและผู้เข้าร่วม
  useEffect(() => {
    // จำลองการโหลดข้อมูล (ในระบบจริงควรใช้ API)
    setLoading(true);

    // จำลองข้อมูลรายละเอียดกิจกรรม
    const mockActivityDetail: ActivityDetail = {
      id: id || "1",
      title:
        id === "1"
          ? "BootCampCPE"
          : id === "2"
          ? "ปลูกป่าชายเลนเพื่อโลกสีเขียว"
          : id === "3"
          ? "งานวิ่งการกุศล Run for Wildlife"
          : `กิจกรรม ${id}`,
      eventType:
        id === "1"
          ? "อบรม"
          : id === "2"
          ? "อาสา"
          : id === "3"
          ? "ช่วยงาน"
          : "อบรม",
      startDate: "17/05/2568",
      endDate: "18/05/2568",
      status: "รับสมัคร",
      participants: 25,
      maxParticipants: 30,
    };

    // จำลองข้อมูลผู้เข้าร่วมกิจกรรม
    const mockParticipants: ParticipantItem[] = [
      {
        id: "1",
        name: "นายสมชาย ใจดี",
        studentId: "65015001",
        faculty: "คณะวิทยาศาสตร์",
        major: "วิทยาการคอมพิวเตอร์",
        registrationDate: "10/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "2",
        name: "นางสาวสมหญิง รักเรียน",
        studentId: "65015002",
        faculty: "คณะวิศวกรรมศาสตร์",
        major: "วิศวกรรมคอมพิวเตอร์",
        registrationDate: "11/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "3",
        name: "นายวิชัย เก่งกาจ",
        studentId: "65015003",
        faculty: "คณะวิทยาศาสตร์",
        major: "ฟิสิกส์",
        registrationDate: "12/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "4",
        name: "นางสาวแก้วตา สว่างศรี",
        studentId: "65015004",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        major: "ภาษาอังกฤษ",
        registrationDate: "12/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "5",
        name: "นายภูมิ ปัญญาดี",
        studentId: "65015005",
        faculty: "คณะวิศวกรรมศาสตร์",
        major: "วิศวกรรมไฟฟ้า",
        registrationDate: "13/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "6",
        name: "นางสาวนิภา ใจงาม",
        studentId: "65015006",
        faculty: "คณะวิทยาศาสตร์",
        major: "คณิตศาสตร์",
        registrationDate: "13/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "7",
        name: "นายอนันต์ มากมี",
        studentId: "65015007",
        faculty: "คณะวิศวกรรมศาสตร์",
        major: "วิศวกรรมโยธา",
        registrationDate: "14/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "8",
        name: "นางสาวกานดา รักดี",
        studentId: "65015008",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        major: "รัฐศาสตร์",
        registrationDate: "14/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "9",
        name: "นายพงศกร เพียรเรียน",
        studentId: "65015009",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        major: "นิติศาสตร์",
        registrationDate: "15/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "10",
        name: "นางสาวมินตรา ใจซื่อ",
        studentId: "65015010",
        faculty: "คณะวิทยาศาสตร์",
        major: "วิทยาการคอมพิวเตอร์",
        registrationDate: "15/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "11",
        name: "นายธนกร รวยทรัพย์",
        studentId: "65015011",
        faculty: "คณะวิศวกรรมศาสตร์",
        major: "วิศวกรรมคอมพิวเตอร์",
        registrationDate: "15/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "12",
        name: "นางสาววรรณิกา รักธรรม",
        studentId: "65015012",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        major: "ภาษาอังกฤษ",
        registrationDate: "15/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "13",
        name: "นายพีรพล เรียนดี",
        studentId: "65015013",
        faculty: "คณะวิทยาศาสตร์",
        major: "ฟิสิกส์",
        registrationDate: "16/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "14",
        name: "นางสาวพนิดา งามพริ้ง",
        studentId: "65015014",
        faculty: "คณะวิศวกรรมศาสตร์",
        major: "วิศวกรรมไฟฟ้า",
        registrationDate: "16/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
      {
        id: "15",
        name: "นายณัฐพล ศรีสุวรรณ",
        studentId: "65015015",
        faculty: "คณะวิทยาศาสตร์",
        major: "คณิตศาสตร์",
        registrationDate: "16/05/2568",
        attendanceStatus: "รอเข้าร่วม",
      },
    ];

    setActivityDetail(mockActivityDetail);
    setParticipants(mockParticipants);
    setLoading(false);
  }, [id]);

  // ฟังก์ชันเรียงข้อมูล
  const sortParticipants = (field: SortField) => {
    if (sortField === field) {
      // ถ้าคลิกที่ฟิลด์เดิม ให้สลับลำดับการเรียง
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // ถ้าคลิกที่ฟิลด์ใหม่ ให้เรียงจากน้อยไปมาก
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนสถานะการเข้าร่วม
  const handleAttendanceChange = (
    participantId: string,
    status: "มาเข้าร่วม" | "ไม่ได้เข้าร่วม"
  ) => {
    setParticipants(
      participants.map((participant) =>
        participant.id === participantId
          ? { ...participant, attendanceStatus: status }
          : participant
      )
    );
  };

  // กรองและเรียงข้อมูล
  const filteredAndSortedParticipants = participants
    .filter(
      (participant) =>
        (participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          participant.studentId.includes(searchTerm) ||
          participant.faculty
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          participant.major.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "" || participant.attendanceStatus === filterStatus)
    )
    .sort((a, b) => {
      // เรียงตามฟิลด์ที่เลือก
      const compareA = String(a[sortField]).toLowerCase();
      const compareB = String(b[sortField]).toLowerCase();

      if (compareA < compareB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (compareA > compareB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

  // คำนวณหน้าปัจจุบัน
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedParticipants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    filteredAndSortedParticipants.length / itemsPerPage
  );

  // สีสถานะการเข้าร่วม
  const attendanceStatusColor = (status: string) => {
    switch (status) {
      case "มาเข้าร่วม":
        return theme === "dark" ? "text-green-400" : "text-green-600";
      case "ไม่ได้เข้าร่วม":
        return theme === "dark" ? "text-red-400" : "text-red-600";
      case "รอเข้าร่วม":
        return theme === "dark" ? "text-yellow-400" : "text-yellow-600";
      default:
        return "";
    }
  };

  // กำหนดสี header bar ตามธีม
  const getHeaderBarColor = () => {
    return theme === "dark"
      ? "bg-blue-800" // โทนสีน้ำเงินเข้มสำหรับ Dark Mode
      : "bg-blue-600"; // โทนสีน้ำเงินสำหรับ Light Mode
  };

  // แสดง loading ขณะโหลดข้อมูล
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ถ้าไม่พบข้อมูลกิจกรรม
  if (!activityDetail) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลกิจกรรม</h1>
        <button
          onClick={() => navigate("/staff/activities")}
          className={`px-4 py-2 rounded-md ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          กลับไปหน้ารายการกิจกรรม
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto">
        {/* ส่วนหัวของหน้า - แสดงข้อมูลกิจกรรม */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <button
              onClick={() => navigate("/staff/activities")}
              className={`mr-4 p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">รายชื่อผู้เข้าร่วมกิจกรรม</h1>
          </div>
          <div
            className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <h2 className="text-xl font-semibold mb-2">
              {activityDetail.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <span className="text-sm font-medium block">
                  ประเภทกิจกรรม:
                </span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {activityDetail.eventType}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium block">
                  วันที่จัดกิจกรรม:
                </span>
                <span>
                  {activityDetail.startDate} - {activityDetail.endDate}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium block">
                  จำนวนผู้เข้าร่วม:
                </span>
                <span>
                  {activityDetail.participants}/{activityDetail.maxParticipants}{" "}
                  คน
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนค้นหาและตัวกรอง */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาผู้เข้าร่วม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } border`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } border`}
            >
              <option value="">ทุกสถานะ</option>
              <option value="มาเข้าร่วม">มาเข้าร่วม</option>
              <option value="ไม่ได้เข้าร่วม">ไม่ได้เข้าร่วม</option>
              <option value="รอเข้าร่วม">รอเข้าร่วม</option>
            </select>
          </div>
        </div>

        {/* ตารางแสดงรายชื่อผู้เข้าร่วม */}
        <div
          className={`overflow-x-auto rounded-lg border ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${getHeaderBarColor()} text-white`}>
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium"
                >
                  ลำดับ
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sortParticipants("name")}
                >
                  <div className="flex items-center">
                    ชื่อผู้สมัคร
                    {sortField === "name" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sortParticipants("studentId")}
                >
                  <div className="flex items-center">
                    รหัสนิสิต
                    {sortField === "studentId" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sortParticipants("faculty")}
                >
                  <div className="flex items-center">
                    คณะ/วิทยาลัย
                    {sortField === "faculty" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sortParticipants("major")}
                >
                  <div className="flex items-center">
                    สาขา
                    {sortField === "major" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sortParticipants("registrationDate")}
                >
                  <div className="flex items-center">
                    วันที่สมัคร
                    {sortField === "registrationDate" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sortParticipants("attendanceStatus")}
                >
                  <div className="flex items-center">
                    สถานะการเข้าร่วม
                    {sortField === "attendanceStatus" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-medium"
                >
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                theme === "dark"
                  ? "divide-gray-700 bg-gray-800"
                  : "divide-gray-200 bg-white"
              }`}
            >
              {currentItems.length > 0 ? (
                currentItems.map((participant, index) => (
                  <tr
                    key={participant.id}
                    className={`hover:${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {participant.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {participant.studentId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div
                        className="truncate max-w-[150px]"
                        title={participant.faculty}
                      >
                        {participant.faculty}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div
                        className="truncate max-w-[150px]"
                        title={participant.major}
                      >
                        {participant.major}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {participant.registrationDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span
                        className={`font-medium ${attendanceStatusColor(
                          participant.attendanceStatus
                        )}`}
                      >
                        {participant.attendanceStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {/* ปุ่มบันทึกเข้าร่วม */}
                        <button
                          onClick={() =>
                            handleAttendanceChange(participant.id, "มาเข้าร่วม")
                          }
                          disabled={
                            participant.attendanceStatus === "มาเข้าร่วม"
                          }
                          className={`p-1 rounded-full ${
                            participant.attendanceStatus === "มาเข้าร่วม"
                              ? "opacity-50 cursor-not-allowed"
                              : theme === "dark"
                              ? "text-green-400 hover:bg-gray-700"
                              : "text-green-600 hover:bg-gray-200"
                          }`}
                          title="บันทึกเข้าร่วม"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>

                        {/* ปุ่มรีเซ็ตสถานะ */}
                        <button
                          onClick={() =>
                            handleAttendanceChange(participant.id, "รอเข้าร่วม")
                          }
                          disabled={
                            participant.attendanceStatus === "รอเข้าร่วม"
                          }
                          className={`p-1 rounded-full ${
                            participant.attendanceStatus === "รอเข้าร่วม"
                              ? "opacity-50 cursor-not-allowed"
                              : theme === "dark"
                              ? "text-yellow-400 hover:bg-gray-700"
                              : "text-yellow-600 hover:bg-gray-200"
                          }`}
                          title="รีเซ็ตสถานะ"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-sm font-medium"
                  >
                    ไม่พบรายชื่อผู้เข้าร่วมกิจกรรมที่ตรงกับเงื่อนไขการค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredAndSortedParticipants.length > 0 && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                } ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === pageNumber
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-600 text-white"
                        : theme === "dark"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                } ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}

        {/* ปุ่มดำเนินการกับผู้เข้าร่วมทั้งหมด */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => {
              // จำลองการพิมพ์รายชื่อ
              alert("กำลังพิมพ์รายชื่อผู้เข้าร่วมกิจกรรม...");
            }}
            className={`flex items-center px-4 py-2 rounded-md ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            พิมพ์รายชื่อ
          </button>

          <button
            onClick={() => {
              // จำลองการส่งออกเป็น Excel
              alert("กำลังส่งออกรายชื่อเป็นไฟล์ Excel...");
            }}
            className={`flex items-center px-4 py-2 rounded-md ${
              theme === "dark"
                ? "bg-green-700 hover:bg-green-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            ส่งออกเป็น Excel
          </button>

          <button
            onClick={() => {
              // กลับไปหน้ารายการกิจกรรม
              navigate("/staff/activities");
            }}
            className={`flex items-center px-4 py-2 rounded-md ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            กลับไปหน้ากิจกรรม
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityParticipantsPage;

{
  /* ปุ่มบันทึกไม่เข้าร่วม */
}
<button
  onClick={() => handleAttendanceChange(participant.id, "ไม่ได้เข้าร่วม")}
  disabled={participant.attendanceStatus === "ไม่ได้เข้าร่วม"}
  className={`p-1 rounded-full ${
    participant.attendanceStatus === "ไม่ได้เข้าร่วม"
      ? "opacity-50 cursor-not-allowed"
      : theme === "dark"
      ? "text-red-400 hover:bg-gray-700"
      : "text-red-600 hover:bg-gray-200"
  }`}
  title="บันทึกไม่เข้าร่วม"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>;
