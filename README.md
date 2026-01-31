# Firebase Studio

Bu, Firebase Studio'da oluşturulmuş bir Next.js başlangıç projesidir. Başlamak için `src/app/page.tsx` dosyasına göz atın.

---

## Projeyi GitHub'a Bağlama Rehberi

Bu rehber, projenizi kendi GitHub hesabınıza nasıl bağlayacağınızı ve kodlarınızı nasıl kaydedeceğinizi adım adım anlatır. Bu işlemleri sizin yerinize yapamam, çünkü bu komutların sizin bilgisayarınızda çalıştırılması gerekmektedir.

### Ön Gereksinimler

1.  **Kodlar Bilgisayarınızda:** Proje dosyalarını bilgisayarınıza indirdiğinizden emin olun.
2.  **Git Yüklü:** Bilgisayarınızda [Git](https://git-scm.com/downloads) programının yüklü olması gerekir.
3.  **Boş GitHub Deposu:** GitHub.com üzerinde **içi boş** yeni bir depo (repository) oluşturmuş olmalısınız. (Depoyu oluştururken "Add a README file" gibi seçenekleri İŞARETLEMEYİN).

### Adım Adım Komutlar

Aşağıdaki komutları **proje klasörünüzün içindeki terminalde** sırasıyla çalıştırmanız gerekmektedir.

**ÖNEMLİ:** Komutlardaki `KULLANICI_ADINIZ` ve `DEPO_ADINIZ` kısımlarını kendi bilgilerinizle değiştirmeyi unutmayın.

---

**Adım 1: Yerel Depoyu Başlatma**

Bu komut, proje klasörünüzü bir Git deposuna dönüştürür. Bu komutu proje başına sadece bir kez çalıştırmanız yeterlidir.

```bash
git init -b main
```

---

**Adım 2: Tüm Dosyaları Eklemek**

Bu komut, projedeki tüm dosyaların versiyon takibi için hazırlanmasını sağlar.

```bash
git add .
```

---

**Adım 3: İlk Versiyonu Kaydetmek (Commit)**

Bu komut, projenizin o anki halini "İlk proje versiyonu" açıklamasıyla kaydeder.

```bash
git commit -m "Initial project commit from Firebase Studio"
```

---

**Adım 4: GitHub Deponuzu Uzak Sunucu Olarak Eklemek**

Bu komut, bilgisayarınızdaki projeye, kodları nereye göndereceğini öğretir. `KULLANICI_ADINIZ` ve `DEPO_ADINIZ` kısımlarını değiştirmelisiniz.

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
```

---

**Adım 5: Kodları GitHub'a Yüklemek (Push)**

Son adım! Bu komut, kaydettiğiniz tüm kodları GitHub'daki deponuza yükler.

```bash
git push -u origin main
```

---

Eğer bu adımlardan birinde hata alırsanız, lütfen aldığınız hatayı benimle paylaşın. Size daha iyi yardımcı olabilmek için hangi adımda ve ne tür bir hatayla karşılaştığınızı bilmem önemli.