'use client';
import { AIScreenerForm } from '@/components/ai-screener-form';
import { Bot } from 'lucide-react';

export default function AIScreenerPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">AI Destekli Aday Tarama</h1>
            <p className="text-muted-foreground mt-1">Özgeçmişleri iş tanımlarına göre analiz edin ve en uygun adayları bulun.</p>
          </div>
        </div>
      </header>
      <AIScreenerForm />
    </div>
  );
}
