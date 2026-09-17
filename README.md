# Zeyd Vardar — Kişisel portföy

React ve TypeScript ile geliştirilmiş, iki dil ve iki tema destekleyen kişisel portföy. Masaüstünde sabit menü ve yatay bölüm geçişleri; mobilde doğal dikey akış kullanır.

## Çalıştırma

Node.js 22.13 veya üzeri gereklidir.

```bash
npm install
npm run dev
```

Terminalde gösterilen yerel adresi açın. Üretim derlemesi için `npm run build` çalıştırın.

Vite tabanlı **vinext** yönlendirme ve sunucuda HTML oluşturma katmanıdır. Sites başlangıç yapısından gelir. Uygulamanın React kodu `src/` altında bulunur; `app/` yalnızca giriş sayfasını, ortak düzeni ve SEO bilgisini içerir. Bu projede veritabanı veya kimlik doğrulama kullanılmaz.

## Dosya yapısı

```text
app/                 Sayfa girişi ve sunucu tarafı SEO
src/
  App.tsx            Bölümleri ve ortak bileşenleri birleştirir
  components/        Menü, başlık, altbilgi, proje kartı, iletişim formu
  sections/          Home, About, Projects, Skills, Contact
  data/              Kişisel bilgiler, projeler, teknolojiler, çeviriler
  hooks/             Tercihler ve bölüm navigasyonu
  services/          İletişim servisi
  styles/            Tema değişkenleri ve düzen stilleri
  types/             Ortak TypeScript modelleri
  utils/             Depolama ve form doğrulama yardımcıları
tests/               Form doğrulama testleri
public/              Favicon ve sosyal paylaşım görseli
worker/              Sites için sunucu giriş dosyası
```

## İçerikleri değiştirme

- **İsim, e-posta, telefon, sosyal bağlantılar:** `src/data/personalInfo.ts`.
- **Biyografi, butonlar ve bütün ana metinler:** `src/data/translations.ts`. `tr` ve `en` aynı yapıyı paylaşır; eksik çeviriler TypeScript tarafından yakalanır.
- **Projeler:** `src/data/projects.ts`. Yeni bir nesne eklemek yeterlidir. `liveUrl` ve `githubUrl` verilirse bağlantılar yeni sekmede açılır. Eksik bağlantılar için sahte link gösterilmez.
- **Proje görselleri:** dosyayı `public/` içine ekleyin ve projeye `image: "/proje.webp"` yazın. Görsel yoksa veya yüklenemezse CSS önizlemesi gösterilir.
- **Teknolojiler:** `src/data/skills.ts`.
- **Renkler:** `src/styles/variables.css` içindeki tema değişkenleri.
- **Sayfa başlığı ve paylaşım bilgileri:** `app/layout.tsx`.

Telefon, e-posta, sosyal profil alanları ve proje içerikleri örnektir. Gerçek bilgiler gelene kadar sosyal adresler ve proje bağlantıları tıklanabilir olarak sunulmaz. `phoneHref` için örneğin `tel:+905551112233` kullanabilirsiniz.

## Navigasyonun çalışma biçimi

`useSectionNavigation` aktif bölümü, önceki/sonraki geçişleri, URL hash değerini ve tarayıcı geçmişini yönetir.

- En az **1000 px genişlik ve 720 px yükseklikte**: ana kapsayıcı yataydır; `scrollTo` yerel yumuşak kaydırma yapar. Body dikey kaymaz. İçerik fazlaysa bölüm kendi içinde kayabilir.
- Daha küçük veya kısa pencerede: bütün bölümler dikey sıralanır. İçerik kesilmez.
- 760 px altında: menü açılır/kapanır. Escape menüyü kapatır ve odağı menü düğmesine geri taşır.
- Mobilde görünür bölüm `IntersectionObserver` ile takip edilir.
- Aktif olmayan masaüstü panelleri `inert` ile klavye sıralamasından çıkarılır.
- Hareket azaltma tercihi açıkken geçişler anlıktır.

Breakpoint değiştirirken `src/data/sections.ts` ve `src/styles/responsive.css` değerlerini birlikte güncelleyin.

## Dil ve tema

`usePreferences` dil ve temayı yönetir. Tercihler `portfolio-language` ve `portfolio-theme` anahtarlarıyla localStorage'a yazılır. Depolamaya erişilemediğinde tercihler o oturumda çalışmaya devam eder. İlk ziyarette dil Türkçe; tema sistem tercihidir. Sunucu tarafındaki ilk HTML Türkçe ve açık tema ile oluşturulur, kayıtlı tercihler hidrasyondan sonra uygulanır.

## İletişim formunu gerçek servise bağlama

Varsayılan olarak **demo modu** açıktır. Form doğrulanır, ancak mesaj gönderilmez veya kaydedilmez. Kullanıcıya bu durum hem form üzerinde hem de gönderim sonucunda açıkça belirtilir.

1. `.env.example` dosyasını `.env` olarak kopyalayın.
2. `VITE_CONTACT_ENDPOINT` değerine JSON kabul eden HTTPS adresinizi yazın.
3. Geliştirme sunucusunu yeniden başlatın; üretim için yeniden derleyin.

Gönderilen JSON:

```json
{
  "name": "Ad Soyad",
  "email": "ziyaretci@example.com",
  "subject": "Proje hakkında",
  "message": "En az 20 karakterlik mesaj."
}
```

Servis `2xx` yanıtını başarı kabul eder; diğer yanıtlar ve 15 saniyelik zaman aşımı hata mesajı gösterir. Gerçek gönderimde başarılı olunca alanlar temizlenir, hatada korunur. Tekrarlı gönderim engellenir. Formspree veya özel bir API için `src/services/contactService.ts` uyarlanabilir.

`VITE_` değişkenleri tarayıcı paketinde görünür; buraya API anahtarı veya başka bir gizli bilgi yazmayın. Backend üzerinde de doğrulama, spam koruması ve hız sınırlama uygulayın. Farklı origin kullanan API için CORS yapılandırması gerekir. Demo formu bunları gerektirmez.

## Kontroller

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
npm run test:production
```

`npm test`, boş alanları, hatalı e-postayı, mesajın alt/üst uzunluk sınırlarını ve geçerli veriyi kontrol eder. `npm run format` Prettier ile kodu düzenler. Tarayıcı kontrolleri `VERIFICATION.md` dosyasında açıklanır.

## Görseller ve bağımlılıklar

Ana sayfa geometrisi ve örnek proje önizlemeleri yerel CSS ile çizilir; harici görsel isteği veya animasyon kütüphanesi yoktur. Sistem fontları kullanılır. `public/og.png`, yerleşik Imagegen ile oluşturulan paylaşım kartıdır. Kullanılan görsel brief: kırık beyaz zemin, antrasit tipografi, kiremit vurgu, adaçayı yeşili birbirine geçen halkalar; “Zeyd Vardar”, “Ideas into experiences.” ve “DEVELOPER & CREATIVE THINKER” metinleri.

`vinext` beta sürümüdür; Sites dağıtım altyapısının parçasıdır. Üretimde bağımlılık güncellemelerini test ederek uygulayın. Framework ve dağıtım araçları dışındaki çalışma zamanı bağımlılıkları React ve React DOM ile sınırlıdır.
