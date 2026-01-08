
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
  'Yönetim': [
    { id: 'zubeyir-dilek-id', name: 'Zübeyir Dilek', title: 'Yönetim Kurulu Başkanı', department: 'Yönetim', email: 'zubeyir.dilek@e-kimo.com', phone: '555-000-0001', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1960-01-01', annualLeave: { total: 30, used: 10, remaining: 20 }, equipment: [] },
    { id: 'nese-ulu-id', name: 'Neşe Ulu', title: 'Yönetim Kurulu Başkan Yrd.', department: 'Yönetim', email: 'nese.ulu@e-kimo.com', phone: '555-000-0002', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1965-02-02', annualLeave: { total: 30, used: 5, remaining: 25 }, equipment: [] },
    { id: 'mahmut-yilmaz-id', name: 'Mahmut Yılmaz', title: 'Genel Müdür', department: 'Yönetim', email: 'mahmut.yilmaz@e-kimo.com', phone: '555-000-0003', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1970-03-03', annualLeave: { total: 30, used: 8, remaining: 22 }, equipment: [] },
  ],
  'Satış': [
    { id: '1', name: 'Ahmet Yılmaz', title: 'Satış Müdürü', department: 'Satış', email: 'ahmet.yilmaz@e-kimo.com', phone: '555-111-1111', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-03-15', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Cep Telefonu', model: 'iPhone 14', serialNumber: 'SN11111'}] },
    { id: '2', name: 'Fatma Kaya', title: 'Satış Uzmanı', department: 'Satış', email: 'fatma.kaya@e-kimo.com', phone: '555-222-2222', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-07-26', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [{ type: 'Cep Telefonu', model: 'Samsung S23', serialNumber: 'SN22222'}] },
    { id: '7', name: 'Mehmet Öztürk', title: 'Bölge Satış Sorumlusu', department: 'Satış', email: 'mehmet.ozturk@e-kimo.com', phone: '555-111-1112', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-12-10', annualLeave: { total: 18, used: 8, remaining: 10 }, equipment: [{ type: 'Tablet', model: 'iPad Air', serialNumber: 'SN77777'}] },
    { id: '8', name: 'Zeynep Şahin', title: 'İhracat Uzmanı', department: 'Satış', email: 'zeynep.sahin@e-kimo.com', phone: '555-222-2223', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1991-09-05', annualLeave: { total: 14, used: 4, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'HP Spectre x360', serialNumber: 'SN88888'}] },
    { id: '9', name: 'Mustafa Arslan', title: 'Satış Danışmanı', department: 'Satış', email: 'mustafa.arslan@e-kimo.com', phone: '555-111-1113', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-02-20', annualLeave: { total: 14, used: 1, remaining: 13 }, equipment: [] },
  ],
  'Pazarlama': [
    { id: '3', name: 'Elif Aydın', title: 'Pazarlama Direktörü', department: 'Pazarlama', email: 'elif.aydin@e-kimo.com', phone: '555-333-3333', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1982-05-25', annualLeave: { total: 22, used: 15, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 16"', serialNumber: 'SN33333'}, { type: 'Cep Telefonu', model: 'iPhone 15 Pro', serialNumber: 'SN33334'}] },
    { id: '10', name: 'Ozan Tekin', title: 'Dijital Pazarlama Uzmanı', department: 'Pazarlama', email: 'ozan.tekin@e-kimo.com', phone: '555-333-3334', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-06-18', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'MacBook Air', serialNumber: 'SN10101'}] },
    { id: '11', name: 'Selin Yıldız', title: 'İçerik Uzmanı', department: 'Pazarlama', email: 'selin.yildiz@e-kimo.com', phone: '555-333-3335', avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-08-01', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [] },
    { id: '12', name: 'Kerem Aksoy', title: 'Sosyal Medya Yöneticisi', department: 'Pazarlama', email: 'kerem.aksoy@e-kimo.com', phone: '555-333-3336', avatarUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-04-12', annualLeave: { total: 14, used: 14, remaining: 0 }, equipment: [{ type: 'Cep Telefonu', model: 'Google Pixel 8', serialNumber: 'SN12121'}] },
    { id: '13', name: 'Buse Demir', title: 'Marka Yöneticisi', department: 'Pazarlama', email: 'buse.demir@e-kimo.com', phone: '555-333-3337', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1989-10-28', annualLeave: { total: 16, used: 10, remaining: 6 }, equipment: [{ type: 'Notebook', model: 'Dell XPS 13', serialNumber: 'SN13131'}] },
  ],
   'Bağımsız': [],
  'Tasarım': [
    { id: '14', name: 'Yasemin Güler', title: 'Tasarım Lideri', department: 'Tasarım', email: 'yasemin.guler@e-kimo.com', phone: '555-444-4441', avatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1987-07-14', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'iMac 24"', serialNumber: 'SN14141'}] },
    { id: '15', name: 'Barış Efe', title: 'Moda Tasarımcısı', department: 'Tasarım', email: 'baris.efe@e-kimo.com', phone: '555-444-4442', avatarUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-03-22', annualLeave: { total: 14, used: 6, remaining: 8 }, equipment: [] },
    { id: '16', name: 'Ceren Işık', title: 'Grafik Tasarımcı', department: 'Tasarım', email: 'ceren.isik@e-kimo.com', phone: '555-444-4443', avatarUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1997-12-01', annualLeave: { total: 14, used: 0, remaining: 14 }, equipment: [{ type: 'Tablet', model: 'Wacom Intuos Pro', serialNumber: 'SN16161'}] },
    { id: '17', name: 'Deniz Gezgin', title: 'UI/UX Tasarımcısı', department: 'Tasarım', email: 'deniz.gezgin@e-kimo.com', phone: '555-444-4445', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-01-15', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN17171'}] },
    { id: '18', name: 'Ege Koral', title: 'Tasarım Asistanı', department: 'Tasarım', email: 'ege.koral@e-kimo.com', phone: '555-444-4446', avatarUrl: 'https://images.unsplash.com/photo-1500080209535-717dd4ebaa6b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1999-11-09', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [] },
  ],
  'Satınalma': [
    { id: '19', name: 'Fatih Polat', title: 'Satınalma Müdürü', department: 'Satınalma', email: 'fatih.polat@e-kimo.com', phone: '555-555-5551', avatarUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1980-09-19', annualLeave: { total: 24, used: 20, remaining: 4 }, equipment: [{ type: 'Notebook', model: 'Lenovo ThinkPad X1', serialNumber: 'SN19191'}] },
    { id: '20', name: 'Gamze Bulut', title: 'Satınalma Uzmanı', department: 'Satınalma', email: 'gamze.bulut@e-kimo.com', phone: '555-555-5552', avatarUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-03-03', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [] },
    { id: '21', name: 'Hakan Taş', title: 'Tedarik Zinciri Sorumlusu', department: 'Satınalma', email: 'hakan.tas@e-kimo.com', phone: '555-555-5553', avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-12-12', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [] },
    { id: '22', name: 'Irem su', title: 'Satınalma Asistanı', department: 'Satınalma', email: 'irem.su@e-kimo.com', phone: '555-555-5554', avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1998-07-21', annualLeave: { total: 14, used: 3, remaining: 11 }, equipment: [] },
  ],
  'Üretim Planlama': [
    { id: '23', name: 'Jale Tezcan', title: 'Planlama Müdürü', department: 'Üretim Planlama', email: 'jale.tezcan@e-kimo.com', phone: '555-666-6661', avatarUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1984-06-06', annualLeave: { total: 20, used: 11, remaining: 9 }, equipment: [{ type: 'Notebook', model: 'HP EliteBook', serialNumber: 'SN23232'}] },
    { id: '24', name: 'Kaan Vural', title: 'Üretim Planlama Mühendisi', department: 'Üretim Planlama', email: 'kaan.vural@e-kimo.com', phone: '555-666-6662', avatarUrl: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1991-04-14', annualLeave: { total: 14, used: 8, remaining: 6 }, equipment: [] },
    { id: '25', name: 'Leman Sönmez', title: 'Planlama Uzmanı', department: 'Üretim Planlama', email: 'leman.sonmez@e-kimo.com', phone: '555-666-6663', avatarUrl: 'https://images.unsplash.com/photo-1521295945755-680c1b48b306?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-02-18', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [] },
    { id: '26', name: 'Murat Duman', title: 'Stok Kontrol Sorumlusu', department: 'Üretim Planlama', email: 'murat.duman@e-kimo.com', phone: '555-666-6664', avatarUrl: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1989-11-11', annualLeave: { total: 16, used: 15, remaining: 1 }, equipment: [] },
  ],
  'Üretim': [
    { id: '27', name: 'Nihal Ergin', title: 'Üretim Müdürü', department: 'Üretim', email: 'nihal.ergin@e-kimo.com', phone: '555-777-7771', avatarUrl: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1979-01-20', annualLeave: { total: 26, used: 20, remaining: 6 }, equipment: [] },
    { id: '28', name: 'Orhan Çelik', title: 'Vardiya Amiri', department: 'Üretim', email: 'orhan.celik@e-kimo.com', phone: '555-777-7772', avatarUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1986-10-10', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [] },
    { id: '29', name: 'Pınar Kurt', title: 'Makine Operatörü', department: 'Üretim', email: 'pinar.kurt@e-kimo.com', phone: '555-777-7773', avatarUrl: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-05-05', annualLeave: { total: 14, used: 5, remaining: 9 }, equipment: [] },
    { id: '30', name: 'Rıza Sarı', title: 'Makine Operatörü', department: 'Üretim', email: 'riza.sari@e-kimo.com', phone: '555-777-7774', avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-09-17', annualLeave: { total: 14, used: 12, remaining: 2 }, equipment: [] },
    { id: '31', name: 'Sema Uçar', title: 'Kalite Kontrol Operatörü', department: 'Üretim', email: 'sema.ucar@e-kimo.com', phone: '555-777-7775', avatarUrl: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0ed14?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-11-23', annualLeave: { total: 14, used: 4, remaining: 10 }, equipment: [] },
    { id: '32', name: 'Tufan Esen', title: 'Üretim İşçisi', department: 'Üretim', email: 'tufan.esen@e-kimo.com', phone: '555-777-7776', avatarUrl: 'https://images.unsplash.com/photo-1628890923662-2cb23c2a02a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1998-01-30', annualLeave: { total: 14, used: 1, remaining: 13 }, equipment: [] },
    { id: '33', name: 'Uğur Güneş', title: 'Üretim İşçisi', department: 'Üretim', email: 'ugur.gunes@e-kimo.com', phone: '555-777-7777', avatarUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-08-15', annualLeave: { total: 14, used: 9, remaining: 5 }, equipment: [] },
  ],
  'Kalite ve Güvence': [
    { id: '34', name: 'Vildan Atan', title: 'Kalite Güvence Müdürü', department: 'Kalite ve Güvence', email: 'vildan.atan@e-kimo.com', phone: '555-888-8881', avatarUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1983-04-04', annualLeave: { total: 22, used: 12, remaining: 10 }, equipment: [] },
    { id: '35', name: 'Yavuz Selim', title: 'Kalite Kontrol Mühendisi', department: 'Kalite ve Güvence', email: 'yavuz.selim@e-kimo.com', phone: '555-888-8882', avatarUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-09-09', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [] },
    { id: '36', name: 'Zara Zengin', title: 'Kalite Teknisyeni', department: 'Kalite ve Güvence', email: 'zara.zengin@e-kimo.com', phone: '555-888-8883', avatarUrl: 'https://images.unsplash.com/photo-1594744800828-85412a0f890c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1995-10-10', annualLeave: { total: 14, used: 3, remaining: 11 }, equipment: [] },
  ],
  'Sosyal Uygunluk': [
    { id: '37', name: 'Ali Veli', title: 'Sosyal Uygunluk Uzmanı', department: 'Sosyal Uygunluk', email: 'ali.veli@e-kimo.com', phone: '555-999-9991', avatarUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1987-03-25', annualLeave: { total: 18, used: 18, remaining: 0 }, equipment: [] },
  ],
  'Mali İşler': [
    { id: 'bahar-candan-id', name: 'Bahar Candan', title: 'Mali İşler Direktörü', department: 'Mali İşler', email: 'bahar.candan@e-kimo.com', phone: '555-123-4561', avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1978-11-05', annualLeave: { total: 26, used: 15, remaining: 11 }, equipment: [] },
    { id: '39', name: 'Cemalettin Sezer', title: 'Muhasebe Müdürü', department: 'Mali İşler', email: 'cemalettin.sezer@e-kimo.com', phone: '555-123-4562', avatarUrl: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1982-02-14', annualLeave: { total: 22, used: 10, remaining: 12 }, equipment: [] },
    { id: '40', name: 'Derya Deniz', title: 'Finans Uzmanı', department: 'Mali İşler', email: 'derya.deniz@e-kimo.com', phone: '555-123-4563', avatarUrl: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1994-07-07', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [] },
    { id: '41', name: 'Emre Aslan', title: 'Muhasebe Elemanı', department: 'Mali İşler', email: 'emre.aslan@e-kimo.com', phone: '555-123-4564', avatarUrl: 'https://images.unsplash.com/photo-1599842057874-37393e9342df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1997-01-01', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [] },
  ],
  'Modelhane': [
    { id: '42', name: 'Figen Yüksek', title: 'Modelist', department: 'Modelhane', email: 'figen.yuksek@e-kimo.com', phone: '555-234-5671', avatarUrl: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-08-08', annualLeave: { total: 18, used: 8, remaining: 10 }, equipment: [] },
    { id: '43', name: 'Gökhan Türk', title: 'Modelist Yardımcısı', department: 'Modelhane', email: 'gokhan.turk@e-kimo.com', phone: '555-234-5672', avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-06-26', annualLeave: { total: 14, used: 6, remaining: 8 }, equipment: [] },
  ],
  'Depolar': [
    { id: '44', name: 'Halil İbrahim', title: 'Depo Sorumlusu', department: 'Depolar', email: 'halil.ibrahim@e-kimo.com', phone: '555-345-6781', avatarUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1981-05-19', annualLeave: { total: 24, used: 14, remaining: 10 }, equipment: [] },
    { id: '45', name: 'İlknur Güzel', title: 'Depo Elemanı', department: 'Depolar', email: 'ilknur.guzel@e-kimo.com', phone: '555-345-6782', avatarUrl: 'https://images.unsplash.com/photo-1599233120325-096a6016142c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-09-30', annualLeave: { total: 14, used: 10, remaining: 4 }, equipment: [] },
  ],
  'Kesimhane': [
    { id: '46', name: 'Kemal Sunal', title: 'Kesimhane Sorumlusu', department: 'Kesimhane', email: 'kemal.sunal@e-kimo.com', phone: '555-456-7891', avatarUrl: 'https://images.unsplash.com/photo-1605369572399-05d8d533924f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1984-10-11', annualLeave: { total: 20, used: 10, remaining: 10 }, equipment: [] },
  ],
  'Marka': [
    { id: '47', name: 'Leyla Gencer', title: 'Marka Direktörü', department: 'Marka', email: 'leyla.gencer@e-kimo.com', phone: '555-567-8901', avatarUrl: 'https://images.unsplash.com/photo-1621784563330-42DC568403a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1980-12-12', annualLeave: { total: 26, used: 6, remaining: 20 }, equipment: [] },
  ],
  'İnsan Kaynakları': [
    { id: 'izlem-manduz-id', name: 'İzlem Manduz', title: 'İK Müdürü', department: 'İnsan Kaynakları', email: 'izlem.manduz@e-kimo.com', phone: '555-444-4444', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1985-04-23', annualLeave: { total: 20, used: 5, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'Dell XPS 15', serialNumber: 'SN44444'}] },
    { id: '5', name: 'Can Boz', title: 'İK Uzmanı', department: 'İnsan Kaynakları', email: 'can.boz@e-kimo.com', phone: '555-555-5555', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-11-30', annualLeave: { total: 14, used: 2, remaining: 12 }, equipment: [{ type: 'Notebook', model: 'Lenovo ThinkPad', serialNumber: 'SN55555'}] },
    { id: '48', name: 'Merve Çetin', title: 'İşe Alım Uzmanı', department: 'İnsan Kaynakları', email: 'merve.cetin@e-kimo.com', phone: '555-444-4446', avatarUrl: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1993-07-19', annualLeave: { total: 14, used: 11, remaining: 3 }, equipment: [] },
    { id: '49', name: 'Nazlı Özer', title: 'Bordro ve Özlük İşleri Uzmanı', department: 'İnsan Kaynakları', email: 'nazli.ozer@e-kimo.com', phone: '555-444-4447', avatarUrl: 'https://images.unsplash.com/photo-1599842057874-37393e9342df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1990-01-05', annualLeave: { total: 16, used: 10, remaining: 6 }, equipment: [] },
  ],
  'İdari İşler': [
    { id: '50', name: 'Osman Gök', title: 'İdari İşler Müdürü', department: 'İdari İşler', email: 'osman.gok@e-kimo.com', phone: '555-678-9012', avatarUrl: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1975-08-20', annualLeave: { total: 28, used: 20, remaining: 8 }, equipment: [] },
    { id: '51', name: 'Peri Tozu', title: 'Resepsiyonist', department: 'İdari İşler', email: 'peri.tozu@e-kimo.com', phone: '555-678-9013', avatarUrl: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1999-03-03', annualLeave: { total: 14, used: 1, remaining: 13 }, equipment: [] },
  ],
  'BT': [
    { id: 'abdullah-elveren-id', name: 'Abdullah Elveren', title: 'Grup IT Direktörü', department: 'BT', email: 'abdullah.elveren@e-kimo.com', phone: '555-666-6666', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1980-01-01', annualLeave: { total: 25, used: 10, remaining: 15 }, equipment: [{ type: 'Notebook', model: 'MacBook Pro 14"', serialNumber: 'SN66666'}, { type: 'Cep Telefonu', model: 'iPhone 15 Pro Max', serialNumber: 'SN66667'}] },
    { id: '52', name: 'Rana Kaplan', title: 'Yazılım Geliştirme Uzmanı', department: 'BT', email: 'rana.kaplan@e-kimo.com', phone: '555-666-6667', avatarUrl: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1992-06-11', annualLeave: { total: 14, used: 7, remaining: 7 }, equipment: [{ type: 'Notebook', model: 'Dell Alienware', serialNumber: 'SN52525'}] },
    { id: '53', name: 'Salih Eren', title: 'Sistem ve Ağ Uzmanı', department: 'BT', email: 'salih.eren@e-kimo.com', phone: '555-666-6668', avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1988-10-02', annualLeave: { total: 18, used: 8, remaining: 10 }, equipment: [{ type: 'Notebook', model: 'Asus ROG', serialNumber: 'SN53535'}] },
    { id: '54', name: 'Tuba Dal', title: 'BT Destek Uzmanı', department: 'BT', email: 'tuba.dal@e-kimo.com', phone: '555-666-6669', avatarUrl: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', birthDate: '1996-05-16', annualLeave: { total: 14, used: 14, remaining: 0 }, equipment: [] },
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
  "Tunceli": ["Royal Tunceli Hotel", "Grand Sahin Hotel"],
  "Uşak": ["Uşak Havalimanı (USQ)"],
  "Van": ["Van Ferit Melen Havalimanı (VAN)"],
  "Zonguldak": ["Zonguldak Çaycuma Havalimanı (ONQ)"]
};

    