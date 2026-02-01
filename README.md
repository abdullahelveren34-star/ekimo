# Firebase Studio

Bu, Firebase Studio'da oluşturulmuş bir Next.js başlangıç projesidir. Başlamak için `src/app/page.tsx` dosyasına göz atın.

---

## Projeyi Firebase CLI ile Canlıya Alma (Adım Adım Rehber)

Bu rehber, projenizi internette yayınlamak için Firebase Komut Satırı Arayüzü'nü (CLI) kullanarak nasıl yükleyeceğinizi adım adım anlatır.

**ÖNEMLİ:** Bu komutları sizin yerinize ben çalıştıramam. Bu adımların, **proje dosyaları bilgisayarınıza indirildikten sonra**, proje klasörünün içindeki bir terminalde (komut istemi) sizin tarafınızdan çalıştırılması gerekmektedir.

### Gereksinimler

1.  **Kodlar Bilgisayarınızda:** Proje dosyalarının tamamının bilgisayarınızda bir klasörde olduğundan emin olun.
2.  **Node.js ve npm Yüklü:** Bilgisayarınızda [Node.js](https://nodejs.org/en) (npm ile birlikte gelir) yüklü olmalıdır.

---

### Adım 1: Firebase CLI Kurulumu ve Giriş

(Eğer daha önce yaptıysanız bu adımı atlayabilirsiniz.)

Firebase araçlarını kullanabilmek için önce onları yüklemeli ve hesabınıza giriş yapmalısınız.

```bash
# Terminalinizi açın ve bu komutu çalıştırın:
npm install -g firebase-tools

# Ardından Firebase hesabınıza giriş yapın:
firebase login
```
Bu komut tarayıcınızda bir giriş sayfası açacaktır.

---

### Adım 2: Proje Bağımlılıklarını Yükleme

Projenin çalışması için gerekli olan paketleri yükleyin. Bu adım, projenizi ilk kez kuruyorsanız gereklidir.

```bash
# Proje klasörünüzün içindeyken (package.json dosyasının olduğu yerde) bu komutu çalıştırın:
npm install
```

---

### Adım 3: Projeyi Firebase'e Yükleme (Deploy)

Artık hazırsınız. Bu tek komut, projenizi otomatik olarak derleyecek ve Firebase Hosting'e yükleyecektir.

```bash
# Proje klasörünüzün içindeyken bu komutu çalıştırın:
firebase deploy --only hosting
```

Yükleme işlemi birkaç dakika sürebilir. Tamamlandığında, terminal size sitenizin canlı URL'sini (`Hosting URL: https://...`) verecektir. Bu adrese giderek projenizi internette görebilirsiniz!

---

### Sorun Giderme

*   **"Not in a Firebase project" Hatası:** Eğer `firebase deploy` komutu sırasında `Error: Not in a Firebase project directory` gibi bir hata alırsanız, proje klasörünüzün Firebase projenize bağlı olduğundan emin olun. Şu komutla bağlantıyı kurabilirsiniz: `firebase use --add`, ardından listeden projenizi (`studio-4024231416-ba40f`) seçin.
*   **Yetki Hataları:** Eğer GitHub Actions kurulumu sırasında veya başka bir aşamada `Service Account does not exist` gibi yetki hataları alırsanız, bu durum Google Cloud projenizdeki izinlerle ilgilidir. Bu durumda en güvenilir çözüm, bu rehberdeki gibi manuel olarak `firebase deploy` komutunu kullanmaktır.

---
## Projeyi GitHub'a Bağlama Rehberi
(Bu bölüm, kodlarınızı ayrıca GitHub'da saklamak isterseniz diye eklenmiştir.)

Bu rehber, projenizi kendi GitHub hesabınıza nasıl bağlayacağınızı ve kodlarınızı nasıl kaydedeceğinizi adım adım anlatır.

### Ön Gereksinimler

1.  **Kodlar Bilgisayarınızda:** Proje dosyalarını bilgisayarınıza indirdiğinizden emin olun.
2.  **Git Yüklü:** Bilgisayarınızda [Git](https://git-scm.com/downloads) programının yüklü olması gerekir.
3.  **Boş GitHub Deposu:** GitHub.com üzerinde **içi boş** yeni bir depo (repository) oluşturmuş olmalısınız. (Depoyu oluştururken "Add a README file" gibi seçenekleri İŞARETLEMEYİN).

### Adım Adım Komutlar

Aşağıdaki komutları **proje klasörünüzün içindeki terminalde** sırasıyla çalıştırmanız gerekmektedir.

**ÖNEMLİ:** Komutlardaki `KULLANICI_ADINIZ` ve `DEPO_ADINIZ` kısımlarını kendi bilgilerinizle değiştirmeyi unutmayın.

---

**Adım 1: Yerel Depoyu Başlatma**

```bash
git init -b main
```

---

**Adım 2: Tüm Dosyaları Eklemek**

```bash
git add .
```

---

**Adım 3: İlk Versiyonu Kaydetmek (Commit)**

```bash
git commit -m "Initial project commit from Firebase Studio"
```

---

**Adım 4: GitHub Deponuzu Uzak Sunucu Olarak Eklemek**

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
```

---

**Adım 5: Kodları GitHub'a Yüklemek (Push)**

```bash
git push -u origin main
```
---
Eğer bu adımlardan birinde hata alırsanız, lütfen aldığınız hatayı benimle paylaşın. Size daha iyi yardımcı olabilmek için hangi adımda ve ne tür bir hatayla karşılaştığınızı bilmem önemli.
