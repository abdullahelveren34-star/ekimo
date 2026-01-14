
export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  avatarUrl: string;
  birthDate: string;
  annualLeave: {
    total: number;
    used: number;
    remaining: number;
  };
  equipment: {
    type: 'Notebook' | 'Cep Telefonu' | 'Tablet' | 'Diğer';
    model: string;
    serialNumber: string;
  }[];
  performanceHistory: {
    year: number;
    monthlyScores: {
      month: string;
      workQuality: number;
      communication: number;
      responsibility: number;
      target: number;
      average: number;
    }[];
  }[];
};

export const employeeProfile = {
  name: 'Ayşe Yılmaz',
  title: 'Kıdemli Pazarlama Uzmanı',
  email: 'ayse.yilmaz@e-kimo.com',
  phone: '555-123-4567',
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  skills: ['Dijital Pazarlama', 'SEO', 'Sosyal Medya Yönetimi', 'İçerik Stratejisi', 'Google Analytics'],
  experience: [
    {
      title: 'Kıdemli Pazarlama Uzmanı',
      company: 'E-Kimo Tekstil',
      period: '2020 - Halen',
    },
    {
      title: 'Pazarlama Uzmanı',
      company: 'Moda Rüzgarı A.Ş.',
      period: '2018 - 2020',
    },
  ],
};

