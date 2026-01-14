
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
    type: 'Notebook' | 'Cep Telefonu' | 'Tablet' | 'Diğer' | 'Exo-Suit' | 'Lazer Kesici';
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
  name: 'Jax Volan',
  title: 'Kıdemli Operasyon Sorumlusu',
  email: 'jax.volan@stellarcorp.io',
  phone: '555-123-4567',
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  skills: ['Gezegen Keşfi', 'Stratejik Planlama', 'Kriz Yönetimi', 'Terraforming Temelleri', 'Xeno-biyoloji'],
  experience: [
    {
      title: 'Kıdemli Operasyon Sorumlusu',
      company: 'StellarCorp',
      period: '2070 - Halen',
    },
    {
      title: 'Keşif Subayı',
      company: 'Mars Kolonisi İttifakı',
      period: '2065 - 2070',
    },
  ],
};

export const boardMembers = [
  {
    name: 'Kaelen Vance',
    title: 'CEO & Baş Kaşif',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Aris Thorne',
    title: 'Baş Bilim Sorumlusu',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Commander Eva Rostova',
    title: 'Operasyon Direktörü',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Joric Al-Fayed',
    title: 'Baş Mühendis',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const textileNews = [
  {
    id: 1,
    title: 'Proxima Centauri B\'de Su İzi Bulundu',
    description: 'Yeni nesil teleskoplarımız, Dünya\'ya en yakın exoplanet olan Proxima Centauri B\'nin atmosferinde önemli miktarda su buharı tespit etti. Kolonizasyon için umutlar arttı.',
    imageUrl: 'https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '15.08.2077',
    imageHint: 'exoplanet water',
  },
  {
    id: 2,
    title: 'Kepler-186f: İkinci Dünya mı?',
    description: 'Kepler-186f gezegeninden gelen son veriler, yüzey sıcaklığının ve atmosferik basıncın yaşam için uygun aralıkta olduğunu gösteriyor. StellarCorp keşif filosu yola çıkmak için hazırlanıyor.',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '12.08.2077',
    imageHint: 'earth-like planet',
  },
  {
    id: 3,
    title: 'Gliese 581g\'de Gizemli Sinyaller',
    description: 'Gliese 581g sisteminden gelen periyodik radyo sinyalleri, bilim dünyasında heyecan yarattı. Sinyallerin doğal bir kaynaktan mı yoksa bir medeniyetten mi geldiği araştırılıyor.',
    imageUrl: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '10.08.2077',
    imageHint: 'radio signals space',
  },
];

export const companyNews = [
  {
    id: 1,
    title: 'Yeni "Warp 5" Motoru Testleri Başarıyla Tamamlandı',
    description: "Ar-Ge departmanımızın geliştirdiği yeni nesil 'Warp 5' motoru, yıldızlararası seyahat süresini %40 oranında kısaltacak.",
    category: 'Teknoloji',
  },
  {
    id: 2,
    title: "Centauri Sistemine İlk Koloni Gemisi Gönderildi",
    description: "Yüzlerce kolonicinin bulunduğu 'Odyssey' adlı gemimiz, Proxima Centauri B gezegenine doğru 4 yıllık yolculuğuna başladı.",
    category: 'Kolonizasyon',
  },
  {
    id: 3,
    title: 'StellarCorp, "Galaktik İttifak"a Katıldı',
    description: 'Barışçıl keşif ve bilgi paylaşımını hedefleyen Galaktik İttifak\'ın kurucu üyelerinden biri olmaktan gurur duyarız.',
    category: 'Diplomasi',
  },
  {
    id: 4,
    title: 'Yeni Terraforming Teknolojisi',
    description: 'Atmosfer düzenleyici nano-botlarımız sayesinde, bir gezegeni yaşanabilir hale getirme süresini 50 yıla indirmeyi başardık.',
    category: 'İnovasyon',
  },
];

const generatePerformanceHistory = () => {
  const years = [2075, 2076, 2077];
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
  'Yönetim': [
    { id: 'kaelen-vance-id', name: 'Kaelen Vance', title: 'CEO & Baş Kaşif', department: 'Yönetim', email: 'k.vance@stellarcorp.io', phone: 'SC-001', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2025-01-01', annualLeave: { total: 30, used: 10, remaining: 20 }, equipment: [], performanceHistory: generatePerformanceHistory() },
    { id: 'aris-thorne-id', name: 'Dr. Aris Thorne', title: 'Baş Bilim Sorumlusu', department: 'Yönetim', email: 'a.thorne@stellarcorp.io', phone: 'SC-002', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2030-02-02', annualLeave: { total: 30, used: 5, remaining: 25 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
  'Operasyonlar': [
    { id: '1', name: 'Commander Eva Rostova', title: 'Operasyon Direktörü', department: 'Operasyonlar', email: 'e.rostova@stellarcorp.io', phone: 'SC-101', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2040-03-15', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Cep Telefonu', model: 'HoloCom v7', serialNumber: 'SN11111'}], performanceHistory: generatePerformanceHistory() },
    { id: '2', name: 'Jax Volan', title: 'Filo Kaptanı', department: 'Operasyonlar', email: 'j.volan@stellarcorp.io', phone: 'SC-102', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2045-07-26', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [{ type: 'Cep Telefonu', model: 'HoloCom v7', serialNumber: 'SN22222'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Ar-Ge': [
    { id: '3', name: 'Lena Petrova', title: 'Warp Motoru Uzmanı', department: 'Ar-Ge', email: 'l.petrova@stellarcorp.io', phone: 'SC-201', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2038-05-25', annualLeave: { total: 22, used: 15, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'QuantumBook QX-2', serialNumber: 'SN33333'}], performanceHistory: generatePerformanceHistory() },
    { id: '10', name: 'Kenji Tanaka', title: 'Terraforming Mühendisi', department: 'Ar-Ge', email: 'k.tanaka@stellarcorp.io', phone: 'SC-202', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2048-06-18', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Exo-Suit', model: 'Enviro-T1', serialNumber: 'SN10101'}], performanceHistory: generatePerformanceHistory() },
  ],
  'Koloni Yönetimi': [
     { id: 'izlem-manduz-id', name: 'Zara Kessler', title: 'Koloni Yöneticisi', department: 'Koloni Yönetimi', email: 'z.kessler@stellarcorp.io', phone: 'SC-301', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2042-04-23', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'StellarPad Pro', serialNumber: 'SN44444'}], performanceHistory: generatePerformanceHistory() },
     { id: '5', name: 'Rico Valdez', title: 'Güvenlik Şefi', department: 'Koloni Yönetimi', email: 'r.valdez@stellarcorp.io', phone: 'SC-302', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2047-11-30', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [{ type: 'Lazer Kesici', model: 'Pulse Rifle X-2', serialNumber: 'SN55555'}], performanceHistory: generatePerformanceHistory() },
  ],
  'BT': [
    { id: 'abdullah-elveren-id', name: 'Cortex', title: 'Merkezi Yapay Zeka', department: 'BT', email: 'cortex@stellarcorp.io', phone: 'N/A', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '2060-01-01', annualLeave: { total: 999, used: 0, remaining: 999 }, equipment: [], performanceHistory: generatePerformanceHistory() },
  ],
};

export const allEmployees = Object.values(departmentMembers).flat();

export const approverUser = {
  id: 'izlem-manduz-id',
  name: 'Zara Kessler',
  title: 'Koloni Yöneticisi',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  email: 'z.kessler@stellarcorp.io'
};

export const currentUser = {
  id: 'abdullah-elveren-id',
  name: 'Cortex',
  title: 'Merkezi Yapay Zeka',
  avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D',
  email: 'cortex@stellarcorp.io'
};

export const employeeOfTheMonth = {
  name: 'Jax Volan',
  title: 'Filo Kaptanı',
  avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  department: 'Operasyonlar',
  reason: 'Andromeda Nebulası\'ndaki anomaliyi araştırırken gösterdiği üstün cesaret ve liderlik, ayrıca "Goliath" adlı gaz devinin yörüngesindeki zengin Xenon yataklarını keşfettiği için Ayın Kaşifi seçilmiştir.'
};

export const jobPostings = [
  {
    id: 1,
    title: 'Kıdemli Xeno-Biyolog',
    department: 'Ar-Ge',
    location: 'Proxima Centauri B Kolonisi',
    type: 'Tam Zamanlı',
    description: 'Yeni keşfedilen gezegenlerdeki flora ve faunayı inceleyecek, en az 5 yıl saha deneyimli Xeno-Biyolog arıyoruz.',
  },
  {
    id: 2,
    title: 'Terraforming Operatörü',
    department: 'Koloni Yönetimi',
    location: 'Kepler-186f (Aday Gezegen)',
    type: 'Tam Zamanlı',
    description: 'Atmosfer jeneratörlerini ve ekosistem düzenleyicilerini yönetecek, cesur ve adaptif operatörler aranıyor.',
  },
  {
    id: 3,
    title: 'Yıldız Gemisi Pilotu',
    department: 'Operasyonlar',
    location: 'Güneş Sistemi (Merkez Filo)',
    type: 'Tam Zamanlı',
    description: 'Yeni nesil "Venture" sınıfı keşif gemilerini kullanacak, yıldızlararası seyrüsefer konusunda deneyimli pilotlar arıyoruz.',
  },
    {
    id: 4,
    title: 'Koloni Güvenlik Subayı',
    department: 'Koloni Yönetimi',
    location: 'Titan Uzay İstasyonu',
    type: 'Tam Zamanlı',
    description: 'Koloninin ve personelin güvenliğini sağlayacak, kriz yönetimi ve taktiksel operasyonlarda yetenekli subaylar aranıyor.',
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
