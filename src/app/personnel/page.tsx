'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allEmployees, departmentMembers } from '@/lib/data';
import { Users, Search } from 'lucide-react';
import Link from 'next/link';

export default function PersonnelPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', ...Object.keys(departmentMembers)];

  const filteredEmployees = useMemo(() => {
    return allEmployees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment]);

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Personel Listesi</h1>
            <p className="text-muted-foreground mt-1">Şirket çalışanlarını görüntüleyin ve yönetin.</p>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Personel ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Departman Seçin" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'Tüm Departmanlar' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map(employee => (
              <Link key={employee.id} href={`/personnel/${employee.id}`} legacyBehavior>
                <a className="block">
                  <Card className="text-center hover:shadow-lg hover:border-primary transition-all">
                    <CardContent className="p-6">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-muted-foreground text-sm">{employee.title}</p>
                      <p className="text-primary text-xs mt-1">{employee.department}</p>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
          {filteredEmployees.length === 0 && (
             <div className="text-center py-16 text-muted-foreground">
                <p>Aramanızla eşleşen personel bulunamadı.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
