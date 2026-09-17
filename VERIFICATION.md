# Doğrulama notları

Kontroller 17 Eylül 2026 tarihinde yapıldı.

## Otomatik kontroller

- TypeScript strict, kullanılmayan import/değişken kontrolleri.
- ESLint: React hook kuralları ve temel erişilebilirlik.
- Prettier biçim kontrolü.
- Form: geçerli veri, boş alan, hatalı e-posta, kısa mesaj, mesajın 20 karakter alt sınırı ve 5000 karakter üst sınırı.
- localStorage erişim hatasında uygulamanın çalışmaya devam etmesi.
- Üretim HTML çıktısı, sayfa içeriği ve mutlak Open Graph / Twitter görsel adresleri.
- Üretim derlemesi.
- Tam bağımlılık denetimi: güncellemelerden sonra `npm audit` sıfır açık bildirdi.

## Tarayıcı kontrolleri

- **1440 × 900:** Masaüstü düzeni, açık/koyu temanın görsel kontrolü; Ana Sayfa → İletişim ve Projelerim → Ana Sayfa geçişleri; aktif menü; panel hizalanması.
- **1024 × 768:** Body ve ana sayfa panelinde yatay/dikey taşma yok.
- **1366 × 600:** Dikey akışa geçiş, bütün bölümlerin erişilebilir olması.
- **390 × 844 ve 320 × 740:** Mobil menü, tek sütunlu içerik, yatay taşma kontrolü.
- Türkçe/İngilizce metinler ve dil/tema tercihlerinin sayfa yenileme sonrasında korunması.
- Boş form gönderiminde hata ve ilk hatalı alana odak; hatalı e-posta ve kısa mesaj; geçerli veride açık demo sonucu.
- Konsolda uygulama hatası yok.

## Sınırlar

- Proje bağlantıları kullanıcıya ait gerçek adreslerle henüz doldurulmadı. Koşullu linkler yeni sekme ve `noopener noreferrer` kullanımı açısından kod üzerinden kontrol edildi; gerçek dış sitelere gönderim yapılmadı.
- Form demo modunda. Gerçek backend, e-posta teslimatı, CORS, servis kesintisi ve spam koruması uçtan uca test edilmedi.
- Mobil kontroller tarayıcı boyutlandırması ile yapıldı; fiziksel iOS/Android cihaz testi ve ekran okuyucu denetimi yapılmadı.
- Hareket azaltma tercihi CSS ve navigasyon kodunda destekleniyor; işletim sistemi tercihi değiştirilerek ayrıca test edilmedi.

## Gerçek iletişim bilgileri güncellemesi

E-posta, telefon, GitHub ve LinkedIn hedefleri üretim HTML çıktısında kontrol edildi. `mailto:`, uluslararası biçimde `tel:`, sosyal linklerde `target="_blank"` ve `rel="noopener noreferrer"` doğrulandı. Örnek iletişim uyarısı kaldırıldı. TypeScript, lint, derleme ve üretim testi geçti.

Bu güncellemede tarayıcı bağlantısı kullanılamadığı için mobil/tema/dil görsel kontrolleri yeniden yapılamadı. Mevcut responsive stil ve çeviri yapısı korundu. Telefon araması veya e-posta uygulaması fiilen açılmadı; bağlantı hedefleri doğrulandı.