export const boardMembers = [
  {
    name: 'Mehmet Öztürk',
    title: 'Yönetim Kurulu Başkanı',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Zeynep Kaya',
    title: 'Genel Müdür',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Ali Demir',
    title: 'Üretim Direktörü',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const textileNews = [
  {
    id: 1,
    title: 'Sürdürülebilir Kumaşlar Yükselişte',
    description: 'Geri dönüştürülmüş ve organik materyallerden üretilen kumaşlar, 2024 moda trendlerinin merkezinde yer alıyor.',
    imageUrl: 'https://images.unsplash.com/photo-1594938384914-27a3c39a8918?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '15.07.2024',
    imageHint: 'sustainable fabric',
  },
  {
    id: 2,
    title: 'Tekstil Sektöründe Dijitalleşme Hız Kazandı',
    description: 'Yapay zeka destekli tasarım araçları ve 3D modelleme, üretim süreçlerini kökten değiştiriyor.',
    imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '12.07.2024',
    imageHint: 'digital design',
  },
  {
    id: 3,
    title: 'Yeni Sezon Renkleri Belli Oldu: Doğadan İlham',
    description: 'Pantone, yeni sezonun trend renklerini açıkladı. Toprak tonları ve pastel renkler ön planda.',
    imageUrl: 'https://images.unsplash.com/photo-1562690868-603772152267?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '10.07.2024',
    imageHint: 'color swatches',
  },
];

export const companyNews = [
  {
    id: 1,
    title: 'Yeni Fabrika Yatırımı Tamamlandı',
    description: 'Çevre dostu teknolojilerle donatılmış yeni üretim tesisimiz faaliyete geçti.',
    category: 'Yatırım',
  },
  {
    id: 2,
    title: "Milano Moda Haftası'nda E-Kimo İmzası",
    description: "Yeni 'Anadolu Rüyası' koleksiyonumuz, Milano'da büyük beğeni topladı.",
    category: 'Başarı',
  },
  {
    id: 3,
    title: 'E-Kimo Akademi Başlıyor!',
    description: 'Genç yetenekleri sektöre kazandırmak amacıyla başlattığımız eğitim programı için başvurular açıldı.',
    category: 'Sosyal Sorumluluk',
  },
  {
    id: 4,
    title: 'ISO 9001 Kalite Belgesi Yenilendi',
    description: 'Uluslararası standartlardaki üretim kalitemiz bir kez daha tescillendi.',
    category: 'Kalite',
  },
];

const generatePerformanceHistory = () => {
  const years = [2022, 2023, 2024];
  const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  
  return years.map(year => ({
    year,
    monthlyScores: months.map(month => {
      const workQuality = Math.floor(Math.random() * 41) + 55; // 55-95
      const communication = Math.floor(Math.random() * 41) + 50; // 50-90
      const responsibility = Math.floor(Math.random() * 36) + 60; // 60-95
      const average = Math.floor(Math.random() * 11) + 75; // 75-85
      const target = 85;
      
      return {
        month,
        workQuality: workQuality > 100 ? 100 : workQuality,
        communication: communication > 100 ? 100 : communication,
        responsibility: responsibility > 100 ? 100 : responsibility,
        target,
        average,
      };
    })
  }));
};

export const departmentMembers: { [key: string]: Employee[] } = {
  'Satış': [
    { id: '1', name: 'Ahmet Yılmaz', title: 'Satış Direktörü', department: 'Satış', email: 'ahmet.yilmaz@e-kimo.com', phone: '555-111-2233', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-04-12', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 14', serialNumber: 'SN11111'}], performanceHistory: generatePerformanceHistory() },
    { id: '2', name: 'Buse Çetin', title: 'Satış Müdürü', department: 'Satış', email: 'buse.cetin@e-kimo.com', phone: '555-111-2234', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-08-26', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 13', serialNumber: 'SN22222'}], performanceHistory: generatePerformanceHistory() },
    { id: '101', name: 'Ozan Tekin', title: 'Bölge Satış Sorumlusu', department: 'Satış', email: 'ozan.tekin@e-kimo.com', phone: '555-111-2235', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1991-07-15', annualLeave: { total: 16, used: 8, remaining: 8 }, equipment: [{ type: 'Cep Telefonu', model: 'Samsung Galaxy S22', serialNumber: 'SN10101'}], performanceHistory: generatePerformanceHistory() },
    { id: '102', name: 'Selinay Kurt', title: 'Kurumsal Satış Uzmanı', department: 'Satış', email: 'selinay.kurt@e-kimo.com', phone: '555-111-2236', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-01-22', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 13', serialNumber: 'SN10202'}], performanceHistory: generatePerformanceHistory() },
    { id: '103', name: 'Barış Arslan', title: 'Satış Destek Uzmanı', department: 'Satış', email: 'baris.arslan@e-kimo.com', phone: '555-111-2237', avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-10-10', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [], performanceHistory: generatePerformanceHistory() },
    { id: '104', name: 'Gizem Önal', title: 'E-Ticaret Satış Sorumlusu', department: 'Satış', email: 'gizem.onal@e-kimo.com', phone: '555-111-2238', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-05-03', annualLeave: { total: 14, used: 9, remaining: 5 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Pazarlama': [
    { id: '3', name: 'Elif Aydın', title: 'Pazarlama Direktörü', department: 'Pazarlama', email: 'elif.aydin@e-kimo.com', phone: '555-222-3344', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-05-25', annualLeave: { total: 22, used: 15, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN33333'}], performanceHistory: generatePerformanceHistory() },
    { id: '4', name: 'Kerem Işık', title: 'Dijital Pazarlama Müdürü', department: 'Pazarlama', email: 'kerem.isik@e-kimo.com', phone: '555-222-3345', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-02-17', annualLeave: { total: 14, used: 4, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Dell XPS 15', serialNumber: 'SN44444'}], performanceHistory: generatePerformanceHistory() },
    { id: '105', name: 'Deniz Aksoy', title: 'Sosyal Medya Uzmanı', department: 'Pazarlama', email: 'deniz.aksoy@e-kimo.com', phone: '555-222-3346', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1997-09-12', annualLeave: { total: 14, used: 1, remaining: 13 }, equipment: [{ type: 'Tablet', model: 'iPad Air', serialNumber: 'SN10505'}], performanceHistory: generatePerformanceHistory() },
    { id: '106', name: 'Emre Şen', title: 'İçerik Uzmanı', department: 'Pazarlama', email: 'emre.sen@e-kimo.com', phone: '555-222-3347', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-12-01', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [], performanceHistory: generatePerformanceHistory() },
    { id: '107', name: 'Ceyda Erol', title: 'Marka Yöneticisi', department: 'Pazarlama', email: 'ceyda.erol@e-kimo.com', phone: '555-222-3348', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-03-30', annualLeave: { total: 15, used: 10, remaining: 5 }, equipment: [{ type: 'Notebook', model: 'Microsoft Surface Laptop', serialNumber: 'SN10707'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Bağımsız': [],
  'Tasarım': [
    { id: '5', name: 'Can Boz', title: 'Tasarımcı', department: 'Tasarım', email: 'can.boz@e-kimo.com', phone: '555-333-4455', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-11-30', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [{ type: 'Tablet', model: 'iPad Pro 12.9"', serialNumber: 'SN55555'}], performanceHistory: generatePerformanceHistory() },
    { id: '14', name: 'Yasemin Güler', title: 'Baş Tasarımcı', department: 'Tasarım', email: 'yasemin.guler@e-kimo.com', phone: '555-333-4456', avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1989-10-01', annualLeave: { total: 20, used: 8, remaining: 12 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN14141'}], performanceHistory: generatePerformanceHistory() },
    { id: '108', name: 'İrem Sancak', title: 'Grafik Tasarımcı', department: 'Tasarım', email: 'irem.sancak@e-kimo.com', phone: '555-333-4457', avatarUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1998-07-21', annualLeave: { total: 14, used: 0, remaining: 14 }, equipment: [{ type: 'Tablet', model: 'Wacom Cintiq', serialNumber: 'SN10808'}], performanceHistory: generatePerformanceHistory() },
    { id: '109', name: 'Tolga Çam', title: 'Moda Tasarımcısı', department: 'Tasarım', email: 'tolga.cam@e-kimo.com', phone: '555-333-4458', avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-04-14', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Satınalma': [
    { id: '6', name: 'Fatma Şahin', title: 'Satınalma Müdürü', department: 'Satınalma', email: 'fatma.sahin@e-kimo.com', phone: '555-444-5566', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-01-20', annualLeave: { total: 18, used: 18, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory() },
    { id: '110', name: 'Kadir Mert', title: 'Satınalma Uzmanı', department: 'Satınalma', email: 'kadir.mert@e-kimo.com', phone: '555-444-5567', avatarUrl: 'https://images.unsplash.com/photo-1607346256330-34ec4f74e68e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1989-06-09', annualLeave: { total: 20, used: 15, remaining: 5 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Üretim Planlama': [
    { id: '23', name: 'Mustafa Kemal Öztürk', title: 'Üretim Planlama Sorumlusu', department: 'Üretim Planlama', email: 'mkozturk@e-kimo.com', phone: '555-555-1234', avatarUrl: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-03-15', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [{type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN23232'}], performanceHistory: generatePerformanceHistory()},
    { id: '24', name: 'Ayşe Yıldırım', title: 'Planlama Uzmanı', department: 'Üretim Planlama', email: 'ayse.yildirim@e-kimo.com', phone: '555-555-5678', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-07-20', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [{type: 'Notebook', model: 'HP EliteBook', serialNumber: 'SN24242'}], performanceHistory: generatePerformanceHistory()},
    { id: '111', name: 'Volkan Kılıç', title: 'Planlama Asistanı', department: 'Üretim Planlama', email: 'volkan.kilic@e-kimo.com', phone: '555-555-5679', avatarUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1998-01-08', annualLeave: { total: 14, used: 1, remaining: 13 }, equipment: [], performanceHistory: generatePerformanceHistory()},
  ],
  'Üretim': [
    { id: '27', name: 'Mehmet Ali Yılmaz', title: 'Üretim Müdürü', department: 'Üretim', email: 'mayilmaz@e-kimo.com', phone: '555-777-1234', avatarUrl: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1982-11-10', annualLeave: { total: 25, used: 15, remaining: 10 }, equipment: [{type: 'Notebook', model: 'Dell Latitude', serialNumber: 'SN27272'}], performanceHistory: generatePerformanceHistory()},
    { id: '28', name: 'Zeynep Kaya', title: 'Vardiya Amiri', department: 'Üretim', email: 'zeynep.kaya@e-kimo.com', phone: '555-777-5678', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-09-05', annualLeave: { total: 18, used: 8, remaining: 10 }, equipment: [], performanceHistory: generatePerformanceHistory()},
    { id: '112', name: 'Murat Demir', title: 'Üretim Operatörü', department: 'Üretim', email: 'murat.demir@e-kimo.com', phone: '555-777-5679', avatarUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-06-25', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [], performanceHistory: generatePerformanceHistory()},
    { id: '113', name: 'Fatma Uslu', title: 'Paketleme Sorumlusu', department: 'Üretim', email: 'fatma.uslu@e-kimo.com', phone: '555-777-5680', avatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-02-14', annualLeave: { total: 15, used: 15, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory()},
    { id: '114', name: 'İsmail Gündüz', title: 'Makine Operatörü', department: 'Üretim', email: 'ismail.gunduz@e-kimo.com', phone: '555-777-5681', avatarUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1987-11-18', annualLeave: { total: 20, used: 20, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory()},
  ],
  'Kalite ve Güvence': [
    { id: '19', name: 'Fatih Polat', title: 'Kalite Güvence Müdürü', department: 'Kalite ve Güvence', email: 'fatih.polat@e-kimo.com', phone: '555-999-1122', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1983-04-19', annualLeave: { total: 24, used: 14, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN19191'}], performanceHistory: generatePerformanceHistory() },
    { id: '115', name: 'Aslıhan Doğru', title: 'Kalite Kontrol Uzmanı', department: 'Kalite ve Güvence', email: 'aslihan.dogru@e-kimo.com', phone: '555-999-1123', avatarUrl: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-08-08', annualLeave: { total: 14, used: 3, remaining: 11 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Sosyal Uygunluk': [
    { id: '116', name: 'Leyla Erdem', title: 'Sosyal Uygunluk Sorumlusu', department: 'Sosyal Uygunluk', email: 'leyla.erdem@e-kimo.com', phone: '555-998-1122', avatarUrl: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1991-09-09', annualLeave: { total: 16, used: 10, remaining: 6 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Mali İşler': [
    { id: '34', name: 'Hasan Çelik', title: 'Finans Müdürü', department: 'Mali İşler', email: 'hasan.celik@e-kimo.com', phone: '555-121-3141', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1980-08-08', annualLeave: { total: 28, used: 20, remaining: 8 }, equipment: [{ type: 'Notebook', model: 'MacBook Air', serialNumber: 'SN34343'}], performanceHistory: generatePerformanceHistory() },
    { id: '117', name: 'Zeynep Aktaş', title: 'Muhasebe Uzmanı', department: 'Mali İşler', email: 'zeynep.aktas@e-kimo.com', phone: '555-121-3142', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-10-25', annualLeave: { total: 14, used: 14, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory() },
    { id: '118', name: 'Ali Vural', title: 'Finansal Analist', department: 'Mali İşler', email: 'ali.vural@e-kimo.com', phone: '555-121-3143', avatarUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-04-04', annualLeave: { total: 14, used: 8, remaining: 6 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Modelhane': [
    { id: '15', name: 'Selin Uzun', title: 'Modelist Şefi', department: 'Modelhane', email: 'selin.uzun@e-kimo.com', phone: '555-333-8899', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-12-12', annualLeave: { total: 14, used: 14, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory() },
    { id: '119', name: 'Ebru Yaşar', title: 'Modelist', department: 'Modelhane', email: 'ebru.yasar@e-kimo.com', phone: '555-333-8898', avatarUrl: 'https://images.unsplash.com/photo-1601412436009-d96440273631?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1997-03-16', annualLeave: { total: 14, used: 6, remaining: 8 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Depolar': [
    { id: '39', name: 'Cemalettin Sezer', title: 'Depo Sorumlusu', department: 'Depolar', email: 'cemalettin.sezer@e-kimo.com', phone: '555-888-1122', avatarUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1987-06-07', annualLeave: { total: 20, used: 15, remaining: 5 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Kesimhane': [
    { id: '120', name: 'Yusuf Atan', title: 'Kesimhane Şefi', department: 'Kesimhane', email: 'yusuf.atan@e-kimo.com', phone: '555-777-9900', avatarUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-01-01', annualLeave: { total: 22, used: 12, remaining: 10 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Marka': [],
  'İnsan Kaynakları': [
    { id: 'izlem-manduz-id', name: 'İzlem Manduz', title: 'İK Müdürü', department: 'İnsan Kaynakları', email: 'izlem.manduz@e-kimo.com', phone: '555-999-8877', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1986-09-23', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN99999'}], performanceHistory: generatePerformanceHistory() },
    { id: '52', name: 'Rana Kaplan', title: 'İK Uzmanı', department: 'İnsan Kaynakları', email: 'rana.kaplan@e-kimo.com', phone: '555-999-8878', avatarUrl: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-03-03', annualLeave: { total: 14, used: 0, remaining: 14 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN52525'}], performanceHistory: generatePerformanceHistory() },
    { id: '121', name: 'Berk Can', title: 'İşe Alım Uzmanı', department: 'İnsan Kaynakları', email: 'berk.can@e-kimo.com', phone: '555-999-8879', avatarUrl: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-08-15', annualLeave: { total: 14, used: 8, remaining: 6 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'İdari İşler': [
    { id: '122', name: 'Füsun Güngör', title: 'İdari İşler Sorumlusu', department: 'İdari İşler', email: 'fusun.gungor@e-kimo.com', phone: '555-997-8877', avatarUrl: 'https://images.unsplash.com/photo-1614283233556-f35b7c82a162?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1984-07-07', annualLeave: { total: 23, used: 20, remaining: 3 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'BT': [
    { id: 'abdullah-elveren-id', name: 'Abdullah Elveren', title: 'BT Yöneticisi', department: 'BT', email: 'abdullah.elveren@e-kimo.com', phone: '555-101-2020', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-06-18', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN10101'}], performanceHistory: generatePerformanceHistory() },
    { id: '123', name: 'Serkan Öztürk', title: 'Sistem ve Ağ Uzmanı', department: 'BT', email: 'serkan.ozturk@e-kimo.com', phone: '555-101-2021', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-12-24', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Dell PowerEdge Server', serialNumber: 'SN12321'}], performanceHistory: generatePerformanceHistory() },
    { id: '124', name: 'Tuğçe Bilgin', title: 'Yazılım Geliştirici', department: 'BT', email: 'tugce.bilgin@e-kimo.com', phone: '555-101-2022', avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-11-05', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN12421'}], performanceHistory: generatePerformanceHistory() },
    { id: '125', name: 'Hakan Kurtuluş', title: 'BT Destek Uzmanı', department: 'BT', email: 'hakan.kurtulus@e-kimo.com', phone: '555-101-2023', avatarUrl: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1997-02-28', annualLeave: { total: 14, used: 11, remaining: 3 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
};

export const allEmployees = Object.values(departmentMembers).flat();

export const approverUser = {
  id: 'izlem-manduz-id',
  name: 'İzlem Manduz',
  title: 'İK Müdürü',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  email: 'izlem.manduz@e-kimo.com'
};

export const currentUser = {
  id: 'abdullah-elveren-id',
  name: 'Abdullah Elveren',
  title: 'BT Yöneticisi',
  avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  email: 'abdullah.elveren@e-kimo.com'
};

export const employeeOfTheMonth = {
  name: 'Can Boz',
  title: 'Tasarımcı',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  department: 'Tasarım',
  reason: 'Yeni sezon kreasyonunda gösterdiği yaratıcılık ve yenilikçi tasarımlarıyla hem ekibe ilham verdiği hem de müşteri beklentilerini aştığı için Ayın Personeli seçilmiştir.'
};

export const jobPostings = [
  {
    id: 1,
    title: 'Kıdemli Yazılım Mühendisi',
    department: 'BT',
    location: 'İstanbul (Hibrit)',
    type: 'Tam Zamanlı',
    description: 'E-ticaret platformumuzun geliştirilmesinde görev alacak, en az 5 yıl deneyimli takım arkadaşı arıyoruz.',
  },
  {
    id: 2,
    title: 'Moda Tasarımcısı',
    department: 'Tasarım',
    location: 'İzmir',
    type: 'Tam Zamanlı',
    description: 'Yenilikçi ve trendleri takip eden, koleksiyon hazırlama konusunda deneyimli tasarımcı arayışımız bulunmaktadır.',
  },
  {
    id: 3,
    title: 'Pazarlama Stajyeri',
    department: 'Pazarlama',
    location: 'İstanbul',
    type: 'Stajyer',
    description: 'Dijital pazarlama ve sosyal medya alanında kendini geliştirmek isteyen, enerjik ve yaratıcı stajyer arıyoruz.',
  },
];

export const allCities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
  "Düzce"
];

export const hotelsByCity: { [key: string]: string[] } = {
  "Adana": ["HiltonSA Adana", "Sheraton Grand Adana", "Divan Adana"],
  "Adıyaman": ["Ramada by Wyndham Adiyaman", "Grand Isias Hotel"],
  "Afyonkarahisar": ["NG Afyon", "Akrones Thermal Spa Convention", "İkbal Thermal Hotel & Spa"],
  "Ağrı": ["Grand Cenas Hotel", "Hotel Suarez"],
  "Amasya": ["The Apple Palace", "Hampton by Hilton Amasya"],
  "Ankara": ["JW Marriott Hotel Ankara", "Sheraton Ankara Hotel & Convention Center", "HiltonSA Ankara", "Wyndham Ankara"],
  "Antalya": ["Rixos Downtown Antalya", "Akra Hotel", "The Marmara Antalya", "Titanic Mardan Palace"],
  "Artvin": ["Koliva Otel", "Green Valley Hotel"],
  "Aydın": ["DoubleTree by Hilton Kusadasi", "Charisma De Luxe Hotel", "Anemon Aydin Otel"],
  "Balıkesir": ["Ramada Resort by Wyndham Kazdaglari", "Adrina Termal Health & SPA Hotel", "Willmont Hotel"],
  "Bilecik": ["Grand Hotel Basaran", "Bilecik Hotel"],
  "Bingöl": ["Binkap Resort Hotel", "Grand Berti Hotel"],
  "Bitlis": ["The Crater Hotel", "Tatvan Park Hotel"],
  "Bolu": ["Gazelle Resort & Spa", "Kaya Palazzo Ski & Mountain Resort"],
  "Burdur": ["Lavanta Tepesi Hotel", "Hotel Lago Di Salda"],
  "Bursa": ["Hilton Bursa Convention Center & Spa", "Crowne Plaza Bursa", "Almira Hotel Thermal Spa & Convention Center"],
  "Çanakkale": ["Kolin Hotel Spa & Convention Center", "DoubleTree by Hilton Canakkale"],
  "Çankırı": ["Hotel Arslan", "Sim Prestige Hotel"],
  "Çorum": ["Anitta Hotel", "Hattusili Hotel"],
  "Denizli": ["Pam Thermal Hotel Clinic & Spa", "Colossae Thermal & Spa Hotel", "Anemon Denizli"],
  "Diyarbakır": ["Radisson Blu Hotel, Diyarbakir", "Mitannia Regency Hotel"],
  "Edirne": ["Margi Hotel", "RYS Hotel & Restaurant"],
  "Elazığ": ["DoubleTree by Hilton Elazig", "Ramada by Wyndham Elazig"],
  "Erzincan": ["Hilton Garden Inn Erzincan", "Eriza Boutique Hotel"],
  "Erzurum": ["Sway Hotels", "Polat Erzurum Resort Hotel"],
  "Eskişehir": ["Tasigo Eskisehir", "Anemon Eskisehir Hotel"],
  "Gaziantep": ["Divan Gaziantep", "Teymur Continental Hotel", "Grand Hotel Gaziantep"],
  "Giresun": ["Ramada by Wyndham Giresun", "Arikboga Hotel"],
  "Gümüşhane": ["Ramada by Wyndham Gumushane", "Cimenler Hotel"],
  "Hakkari": ["Hotel Sibar", "Hakkari Otel"],
  "Hatay": ["The Museum Hotel Antakya", "Savon Hotel"],
  "Isparta": ["Barida Hotels", "Hilton Garden Inn Isparta"],
  "Mersin": ["Divan Mersin", "HiltonSA Mersin", "Nobel Hotel"],
  "İstanbul": ["Hilton Bosphorus", "Swissôtel The Bosphorus", "The Ritz-Carlton, Istanbul", "CVK Park Bosphorus Hotel"],
  "İzmir": ["Swissôtel Büyük Efes, İzmir", "Mövenpick Hotel Izmir", "Renaissance Izmir Hotel", "Wyndham Grand Izmir Ozdilek"],
  "Kars": ["Cheltikov Hotel", "Katerina Sarayi"],
  "Kastamonu": ["Gun Residence Hotel", "Kurşunluhan Otel"],
  "Kayseri": ["Radisson Blu Hotel, Kayseri", "Wyndham Grand Kayseri", "Ommer Hotel"],
  "Kırklareli": ["Lozengrad Hotel", "Bakucha Vineyard Hotel & Spa"],
  "Kırşehir": ["Ramada Resort by Wyndham Kırşehir", "Grand Terme Hotel"],
  "Kocaeli": ["Tryp by Wyndham Izmit", "Wellborn Luxury Hotel"],
  "Konya": ["Dedeman Konya Hotel & Convention Center", "Ramada Plaza by Wyndham Konya"],
  "Kütahya": ["Hilton Garden Inn Kutahya", "Gulumser Hatun Termal"],
  "Malatya": ["Ramada Plaza by Wyndham Malatya Altin Kayisi", "Mövenpick Malatya Hotel"],
  "Manisa": ["Anemon Manisa", "DoubleTree by Hilton Manisa"],
  "Kahramanmaraş": ["Hampton by Hilton Kahramanmaras", "Arsan Hotel"],
  "Mardin": ["Ramada Plaza by Wyndham Mardin", "Dara Konagi"],
  "Muğla": ["D-Maris Bay", "Hillside Beach Club", "Mandarin Oriental, Bodrum"],
  "Muş": ["Global Rezidans Hotel", "Miras Hotel"],
  "Nevşehir": ["Museum Hotel", "Argos in Cappadocia", "Kayakapi Premium Caves"],
  "Niğde": ["Ramada by Wyndham Nigde", "Hotel Sahiner"],
  "Ordu": ["Radisson Blu Hotel, Ordu", "Anemon Ordu"],
  "Rize": ["Ramada Plaza by Wyndham Rize", "Ricosta Hotel"],
  "Sakarya": ["Radisson Blu Hotel, Sakarya", "NG Sapanca Wellness & Convention"],
  "Samsun": ["Sheraton Grand Samsun Hotel", "Anemon Samsun Hotel"],
  "Siirt": ["Barden Hotel", "Erdef Hotel"],
  "Sinop": ["Zinos Hotel", "Sinopark Otel"],
  "Sivas": ["Ramada by Wyndham Sivas", "Sivas Termal Hotel"],
  "Tekirdağ": ["Ramada by Wyndham Tekirdag", "Des'Otel"],
  "Tokat": ["Ramada by Wyndham Tokat", "Dedeman Tokat"],
  "Trabzon": ["Radisson Blu Hotel Trabzon", "Zorlu Grand Hotel"],
  "Tunceli": ["Royal Tunceli Hotel", "Grand Sahin Hotel"],
  "Şanlıurfa": ["Hilton Garden Inn Sanliurfa", "Nevali Hotel"],
  "Uşak": ["Ramada by Wyndham Usak", "Anemon Uşak Hotel"],
  "Van": ["DoubleTree by Hilton Van", "Elite World Van Hotel"],
  "Yozgat": ["Grand Ser Hotel", "Yozgat Otel"],
  "Zonguldak": ["Dedeman Zonguldak", "Bab-i Zer Hotel"],
  "Aksaray": ["Grand Aksaray Hotel", "Akar Hotel"],
  "Bayburt": ["Bayburt Konaklama", "Otel Bayburt"],
  "Karaman": ["Demosan Hotel & Spa", "Nadir Business Hotel"],
  "Kırıkkale": ["Carmen Hotel", "Enar Hotel"],
  "Batman": ["Real Konak Hotel", "Grand Hasankeyf Hotel"],
  "Şırnak": ["Sahinbey Hotel", "Divan Cizre"],
  "Bartın": ["Kemikzade Konagi", "Grand Astra Hotel"],
  "Ardahan": ["Yalnizcam Oteli", "Ardahan Otel"],
  "Iğdır": ["Hotel Dedem", "Star Hotel"],
  "Yalova": ["Hilton Garden Inn Yalova", "Mirart Hotel Boutique & SPA"],
  "Karabük": ["Zalifre Hotel", "Safranbolu Çelik Palas Hotel"],
  "Kilis": ["Olea Hotel", "Kilis Otel"],
  "Osmaniye": ["Royalton Hotel", "Osmaniye Hanedan Otel"],
  "Düzce": ["Duzce Surur Hotel", "Fenerbahce Topuk Yaylasi Resort"]
};

export const airportsByCity: { [key: string]: string[] } = {
  "Adana": ["Adana Şakirpaşa Havalimanı (ADA)"],
  "Adıyaman": ["Adıyaman Havalimanı (ADF)"],
  "Afyonkarahisar": ["Zafer Havalimanı (KZR)"],
  "Ağrı": ["Ağrı Ahmed-i Hani Havalimanı (AJI)"],
  "Amasya": ["Amasya Merzifon Havalimanı (MZH)"],
  "Ankara": ["Esenboğa Havalimanı (ESB)"],
  "Antalya": ["Antalya Havalimanı (AYT)", "Gazipaşa-Alanya Havalimanı (GZP)"],
  "Artvin": ["Rize-Artvin Havalimanı (RZV)"],
  "Aydın": ["Aydın Çıldır Havalimanı (CII)"],
  "Balıkesir": ["Balıkesir Koca Seyit Havalimanı (EDO)"],
  "Batman": ["Batman Havalimanı (BAL)"],
  "Bingöl": ["Bingöl Havalimanı (BGG)"],
  "Bursa": ["Bursa Yenişehir Havalimanı (YEI)"],
  "Çanakkale": ["Çanakkale Havalimanı (CKZ)"],
  "Denizli": ["Denizli Çardak Havalimanı (DNZ)"],
  "Diyarbakır": ["Diyarbakır Havalimanı (DIY)"],
  "Elazığ": ["Elazığ Havalimanı (EZS)"],
  "Erzincan": ["Erzincan Yıldırım Akbulut Havalimanı (ERC)"],
  "Erzurum": ["Erzurum Havalimanı (ERZ)"],
  "Eskişehir": ["Hasan Polatkan Havalimanı (AOE)"],
  "Gaziantep": ["Gaziantep Oğuzeli Havalimanı (GZT)"],
  "Hakkari": ["Hakkari Yüksekova Selahaddin Eyyubi Havalimanı (YKO)"],
  "Hatay": ["Hatay Havalimanı (HTY)"],
  "Iğdır": ["Iğdır Şehit Bülent Aydın Havalimanı (IGD)"],
  "Isparta": ["Isparta Süleyman Demirel Havalimanı (ISE)"],
  "İstanbul": ["İstanbul Havalimanı (IST)", "Sabiha Gökçen Havalimanı (SAW)"],
  "İzmir": ["Adnan Menderes Havalimanı (ADB)"],
  "Kahramanmaraş": ["Kahramanmaraş Havalimanı (KCM)"],
  "Kars": ["Kars Harakani Havalimanı (KSY)"],
  "Kastamonu": ["Kastamonu Havalimanı (KFS)"],
  "Kayseri": ["Kayseri Erkilet Havalimanı (ASR)"],
  "Kocaeli": ["Cengiz Topel Havalimanı (KCO)"],
  "Konya": ["Konya Havalimanı (KYA)"],
  "Kütahya": ["Zafer Havalimanı (KZR)"],
  "Malatya": ["Malatya Havalimanı (MLX)"],
  "Mardin": ["Mardin Prof. Dr. Aziz Sancar Havalimanı (MQM)"],
  "Muğla": ["Dalaman Havalimanı (DLM)", "Milas-Bodrum Havalimanı (BJV)"],
  "Muş": ["Muş Havalimanı (MSR)"],
  "Nevşehir": ["Nevşehir Kapadokya Havalimanı (NAV)"],
  "Ordu": ["Ordu-Giresun Havalimanı (OGU)"],
  "Rize": ["Rize-Artvin Havalimanı (RZV)"],
  "Samsun": ["Samsun Çarşamba Havalimanı (SZF)"],
  "Siirt": ["Siirt Havalimanı (SXZ)"],
  "Sinop": ["Sinop Havalimanı (NOP)"],
  "Sivas": ["Sivas Nuri Demirağ Havalimanı (VAS)"],
  "Şanlıurfa": ["Şanlıurfa GAP Havalimanı (GNY)"],
  "Şırnak": ["Şırnak Şerafettin Elçi Havalimanı (NKT)"],
  "Tekirdağ": ["Tekirdağ Çorlu Atatürk Havalimanı (TEQ)"],
  "Tokat": ["Tokat Havalimanı (TJK)"],
  "Trabzon": ["Trabzon Havalimanı (TZX)"],
  "Tunceli": ["Royal Tunceli Hotel", "Grand Sahin Hotel"],
  "Uşak": ["Uşak Havalimanı (USQ)"],
  "Van": ["Van Ferit Melen Havalimanı (VAN)"],
  "Zonguldak": ["Zonguldak Çaycuma Havalimanı (ONQ)"]
};
