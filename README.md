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

### **Bölüm 1: Projeyi Firebase ile Canlıya Alma (En Hızlı ve Güvenilir Yöntem)**

Bu bölüm, projenizi internette yayınlamak için Firebase Komut Satırı Arayüzü'nü (CLI) nasıl kullanacağınızı adım adım anlatır.

#### Gereksinimler

*   **Kodlar Bilgisayarınızda:** Yukarıdaki "Adım 0"ı tamamladığınızdan emin olun.
*   **Node.js ve npm Yüklü:** Bilgisayarınızda [Node.js](https://nodejs.org/en) (npm ile birlikte gelir) yüklü olmalıdır.

#### Adım 1.1: Firebase CLI Kurulumu ve Giriş

(Eğer bilgisayarınızda Firebase CLI zaten kuruluysa ve daha önce giriş yaptıysanız bu adımı atlayabilirsiniz.)

```bash
# Terminalinizi açın ve bu komutu çalıştırarak Firebase araçlarını yükleyin:
npm install -g firebase-tools

# Ardından Firebase hesabınıza giriş yapın. Tarayıcıda bir pencere açılacaktır.
firebase login
```

#### Adım 1.2: Proje Bağımlılıklarını Yükleme

Bu komut, projenizin çalışması için gerekli olan tüm kütüphaneleri (`react`, `next`, `firebase` vb.) `node_modules` klasörüne indirir.

```bash
# Proje klasörünüzün içindeyken (package.json dosyasının olduğu yerde) bu komutu çalıştırın:
npm install
```

#### Adım 1.3: Projeyi Canlıya Hazırlama (Build)

Bu **kritik bir adımdır**. Bu komut, Next.js projenizi canlıya alınmaya hazır, optimize edilmiş ve küçültülmüş bir versiyona dönüştürür. 

```bash
# Proje klasörünüzün içindeyken bu komutu çalıştırın:
npm run build
```

> **ÖNEMLİ NOT: 'out' Klasörü Hakkında**
> Bu komutu çalıştırdıktan sonra bir `out` klasörü **oluşturulmayacaktır**. Bu bir hata değildir! Bu proje, sunucu tarafı özelliklere sahip modern bir Next.js uygulaması olduğu için, tüm derlenmiş dosyalar `out` yerine `.next` klasörü içine yerleştirilir. Firebase, bu kurulumu otomatik olarak tanır ve yayınlamak için `.next` klasörünü kullanır.

#### Adım 1.4: Projeyi Firebase'e Yükleme (Deploy)

Artık projeniz canlıya alınmaya hazır. Bu son komut, derlenmiş proje dosyalarını Firebase sunucularına yükler ve sitenizi internette erişilebilir hale getirir.

```bash
# Proje klasörünüzün içindeyken bu komutu çalıştırın:
firebase deploy --only hosting
```

Yükleme tamamlandığında, terminal size sitenizin canlı URL'sini (`Hosting URL: https://...`) verecektir. Bu linke tıklayarak projenizi canlıda görebilirsiniz.

---

### **Bölüm 2: Projeyi GitHub'a Bağlama (Versiyon Kontrolü)**

Bu bölüm, kodlarınızı kendi GitHub hesabınıza nasıl bağlayacağınızı ve kaydedeceğinizi anlatır.

#### Gereksinimler

*   **Git Yüklü:** Bilgisayarınızda [Git](https://git-scm.com/downloads) programının yüklü olması gerekir.
*   **Boş GitHub Deposu:** GitHub.com üzerinde **içi boş** yeni bir depo (repository) oluşturmuş olmalısınız. (Depoyu oluştururken "Add a README file" gibi seçenekleri İŞARETLEMEYİN).
*   **GitHub Personal Access Token (PAT):** GitHub, güvenlik nedeniyle komut satırı işlemleri için artık normal şifreleri kabul etmemektedir. Bu nedenle bir Erişim Token'ı oluşturmanız gerekecektir.

#### Adım 2.1: GitHub Personal Access Token (PAT) Oluşturma

1.  GitHub hesabınıza giriş yapın ve [bu linke tıklayarak](https://github.com/settings/tokens/new) yeni token oluşturma sayfasına gidin.
2.  **Note (Not):** Token'ınıza bir isim verin (örn: `Firebase Studio Projesi`).
3.  **Expiration (Son Kullanma Tarihi):** Token'ın ne kadar süre geçerli olacağını seçin (örn: 30 days).
4.  **Select scopes (Yetkileri Seç):** En önemli adım budur. **`repo`** yazan ana başlığın yanındaki kutucuğu işaretleyin. Bu, altındaki tüm `repo` yetkilerini (repo:status, repo_deployment, public_repo, vb.) seçecektir.
5.  Sayfanın en altındaki **"Generate token"** butonuna tıklayın.
6.  **ÇOK ÖNEMLİ:** Oluşturulan token size sadece bir kez gösterilecektir. Bu token'ı hemen kopyalayıp güvenli bir yere (örn: Not Defteri) yapıştırın. Bu sayfadan ayrılırsanız token'ı bir daha göremezsiniz.

#### Adım 2.2: Yerel Depoyu Başlatma

```bash
# Proje klasörünüzün içindeyken terminalde bu komutu çalıştırın:
git init -b main
```

#### Adım 2.3: Tüm Dosyaları Eklemek ve Kaydetmek (Commit)

```bash
# Tüm dosyaları Git'e ekleyin:
git add .

# Dosyaların ilk versiyonunu bir mesajla kaydedin:
git commit -m "Initial project commit from Firebase Studio"
```

#### Adım 2.4: GitHub Deponuzu Uzak Sunucu Olarak Eklemek

**DİKKAT:** Aşağıdaki komutta `KULLANICI_ADINIZ` ve `DEPO_ADINIZ` kısımlarını **kendi GitHub kullanıcı adınız ve oluşturduğunuz deponun adıyla** değiştirmeyi unutmayın.

```bash
# Örnek: git remote add origin https://github.com/abdullahelveren34-star/ekimo.git
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
```

#### Adım 2.5: Kodları GitHub'a Yüklemek (Push)

Bu adımda terminal sizden kullanıcı adı ve şifre isteyecektir.
*   **Kullanıcı adı (Username):** GitHub kullanıcı adınızı girin.
*   **Şifre (Password):** Normal GitHub şifrenizi **DEĞİL**, **Adım 2.1'de oluşturup kopyaladığınız Personal Access Token'ı (PAT)** buraya yapıştırın. (Yapıştırırken şifre görünmeyebilir, bu normaldir).

```bash
git push -u origin main
```

Bu komuttan sonra GitHub deponuzu yenilediğinizde tüm kodlarınızın orada olduğunu göreceksiniz.
