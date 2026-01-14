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
    { id: '1', name: 'Ahmet Yılmaz', title: 'Satış Müdürü', department: 'Satış', email: 'ahmet.yilmaz@e-kimo.com', phone: '555-111-2233', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-04-12', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 14', serialNumber: 'SN11111'}], performanceHistory: generatePerformanceHistory() },
    { id: '2', name: 'Buse Çetin', title: 'Satış Uzmanı', department: 'Satış', email: 'buse.cetin@e-kimo.com', phone: '555-111-2234', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-08-26', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 13', serialNumber: 'SN22222'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Pazarlama': [
    { id: '3', name: 'Elif Aydın', title: 'Pazarlama Müdürü', department: 'Pazarlama', email: 'elif.aydin@e-kimo.com', phone: '555-222-3344', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-05-25', annualLeave: { total: 22, used: 15, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN33333'}], performanceHistory: generatePerformanceHistory() },
    { id: '4', name: 'Kerem Işık', title: 'Dijital Pazarlama Uzmanı', department: 'Pazarlama', email: 'kerem.isik@e-kimo.com', phone: '555-222-3345', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-02-17', annualLeave: { total: 14, used: 4, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Dell XPS 15', serialNumber: 'SN44444'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Bağımsız': [],
  'Tasarım': [
    { id: '5', name: 'Can Boz', title: 'Tasarımcı', department: 'Tasarım', email: 'can.boz@e-kimo.com', phone: '555-333-4455', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-11-30', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [{ type: 'Tablet', model: 'iPad Pro 12.9"', serialNumber: 'SN55555'}], performanceHistory: generatePerformanceHistory() },
    { id: '14', name: 'Yasemin Güler', title: 'Baş Tasarımcı', department: 'Tasarım', email: 'yasemin.guler@e-kimo.com', phone: '555-333-4456', avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1989-10-01', annualLeave: { total: 20, used: 8, remaining: 12 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN14141'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Satınalma': [
    { id: '6', name: 'Fatma Şahin', title: 'Satınalma Uzmanı', department: 'Satınalma', email: 'fatma.sahin@e-kimo.com', phone: '555-444-5566', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-01-20', annualLeave: { total: 18, used: 18, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Üretim Planlama': [
    { id: '23', name: 'Mustafa Kemal Öztürk', title: 'Üretim Planlama Sorumlusu', department: 'Üretim Planlama', email: 'mkozturk@e-kimo.com', phone: '555-555-1234', avatarUrl: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-03-15', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [{type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN23232'}], performanceHistory: generatePerformanceHistory()},
    { id: '24', name: 'Ayşe Yıldırım', title: 'Planlama Uzmanı', department: 'Üretim Planlama', email: 'ayse.yildirim@e-kimo.com', phone: '555-555-5678', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-07-20', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [{type: 'Notebook', model: 'HP EliteBook', serialNumber: 'SN24242'}], performanceHistory: generatePerformanceHistory()},
  ],
  'Üretim': [
    { id: '27', name: 'Mehmet Ali Yılmaz', title: 'Üretim Müdürü', department: 'Üretim', email: 'mayilmaz@e-kimo.com', phone: '555-777-1234', avatarUrl: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1982-11-10', annualLeave: { total: 25, used: 15, remaining: 10 }, equipment: [{type: 'Notebook', model: 'Dell Latitude', serialNumber: 'SN27272'}], performanceHistory: generatePerformanceHistory()},
    { id: '28', name: 'Zeynep Kaya', title: 'Vardiya Amiri', department: 'Üretim', email: 'zeynep.kaya@e-kimo.com', phone: '555-777-5678', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-09-05', annualLeave: { total: 18, used: 8, remaining: 10 }, equipment: [], performanceHistory: generatePerformanceHistory()},
  ],
  'Kalite ve Güvence': [
    { id: '19', name: 'Fatih Polat', title: 'Kalite Güvence Müdürü', department: 'Kalite ve Güvence', email: 'fatih.polat@e-kimo.com', phone: '555-999-1122', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1983-04-19', annualLeave: { total: 24, used: 14, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN19191'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Sosyal Uygunluk': [],
  'Mali İşler': [
    { id: '34', name: 'Hasan Çelik', title: 'Finans Müdürü', department: 'Mali İşler', email: 'hasan.celik@e-kimo.com', phone: '555-121-3141', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1980-08-08', annualLeave: { total: 28, used: 20, remaining: 8 }, equipment: [{ type: 'Notebook', model: 'MacBook Air', serialNumber: 'SN34343'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Modelhane': [
    { id: '15', name: 'Selin Uzun', title: 'Modelist', department: 'Modelhane', email: 'selin.uzun@e-kimo.com', phone: '555-333-8899', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-12-12', annualLeave: { total: 14, used: 14, remaining: 0 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Depolar': [
    { id: '39', name: 'Cemalettin Sezer', title: 'Depo Sorumlusu', department: 'Depolar', email: 'cemalettin.sezer@e-kimo.com', phone: '555-888-1122', avatarUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1987-06-07', annualLeave: { total: 20, used: 15, remaining: 5 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Kesimhane': [],
  'Marka': [],
  'İnsan Kaynakları': [
    { id: 'izlem-manduz-id', name: 'İzlem Manduz', title: 'İK Müdürü', department: 'İnsan Kaynakları', email: 'izlem.manduz@e-kimo.com', phone: '555-999-8877', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1986-09-23', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN99999'}], performanceHistory: generatePerformanceHistory() },
    { id: '52', name: 'Rana Kaplan', title: 'İK Uzmanı', department: 'İnsan Kaynakları', email: 'rana.kaplan@e-kimo.com', phone: '555-999-8878', avatarUrl: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-03-03', annualLeave: { total: 14, used: 0, remaining: 14 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN52525'}], performanceHistory: generatePerformanceHistory() },
  ],
  'İdari İşler': [],
  'BT': [
    { id: 'abdullah-elveren-id', name: 'Abdullah Elveren', title: 'BT Yöneticisi', department: 'BT', email: 'abdullah.elveren@e-kimo.com', phone: '555-101-2020', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-06-18', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN10101'}], performanceHistory: generatePerformanceHistory() },
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
