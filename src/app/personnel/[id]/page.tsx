import { notFound } from 'next/navigation';
import { allEmployees } from '@/lib/data';
import { PersonnelDetailPageContent } from '@/components/personnel-detail-page';

export async function generateStaticParams() {
  return allEmployees.map((employee) => ({
    id: employee.id,
  }));
}

export default function PersonnelDetailPage({ params }: { params: { id: string } }) {
  const employee = allEmployees.find(e => e.id === params.id);

  if (!employee) {
    notFound();
  }

  return <PersonnelDetailPageContent employee={employee} />;
}
