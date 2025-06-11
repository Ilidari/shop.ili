"use client";
import { useLocalization } from '@/contexts/LocalizationContext';

export default function TermsPage() {
  const { t, language } = useLocalization();

  return (
    <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto py-12 px-4">
      <h1 className="font-headline text-primary">{t('footer.terms')}</h1>
      
      <p><strong>{language === 'en' ? 'Last Updated:' : 'آخرین به‌روزرسانی:'}</strong> {new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</p>

      <h2>{language === 'en' ? '1. Introduction' : '۱. مقدمه'}</h2>
      <p>
        {language === 'en' 
          ? `Welcome to ili shop! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using ili shop, you agree to be bound by these Terms.`
          : `به ایلی شاپ خوش آمدید! این شرایط خدمات ("شرایط") استفاده شما از وب‌سایت و خدمات ما را کنترل می‌کند. با دسترسی یا استفاده از ایلی شاپ، شما موافقت می‌کنید که به این شرایط پایبند باشید.`
        }
      </p>

      <h2>{language === 'en' ? '2. Accounts' : '۲. حساب‌های کاربری'}</h2>
      <p>
        {language === 'en' 
          ? `When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.`
          : `هنگامی که با ما یک حساب کاربری ایجاد می‌کنید، باید اطلاعاتی را ارائه دهید که همیشه دقیق، کامل و به‌روز باشد. عدم انجام این کار به منزله نقض شرایط است که ممکن است منجر به فسخ فوری حساب شما در سرویس ما شود.`
        }
      </p>
      <p>
        {language === 'en'
          ? `You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.`
          : `شما مسئول حفاظت از رمز عبوری هستید که برای دسترسی به سرویس استفاده می‌کنید و برای هرگونه فعالیت یا اقدام تحت رمز عبور خود مسئول هستید.`
        }
      </p>

      <h2>{language === 'en' ? '3. Products and Services' : '۳. محصولات و خدمات'}</h2>
      <p>
        {language === 'en'
          ? `We reserve the right to modify or discontinue products or services at any time without prior notice. Prices for our products are subject to change without notice.`
          : `ما حق تغییر یا قطع محصولات یا خدمات را در هر زمان بدون اطلاع قبلی برای خود محفوظ می‌داریم. قیمت محصولات ما بدون اطلاع قبلی قابل تغییر است.`
        }
      </p>

      <h2>{language === 'en' ? '4. Payments' : '۴. پرداخت‌ها'}</h2>
      <p>
        {language === 'en'
          ? `All payments must be made through the approved payment gateways on our website. You agree to provide current, complete, and accurate purchase and account information for all purchases made.`
          : `تمام پرداخت‌ها باید از طریق درگاه‌های پرداخت تایید شده در وب‌سایت ما انجام شود. شما موافقت می‌کنید که اطلاعات خرید و حساب کاربری فعلی، کامل و دقیق را برای تمام خریدهای انجام شده ارائه دهید.`
        }
      </p>
      
      <h2>{language === 'en' ? '5. Intellectual Property' : '۵. مالکیت معنوی'}</h2>
      <p>
        {language === 'en'
          ? `The service and its original content, features, and functionality are and will remain the exclusive property of ili shop and its licensors.`
          : `سرویس و محتوای اصلی، ویژگی‌ها و عملکرد آن، مالکیت انحصاری ایلی شاپ و مجوزدهندگان آن بوده و خواهد بود.`
        }
      </p>

      <h2>{language === 'en' ? '6. Limitation of Liability' : '۶. محدودیت مسئولیت'}</h2>
      <p>
        {language === 'en'
          ? `In no event shall ili shop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.`
          : `در هیچ موردی ایلی شاپ، و نه مدیران، کارمندان، شرکا، نمایندگان، تامین‌کنندگان یا وابستگان آن، مسئول هیچ‌گونه خسارت غیرمستقیم، اتفاقی، خاص، تبعی یا تنبیهی، از جمله بدون محدودیت، از دست دادن سود، داده، استفاده، حسن نیت، یا سایر خسارات نامشهود، ناشی از دسترسی یا استفاده شما یا عدم توانایی در دسترسی یا استفاده از سرویس نخواهند بود.`
        }
      </p>

      <h2>{language === 'en' ? '7. Governing Law' : '۷. قانون حاکم'}</h2>
      <p>
        {language === 'en'
          ? `These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which ili shop operates, without regard to its conflict of law provisions.`
          : `این شرایط باید مطابق با قوانین حوزه قضایی که ایلی شاپ در آن فعالیت می‌کند، بدون توجه به مفاد تضاد قوانین آن، اداره و تفسیر شوند.`
        }
      </p>

      <h2>{language === 'en' ? '8. Changes to Terms' : '۸. تغییرات در شرایط'}</h2>
      <p>
        {language === 'en'
          ? `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.`
          : `ما حق داریم، به صلاحدید خود، این شرایط را در هر زمان تغییر داده یا جایگزین کنیم. ما سعی خواهیم کرد حداقل ۳۰ روز قبل از اجرایی شدن هرگونه شرایط جدید، اطلاع‌رسانی کنیم.`
        }
      </p>

      <h2>{language === 'en' ? '9. Contact Us' : '۹. تماس با ما'}</h2>
      <p>
        {language === 'en'
          ? `If you have any questions about these Terms, please contact us.`
          : `اگر در مورد این شرایط سؤالی دارید، لطفاً با ما تماس بگیرید.`
        }
      </p>
    </div>
  );
}
