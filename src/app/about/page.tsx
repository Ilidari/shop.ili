"use client";
import { useLocalization } from '@/contexts/LocalizationContext';
import { Building, Users, Target } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLocalization();

  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          {t('footer.about')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {language === 'en' 
            ? `Learn more about ili shop, your trusted partner for digital solutions. We're passionate about technology and dedicated to empowering individuals and businesses.`
            : `درباره ایلی شاپ، شریک قابل اعتماد شما برای راهکارهای دیجیتال، بیشتر بدانید. ما به فناوری علاقه‌مندیم و به توانمندسازی افراد و کسب‌وکارها متعهد هستیم.`
          }
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Building className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-headline font-semibold mb-2">{language === 'en' ? 'Our Mission' : 'ماموریت ما'}</h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? `To provide high-quality software licenses and reliable VPS services with exceptional customer support, making technology accessible and affordable.`
              : `ارائه لایسنس‌های نرم‌افزار با کیفیت بالا و سرویس‌های VPS قابل اعتماد همراه با پشتیبانی مشتریان استثنایی، و در دسترس قرار دادن فناوری با قیمت مناسب.`
            }
          </p>
        </div>
        <div className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Users className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-headline font-semibold mb-2">{language === 'en' ? 'Our Team' : 'تیم ما'}</h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? `A dedicated group of tech enthusiasts, developers, and support specialists committed to your success.`
              : `گروهی متعهد از علاقه‌مندان به فناوری، توسعه‌دهندگان و متخصصان پشتیبانی که به موفقیت شما متعهد هستند.`
            }
          </p>
        </div>
        <div className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Target className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-headline font-semibold mb-2">{language === 'en' ? 'Our Values' : 'ارزش‌های ما'}</h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? `Integrity, Innovation, Customer Focus, and Reliability. These principles guide everything we do.`
              : `صداقت، نوآوری، تمرکز بر مشتری و قابلیت اطمینان. این اصول راهنمای تمام فعالیت‌های ما هستند.`
            }
          </p>
        </div>
      </section>

      <section className="text-center bg-muted/30 p-8 rounded-lg shadow">
         <h2 className="text-3xl font-headline font-semibold mb-4">{language === 'en' ? 'Join Our Community' : 'به جامعه ما بپیوندید'}</h2>
         <p className="text-lg text-muted-foreground mb-6">
            {language === 'en' 
              ? `Stay connected with ili shop for the latest updates, offers, and tech insights.`
              : `برای آخرین به‌روزرسانی‌ها، پیشنهادات و دیدگاه‌های فنی با ایلی شاپ در ارتباط باشید.`
            }
         </p>
         <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {language === 'en' ? 'Explore Products' : 'کاوش در محصولات'}
         </Button>
      </section>
    </div>
  );
}
