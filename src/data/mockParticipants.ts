interface ParticipantItem {
    id: string;
    name: string;
    studentId: string;
    faculty: string;
    major: string;
    registrationDate: string;
    attendanceStatus: "มาเข้าร่วม" | "ไม่ได้เข้าร่วม" | "รอเข้าร่วม";
  }
  

// จำลองข้อมูลผู้เข้าร่วมกิจกรรม

export const mockParticipants: ParticipantItem[] = [
    {
      id: "1",
      name: "นายสมชาย ใจดี",
      studentId: "65015001",
      faculty: "คณะวิทยาศาสตร์",
      major: "วิทยาการคอมพิวเตอร์",
      registrationDate: "10/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "2",
      name: "นางสาวสมหญิง รักเรียน",
      studentId: "65015002",
      faculty: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมคอมพิวเตอร์",
      registrationDate: "11/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "3",
      name: "นายวิชัย เก่งกาจ",
      studentId: "65015003",
      faculty: "คณะวิทยาศาสตร์",
      major: "ฟิสิกส์",
      registrationDate: "12/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "4",
      name: "นางสาวแก้วตา สว่างศรี",
      studentId: "65015004",
      faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
      major: "ภาษาอังกฤษ",
      registrationDate: "12/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "5",
      name: "นายภูมิ ปัญญาดี",
      studentId: "65015005",
      faculty: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมไฟฟ้า",
      registrationDate: "13/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "6",
      name: "นางสาวนิภา ใจงาม",
      studentId: "65015006",
      faculty: "คณะวิทยาศาสตร์",
      major: "คณิตศาสตร์",
      registrationDate: "13/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "7",
      name: "นายอนันต์ มากมี",
      studentId: "65015007",
      faculty: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมโยธา",
      registrationDate: "14/05/2568",
      attendanceStatus: "มาเข้าร่วม",
    },
    {
      id: "8",
      name: "นางสาวกานดา รักดี",
      studentId: "65015008",
      faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
      major: "รัฐศาสตร์",
      registrationDate: "14/05/2568",
      attendanceStatus: "มาเข้าร่วม",
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