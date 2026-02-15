import type { ApprovalRequest } from './actions';

export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: 'req1',
    employeeId: '1', // Ahmet Yılmaz
    approverId: 'izlem-manduz-id',
    requestType: 'İzin',
    requestDate: '2024-07-28T10:00:00.000Z',
    details: {
      employeeName: 'Ahmet Yılmaz',
      leaveType: 'Yıllık İzin',
      startDate: '2024-08-10',
      endDate: '2024-08-17',
      description: 'Yaz tatili için izin talebi.',
    },
    status: 'Beklemede',
  },
  {
    id: 'req2',
    employeeId: '3', // Elif Aydın
    approverId: 'izlem-manduz-id',
    requestType: 'Masraf',
    requestDate: '2024-07-27T14:30:00.000Z',
    details: {
      employeeName: 'Elif Aydın',
      expenseType: 'Müşteri Yemeği',
      amount: '540.90',
      description: 'XYZ Corp ile yapılan öğle yemeği masrafı.',
    },
    status: 'Beklemede',
  },
  {
    id: 'req3',
    employeeId: '52', // Rana Kaplan
    approverId: 'izlem-manduz-id',
    requestType: 'Seyahat',
    requestDate: '2024-07-26T11:00:00.000Z',
    details: {
      employeeName: 'Rana Kaplan',
      travelRequestType: 'flight',
      departureCity: 'İstanbul',
      departureAirport: 'Sabiha Gökçen Havalimanı (SAW)',
      arrivalCity: 'Ankara',
      arrivalAirport: 'Esenboğa Havalimanı (ESB)',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      description: 'Ankara\'daki teknoloji fuarına katılım için.',
    },
    status: 'Beklemede',
  },
  {
    id: 'req4',
    employeeId: '19', // Fatih Polat
    approverId: 'izlem-manduz-id',
    requestType: 'Araç',
    requestDate: '2024-07-25T09:15:00.000Z',
    details: {
      employeeName: 'Fatih Polat',
      requesterName: 'Fatih Polat',
      vehiclePlate: '34 XYZ 456',
      destination: 'Gebze Organize Sanayi Bölgesi',
      startDate: '2024-07-30',
      endDate: '2024-07-30',
      description: 'Tedarikçi ziyareti için araç talebi.',
    },
    status: 'Beklemede',
  },
  {
    id: 'req5',
    employeeId: '5', // Can Boz
    approverId: 'izlem-manduz-id',
    requestType: 'İK Evrak',
    requestDate: '2024-07-24T16:00:00.000Z',
    details: {
      employeeName: 'Can Boz',
      documentType: 'Çalışma Belgesi',
      description: 'Konsolosluk vize başvurusu için gereklidir.',
    },
    status: 'Beklemede',
  },
  {
    id: 'req6',
    employeeId: '14', // Yasemin Güler
    approverId: 'izlem-manduz-id',
    requestType: 'Seyahat',
    requestDate: '2024-07-23T18:00:00.000Z',
    details: {
      employeeName: 'Yasemin Güler',
      travelRequestType: 'accommodation',
      city: 'İzmir',
      hotel: 'Swissôtel Büyük Efes, İzmir',
      startDate: '2024-09-05',
      endDate: '2024-09-08',
      description: 'İzmir Moda Haftası katılımı için konaklama.',
    },
    status: 'Beklemede',
  },
  {
    id: 'req7',
    employeeId: '39', // Cemalettin Sezer
    approverId: 'izlem-manduz-id',
    requestType: 'İzin',
    requestDate: '2024-07-22T13:45:00.000Z',
    details: {
      employeeName: 'Cemalettin Sezer',
      leaveType: 'Mazeret İzni (Evlilik, Doğum, Ölüm vb.)',
      startDate: '2024-07-29',
      endDate: '2024-07-29',
      description: 'Tapu devir işlemleri için 1 günlük mazeret izni.',
    },
    status: 'Beklemede',
  },
];
