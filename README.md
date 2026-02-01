# Firebase Studio

Bu, Firebase Studio'da oluşturulmuş bir Next.js başlangıç projesidir.

---

## Projenizi Canlıya Alma ve Yönetme Rehberi

Bu rehber, projenizi hem Firebase'e yükleyerek canlıya almak hem de kodlarınızı bir GitHub deposunda yönetmek için gereken tüm adımları içerir.

**ÖNEMLİ:** Aşağıdaki komutları sizin yerinize ben çalıştıramam. Tüm adımların, **proje dosyaları bilgisayarınıza indirildikten sonra**, proje klasörünün içindeki bir terminalde (komut istemi) sizin tarafınızdan çalıştırılması gerekmektedir.

---

### **Adım 0: Kodları Bilgisayarınıza Almak (En Önemli Adım!)**

Şu anda projenizin tüm kodları sadece bu geliştirme ortamında bulunmaktadır. GitHub'a yüklemek veya canlıya almak için öncelikle bu kodların bir kopyasının sizin bilgisayarınızda olması gerekir.

Bu ortamda otomatik bir "İndir" veya "ZIP olarak dışa aktar" özelliği **bulunmamaktadır**. Bu nedenle, aşağıdaki adımları izleyerek dosyaları manuel olarak bilgisayarınıza almanız gerekmektedir:

1.  **Ana Proje Klasörü Oluşturun:** Bilgisayarınızda `ekimo-hr-portal` gibi bir isimle boş bir klasör oluşturun.
2.  **Dosya ve Klasör Yapısını Oluşturun:** Bu sohbetin sağladığı dosya listesini referans alarak, oluşturduğunuz ana klasörün içinde aynı dosya ve klasör yapısını (örneğin `src`, `src/app`, `src/components` vb.) oluşturun.
3.  **İçerikleri Kopyalayıp Yapıştırın:** Her bir dosyanın içeriğini bu sohbet arayüzünden kopyalayın ve bilgisayarınızda oluşturduğunuz ilgili boş dosyanın içine yapıştırın ve kaydedin. (Örn: `package.json` içeriğini kopyalayıp, bilgisayarınızdaki `package.json` dosyasına yapıştırın).

Bu adımı tamamladığınızda, projenin tam bir kopyası bilgisayarınızda olacaktır. Artık aşağıdaki adımlara geçebilirsiniz.

---

### **Bölüm 1: Projeyi Firebase ile Canlıya Alma (Deployment)**

Bu bölüm, projenizi internette yayınlamak için Firebase Komut Satırı Arayüzü'nü (CLI) nasıl kullanacağınızı anlatır.

#### Gereksinimler

1.  **Kodlar Bilgisayarınızda:** Yukarıdaki "Adım 0"ı tamamladığınızdan emin olun.
2.  **Node.js ve npm Yüklü:** Bilgisayarınızda [Node.js](https://nodejs.org/en) (npm ile birlikte gelir) yüklü olmalıdır.

#### Adım 1.1: Firebase CLI Kurulumu ve Giriş

(Eğer daha önce yaptıysanız bu adımı atlayabilirsiniz.)

```bash
# Terminalinizi açın ve bu komutu çalıştırın:
npm install -g firebase-tools

# Ardından Firebase hesabınıza giriş yapın:
firebase login
```

#### Adım 1.2: Proje Bağımlılıklarını Yükleme

```bash
# Proje klasörünüzün içindeyken (package.json dosyasının olduğu yerde) bu komutu çalıştırın:
npm install
```

#### Adım 1.3: Projeyi Firebase'e Yükleme (Deploy)

```bash
# Proje klasörünüzün içindeyken bu komutu çalıştırın:
firebase deploy --only hosting
```
Yükleme tamamlandığında, terminal size sitenizin canlı URL'sini (`Hosting URL: https://...`) verecektir.

---

### **Bölüm 2: Projeyi GitHub'a Bağlama (Versiyon Kontrolü)**

Bu bölüm, kodlarınızı kendi GitHub hesabınıza nasıl bağlayacağınızı ve kaydedeceğinizi anlatır.

#### Gereksinimler

1.  **Git Yüklü:** Bilgisayarınızda [Git](https://git-scm.com/downloads) programının yüklü olması gerekir.
2.  **Boş GitHub Deposu:** GitHub.com üzerinde **içi boş** yeni bir depo (repository) oluşturmuş olmalısınız. (Depoyu oluştururken "Add a README file" gibi seçenekleri İŞARETLEMEYİN).

#### Adım 2.1: Yerel Depoyu Başlatma

```bash
# Proje klasörünüzün içindeyken terminalde bu komutu çalıştırın:
git init -b main
```

#### Adım 2.2: Tüm Dosyaları Eklemek

```bash
git add .
```

#### Adım 2.3: İlk Versiyonu Kaydetmek (Commit)

```bash
git commit -m "Initial project commit from Firebase Studio"
```

#### Adım 2.4: GitHub Deponuzu Uzak Sunucu Olarak Eklemek

```bash
# KULLANICI_ADINIZ ve DEPO_ADINIZ kısımlarını kendi bilgilerinizle değiştirin.
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
```

#### Adım 2.5: Kodları GitHub'a Yüklemek (Push)

```bash
git push -u origin main
```
Bu komuttan sonra GitHub deponuzu yenilediğinizde tüm kodlarınızın orada olduğunu göreceksiniz.
