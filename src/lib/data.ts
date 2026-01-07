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
};

export const employeeProfile = {
  name: 'Ayşe Yılmaz',
  title: 'Kıdemli İK Uzmanı',
  email: 'ayse.yilmaz@example.com',
  phone: '555-123-4567',
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  skills: ['İşe Alım', 'Performans Yönetimi', 'Çalışan İlişkileri', 'İK Analitiği', 'Eğitim ve Geliştirme'],
  experience: [
    {
      title: 'Kıdemli İK Uzmanı',
      company: 'Teknoloji A.Ş.',
      period: 'Ocak 2020 - Halen',
    },
    {
      title: 'İK Uzmanı',
      company: 'Çözüm Ltd.',
      period: 'Haziran 2017 - Aralık 2019',
    },
  ],
};

export const boardMembers = [
  {
    name: 'Zübeyir Dilek',
    title: 'Yönetim Kurulu Başkanı',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Neşe Ulu',
    title: 'Yönetim Kurulu Başkan Yrd.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Mahmut Yılmaz',
    title: 'Genel Müdür',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Fatma Demir',
    title: 'Üye',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const textileNews = [
  {
    id: 1,
    title: 'Sürdürülebilir Kumaşlar Yükselişte',
    description: 'Organik pamuk, bambu ve geri dönüştürülmüş materyaller gibi çevre dostu kumaşlar, 2024 moda trendlerinin merkezinde yer alıyor. Tüketiciler artık daha bilinçli seçimler yapıyor.',
    imageUrl: 'https://picsum.photos/seed/textile1/600/400',
    date: '24 Temmuz 2024',
    imageHint: 'fabric textile',
  },
  {
    id: 2,
    title: 'Akıllı Tekstiller: Giyilebilir Teknolojinin Geleceği',
    description: 'Sağlık verilerini izleyen, sıcaklığı ayarlayan ve hatta renk değiştiren kumaşlar artık bilim kurgu değil. Akıllı tekstil pazarı hızla büyüyor ve yeni inovasyonlar kapıda.',
    imageUrl: 'https://picsum.photos/seed/textile2/600/400',
    date: '22 Temmuz 2024',
    imageHint: 'smart fabric',
  },
  {
    id: 3,
    title: 'Dijital Baskı Teknikleri Üretimi Nasıl Değiştiriyor?',
    description: 'Geleneksel baskı yöntemlerine göre daha az su ve enerji tüketen dijital baskı, hem daha çevre dostu hem de tasarımcılara sınırsız olanaklar sunuyor. Kişiselleştirme hiç bu kadar kolay olmamıştı.',
    imageUrl: 'https://picsum.photos/seed/textile3/600/400',
    date: '20 Temmuz 2024',
    imageHint: 'digital printing',
  },
];

export const companyNews = [
  {
    id: 1,
    title: 'Sürdürülebilirlik Belgesi',
    description: "Isparta'daki fabrikamız, sürdürülebilirlik alanında uluslararası geçerliliğe sahip yeni bir belge daha almaya hak kazandı.",
    category: 'Başarı',
  },
  {
    id: 2,
    title: "Madrid'de Yeni Mağaza",
    description: "İspanya'daki büyümemiz devam ediyor! Barcelona'dan sonra şimdi de Madrid'de yeni ofis ve mağazamız açıldı.",
    category: 'Genişleme',
  },
  {
    id: 3,
    title: 'Yeni Markamız: X',
    description: 'E-Kimo ailesi olarak yeni markamız "X"i sizlere sunmaktan gurur duyarız. Yenilikçi ve modern tasarımlar çok yakında!',
    category: 'Yeni Marka',
  },
  {
    id: 4,
    title: 'Teknoloji Yatırımı',
    description: 'Üretim hattımızı en son teknolojiye sahip makinelerle yenileyerek verimliliğimizi %20 artırdık.',
    category: 'İnovasyon',
  },
];

export const departmentMembers: { [key: string]: Employee[] } = {
  'Satış': [
    { id: '1', name: 'Ahmet Yılmaz', title: 'Satış Müdürü', department: 'Satış', email: 'ahmet.yilmaz@e-kimo.com', phone: '555-111-1111', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-03-15', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 14', serialNumber: 'SN11111'}] },
    { id: '2', name: 'Fatma Kaya', title: 'Satış Uzmanı', department: 'Satış', email: 'fatma.kaya@e-kimo.com', phone: '555-222-2222', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-07-26', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [{ type: 'Cep Telefonu', model: 'Samsung S23', serialNumber: 'SN22222'}] },
  ],
  'Pazarlama': [
    { id: '3', name: 'Elif Aydın', title: 'Pazarlama Direktörü', department: 'Pazarlama', email: 'elif.aydin@e-kimo.com', phone: '555-333-3333', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1982-05-25', annualLeave: { total: 22, used: 15, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN33333'}, { type: 'Cep Telefonu', model: 'iPhone 15 Pro', serialNumber: 'SN33334'}] },
  ],
  'İnsan Kaynakları': [
    { id: '4', name: 'İzlem Manduz', title: 'İK Müdürü', department: 'İnsan Kaynakları', email: 'izlem.manduz@e-kimo.com', phone: '555-444-4444', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-04-23', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'Dell XPS 15', serialNumber: 'SN44444'}] },
    { id: '5', name: 'Can Boz', title: 'İK Uzmanı', department: 'İnsan Kaynakları', email: 'can.boz@e-kimo.com', phone: '555-555-5555', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-11-30', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [{ type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN55555'}] },
  ],
  'BT': [
    { id: '6', name: 'Abdullah Elveren', title: 'Grup Bilgi Teknolojileri Direktörü', department: 'BT', email: 'abdullah.elveren@e-kimo.com', phone: '555-666-6666', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1980-01-01', annualLeave: { total: 25, used: 10, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN66666'}, { type: 'Cep Telefonu', model: 'iPhone 15 Pro Max', serialNumber: 'SN66667'}] },
  ]
};

