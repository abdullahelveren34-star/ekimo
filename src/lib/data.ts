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

export const jobPostings = [
  {
    id: 'job-1',
    title: 'Kıdemli Frontend Geliştirici',
    department: 'Mühendislik',
    location: 'Uzaktan',
    type: 'Tam Zamanlı',
    description: 'Deneyimli bir frontend geliştirici arıyoruz. React ve TypeScript konusundaki uzmanlığınızla ekibimize liderlik edin.',
  },
  {
    id: 'job-2',
    title: 'Ürün Müdürü',
    department: 'Ürün',
    location: 'İstanbul, Türkiye',
    type: 'Tam Zamanlı',
    description: 'Ürün yol haritamızı şekillendirecek ve ürün yaşam döngüsünü yönetecek vizyoner bir Ürün Müdürü arıyoruz.',
  },
  {
    id: 'job-3',
    title: 'UX/UI Tasarımcısı',
    department: 'Tasarım',
    location: 'Uzaktan',
    type: 'Yarı Zamanlı',
    description: 'Kullanıcı dostu ve estetik açıdan çekici arayüzler oluşturma tutkusuna sahip yetenekli bir tasarımcı arıyoruz.',
  },
];

export const documents = [
    {
        id: 'doc-1',
        name: 'İş Sözleşmesi - Ahmet Çelik.pdf',
        type: 'Sözleşme',
        uploadDate: '2023-01-15',
        size: '2.3 MB',
    },
    {
        id: 'doc-2',
        name: 'Performans Değerlendirmesi Q2 - Fatma Kaya.docx',
        type: 'Performans',
        uploadDate: '2024-06-30',
        size: '150 KB',
    },
    {
        id: 'doc-3',
        name: 'Eğitim Sertifikası - Proje Yönetimi.pdf',
        type: 'Sertifika',
        uploadDate: '2024-05-20',
        size: '1.1 MB',
    },
    {
        id: 'doc-4',
        name: 'İK Politikaları ve Prosedürleri.pdf',
        type: 'Politika',
        uploadDate: '2024-01-01',
        size: '5.6 MB',
    }
];
