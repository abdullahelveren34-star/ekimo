'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Droplets, Users, Recycle, Award, Factory } from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Sürdürülebilirlik</h1>
            <p className="text-muted-foreground mt-1">Gelecek nesillere daha yaşanabilir bir dünya bırakma sorumluluğumuz.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-500" />
              Çevre Dostu Hammaddeler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Üretimimizin merkezinde doğaya saygı yatıyor. Yalnızca organik pamuk, geri dönüştürülmüş elyaf ve sürdürülebilir ormanlardan elde edilen TENCEL™ Lyocell gibi çevre dostu materyaller kullanıyoruz. Bu sayede hem doğal kaynakları koruyor hem de son ürünlerimizin cilde dostu olmasını sağlıyoruz.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-blue-500" />
              Su Yönetimi ve Tasarrufu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Tekstil endüstrisinin en değerli kaynaklarından biri olan suyu korumak için en son teknolojileri kullanıyoruz. Boyama ve terbiye işlemlerimizde su tüketimini %50'ye varan oranlarda azaltan sistemler ve yağmur suyu hasadı gibi yenilikçi çözümlerle su ayak izimizi en aza indiriyoruz.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Factory className="h-6 w-6 text-yellow-600" />
                Karbon Ayak İzi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Enerji verimliliği en büyük önceliklerimizden. Fabrikalarımızda güneş panelleri kullanarak yenilenebilir enerjiye yatırım yapıyor, üretim süreçlerimizi optimize ederek enerji tüketimimizi sürekli olarak azaltıyoruz. 2030 yılına kadar üretimde karbon nötr olmayı hedefliyoruz.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-orange-500" />
              Etik Üretim ve Adil Çalışma Koşulları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Sürdürülebilirlik sadece çevreyle sınırlı değildir. Tüm çalışanlarımızın güvenli, sağlıklı ve adil bir çalışma ortamına sahip olmasını sağlıyoruz. Tedarik zincirimizdeki tüm ortaklarımızın da uluslararası çalışma standartlarına uymasını titizlikle denetliyoruz.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-lime-500" />
              Döngüsel Ekonomi ve Atık Yönetimi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              "Kullan-at" kültürüne karşı duruyoruz. Üretim sırasında ortaya çıkan kumaş atıklarını geri dönüştürerek yeni ürünler veya dolgu malzemeleri üretiyoruz. Ayrıca, müşterilerimizi eski E-Kimo ürünlerini geri getirmeye teşvik eden "Geri Getir, Yeniden Kazanalım" programımızla döngüsel ekonomiye katkıda bulunuyoruz.
            </p>
          </CardContent>
        </Card>

         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-500" />
              Sertifikalarımız ve Standartlarımız
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
             <ul className="list-disc list-inside space-y-2">
                <li><strong>GOTS (Global Organic Textile Standard):</strong> Organik elyaflar için dünya lideri işleme standardı.</li>
                <li><strong>OEKO-TEX® Standard 100:</strong> Ürünlerimizin zararlı maddeler açısından test edildiğini ve insan sağlığına zararsız olduğunu garanti eder.</li>
                <li><strong>GRS (Global Recycled Standard):</strong> Geri dönüştürülmüş içeriğin takibini ve doğrulanmasını sağlayan uluslararası standart.</li>
                <li><strong>BCI (Better Cotton Initiative):</strong> Küresel pamuk üretimini insanlar, çevre ve sektörün geleceği için daha iyi hale getirme programı.</li>
             </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