export const allEmployees = Object.values(departmentMembers).flat();

export const currentUser = {
  name: 'Abdullah Elveren',
  title: 'Grup Bilgi Teknolojileri Direktörü',
  avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  email: 'abdullah.elveren@e-kimo.com'
};

export const employeeOfTheMonth = {
  name: 'Elif Aydın',
  title: 'Pazarlama Direktörü',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  department: 'Pazarlama',
  reason: 'Bu ay gösterdiği olağanüstü liderlik, yenilikçi pazarlama stratejileri ve ekibine ilham veren pozitif enerjisi sayesinde ayın personeli seçilmiştir. Özellikle yeni ürün lansmanındaki başarısı takdire şayandır.'
};

export const jobPostings = [
  {
    id: 1,
    title: 'Kıdemli React Geliştiricisi',
    department: 'Teknoloji',
    location: 'İstanbul, Türkiye',
    type: 'Tam Zamanlı',
    description: 'Yenilikçi web projelerimizde görev alacak, en az 5 yıl deneyimli kıdemli React geliştiricisi arıyoruz.',
  },
  {
    id: 2,
    title: 'Pazarlama Uzmanı',
    department: 'Pazarlama',
    location: 'Uzaktan',
    type: 'Tam Zamanlı',
    description: 'Dijital pazarlama kampanyalarımızı yönetecek, yaratıcı ve analitik düşünebilen bir pazarlama uzmanı arayışımız bulunmaktadır.',
  },
  {
    id: 3,
    title: 'Ürün Tasarımcısı',
    department: 'Tasarım',
    location: 'Ankara, Türkiye',
    type: 'Yarı Zamanlı',
    description: 'Kullanıcı odaklı tasarımlar yapacak, mobil ve web arayüzleri konusunda deneyimli ürün tasarımcısı arıyoruz.',
  },
    {
    id: 4,
    title: 'İnsan Kaynakları Uzmanı',
    department: 'İK',
    location: 'Bursa, Türkiye',
    type: 'Tam Zamanlı',
    description: 'İşe alım, performans yönetimi ve çalışan ilişkileri süreçlerinde görev alacak deneyimli bir İK uzmanı arıyoruz.',
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
  "Uşak": ["Uşak Havalimanı (USQ)"],
  "Van": ["Van Ferit Melen Havalimanı (VAN)"],
  "Zonguldak": ["Zonguldak Çaycuma Havalimanı (ONQ)"]
};