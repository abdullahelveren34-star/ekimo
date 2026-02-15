
export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
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
};

export const employeeProfile = {
  name: 'Ayşe Yılmaz',
  title: 'Kıdemli Pazarlama Uzmanı',
  email: 'ayse.yilmaz@kimotekstil.com',
  phone: '555-123-4567',
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
  },
  {
    name: 'Zeynep Kaya',
    title: 'Genel Müdür',
  },
  {
    name: 'Ali Demir',
    title: 'Üretim Direktörü',
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

export const departmentMembers: { [key: string]: Employee[] } = {
  'Satış & Pazarlama': [
    { id: '1', name: 'Ahmet Yılmaz', title: 'Satış Direktörü', department: 'Satış & Pazarlama', email: 'ahmet.yilmaz@kimotekstil.com', phone: '555-111-2233', birthDate: '1985-04-12', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 14', serialNumber: 'SN11111'}] },
    { id: '2', name: 'Buse Çetin', title: 'Satış Müdürü', department: 'Satış & Pazarlama', email: 'buse.cetin@kimotekstil.com', phone: '555-111-2234', birthDate: '1992-08-26', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 13', serialNumber: 'SN22222'}] },
    { id: '3', name: 'Elif Aydın', title: 'Pazarlama Direktörü', department: 'Satış & Pazarlama', email: 'elif.aydin@kimotekstil.com', phone: '555-222-3344', birthDate: '1988-05-25', annualLeave: { total: 22, used: 15, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN33333'}] },
    { id: '4', name: 'Kerem Işık', title: 'Dijital Pazarlama Müdürü', department: 'Satış & Pazarlama', email: 'kerem.isik@kimotekstil.com', phone: '555-222-3345', birthDate: '1995-02-17', annualLeave: { total: 14, used: 4, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Dell XPS 15', serialNumber: 'SN44444'}] },
  ],
  'Bağımsız': [
    { id: 'server-alparslan-id', name: 'Server Alparslan', title: 'Genel Müdür Yardımcısı', department: 'Bağımsız', email: 'server.alparslan@kimotekstil.com', phone: '555-123-1234', birthDate: '1980-01-01', annualLeave: { total: 28, used: 10, remaining: 18 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN98765'}] },
  ],
  'Tasarım': [
    { id: '5', name: 'Can Boz', title: 'Tasarımcı', department: 'Tasarım', email: 'can.boz@kimotekstil.com', phone: '555-333-4455', birthDate: '1993-11-30', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [{ type: 'Tablet', model: 'iPad Pro 12.9"', serialNumber: 'SN55555'}] },
    { id: '14', name: 'Yasemin Güler', title: 'Baş Tasarımcı', department: 'Tasarım', email: 'yasemin.guler@kimotekstil.com', phone: '555-333-4456', birthDate: '1989-10-01', annualLeave: { total: 20, used: 8, remaining: 12 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN14141'}] },
  ],
  'Satınalma': [
    { id: '6', name: 'Fatma Şahin', title: 'Satınalma Müdürü', department: 'Satınalma', email: 'fatma.sahin@kimotekstil.com', phone: '555-444-5566', birthDate: '1990-01-20', annualLeave: { total: 18, used: 18, remaining: 0 }, equipment: [] },
  ],
  'Üretim Planlama': [
    { id: '23', name: 'Mustafa Kemal Öztürk', title: 'Üretim Planlama Sorumlusu', department: 'Üretim Planlama', email: 'mkozturk@kimotekstil.com', phone: '555-555-1234', birthDate: '1988-03-15', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [{type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN23232'}]},
  ],
  'Üretim': [
    { id: '27', name: 'Mehmet Ali Yılmaz', title: 'Üretim Müdürü', department: 'Üretim', email: 'mayilmaz@kimotekstil.com', phone: '555-777-1234', birthDate: '1982-11-10', annualLeave: { total: 25, used: 15, remaining: 10 }, equipment: [{type: 'Notebook', model: 'Dell Latitude', serialNumber: 'SN27272'}]},
    { id: '28', name: 'Zeynep Kaya', title: 'Vardiya Amiri', department: 'Üretim', email: 'zeynep.kaya@kimotekstil.com', phone: '555-777-5678', birthDate: '1990-09-05', annualLeave: { total: 18, used: 8, remaining: 10 }, equipment: []},
  ],
  'Kalite ve Güvence': [
    { id: '19', name: 'Fatih Polat', title: 'Kalite Güvence Müdürü', department: 'Kalite ve Güvence', email: 'fatih.polat@kimotekstil.com', phone: '555-999-1122', birthDate: '1983-04-19', annualLeave: { total: 24, used: 14, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN19191'}]},
  ],
  'Sosyal Uygunluk': [
    { id: '116', name: 'Leyla Erdem', title: 'Sosyal Uygunluk Sorumlusu', department: 'Sosyal Uygunluk', email: 'leyla.erdem@kimotekstil.com', phone: '555-998-1122', birthDate: '1991-09-09', annualLeave: { total: 16, used: 10, remaining: 6 }, equipment: [] },
  ],
  'Mali İşler': [
    { id: '34', name: 'Hasan Çelik', title: 'Finans Müdürü', department: 'Mali İşler', email: 'hasan.celik@kimotekstil.com', phone: '555-121-3141', birthDate: '1980-08-08', annualLeave: { total: 28, used: 20, remaining: 8 }, equipment: [{ type: 'Notebook', model: 'MacBook Air', serialNumber: 'SN34343'}]},
  ],
  'Modelhane': [
    { id: '15', name: 'Selin Uzun', title: 'Modelist Şefi', department: 'Modelhane', email: 'selin.uzun@kimotekstil.com', phone: '555-333-8899', birthDate: '1994-12-12', annualLeave: { total: 14, used: 14, remaining: 0 }, equipment: [] },
  ],
  'Depolar': [
    { id: '39', name: 'Cemalettin Sezer', title: 'Depo Sorumlusu', department: 'Depolar', email: 'cemalettin.sezer@kimotekstil.com', phone: '555-888-1122', birthDate: '1987-06-07', annualLeave: { total: 20, used: 15, remaining: 5 }, equipment: [] },
  ],
  'Kesimhane': [
    { id: '120', name: 'Yusuf Atan', title: 'Kesimhane Şefi', department: 'Kesimhane', email: 'yusuf.atan@kimotekstil.com', phone: '555-777-9900', birthDate: '1985-01-01', annualLeave: { total: 22, used: 12, remaining: 10 }, equipment: [] },
  ],
  'Marka': [],
  'İnsan Kaynakları': [
    { id: 'izlem-manduz-id', name: 'İzlem Manduz', title: 'İK Müdürü', department: 'İnsan Kaynakları', email: 'izlem.manduz@kimotekstil.com', phone: '555-999-8877', birthDate: '1986-09-23', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN99999'}]},
    { id: '52', name: 'Rana Kaplan', title: 'İK Uzmanı', department: 'İnsan Kaynakları', email: 'rana.kaplan@kimotekstil.com', phone: '555-999-8878', birthDate: '1996-03-03', annualLeave: { total: 14, used: 0, remaining: 14 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN52525'}]},
  ],
  'İdari İşler': [
    { id: '122', name: 'Füsun Güngör', title: 'İdari İşler Sorumlusu', department: 'İdari İşler', email: 'fusun.gungor@kimotekstil.com', phone: '555-997-8877', birthDate: '1984-07-07', annualLeave: { total: 23, used: 20, remaining: 3 }, equipment: [] },
  ],
  'BT': [
    { id: 'abdullah-elveren-id', name: 'Abdullah Elveren', title: 'BT Yöneticisi', department: 'BT', email: 'abdullah.elveren@kimotekstil.com', phone: '555-101-2020', birthDate: '1990-06-18', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN10101'}]},
    { id: '123', name: 'Serkan Öztürk', title: 'Sistem ve Ağ Uzmanı', department: 'BT', email: 'serkan.ozturk@kimotekstil.com', phone: '555-101-2021', birthDate: '1988-12-24', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Dell PowerEdge Server', serialNumber: 'SN12321'}]},
  ],
};

export const allEmployees: Employee[] = Object.values(departmentMembers).flat();

export const approverUser = {
  id: 'izlem-manduz-id',
  name: 'İzlem Manduz',
  title: 'İK Müdürü',
  email: 'izlem.manduz@kimotekstil.com'
};

export const currentUser = {
  id: 'abdullah-elveren-id',
  name: 'Abdullah Elveren',
  title: 'BT Yöneticisi',
  email: 'abdullah.elveren@kimotekstil.com'
};

export const employeeOfTheMonth = {
  name: 'Can Boz',
  title: 'Tasarımcı',
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
    
    

    
