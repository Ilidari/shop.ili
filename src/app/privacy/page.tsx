"use client";
import { useLocalization } from '@/contexts/LocalizationContext';

export default function PrivacyPage() {
  const { t, language } = useLocalization();

  return (
    <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto py-12 px-4">
      <h1 className="font-headline text-primary">{t('footer.privacy')}</h1>
      
      <p><strong>{language === 'en' ? 'Last Updated:' : 'آخرین به‌روزرسانی:'}</strong> {new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</p>

      <h2>{language === 'en' ? '1. Information We Collect' : '۱. اطلاعاتی که جمع‌آوری می‌کنیم'}</h2>
      <p>
        {language === 'en' 
          ? `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This may include your name, email address, shipping address, and payment information (processed securely by our payment partners).`
          : `ما اطلاعاتی را که مستقیماً به ما ارائه می‌دهید، مانند هنگام ایجاد حساب کاربری، انجام خرید یا تماس با پشتیبانی مشتری، جمع‌آوری می‌کنیم. این ممکن است شامل نام، آدرس ایمیل، آدرس ارسال و اطلاعات پرداخت شما (که به طور امن توسط شرکای پرداخت ما پردازش می‌شود) باشد.`
        }
      </p>
      <p>
        {language === 'en'
          ? `We also collect information automatically when you use our services, such as your IP address, browser type, operating system, and browsing activity.`
          : `ما همچنین هنگام استفاده شما از خدمات ما، اطلاعاتی را به طور خودکار جمع‌آوری می‌کنیم، مانند آدرس IP، نوع مرورگر، سیستم عامل و فعالیت مرور شما.`
        }
      </p>

      <h2>{language === 'en' ? '2. How We Use Your Information' : '۲. چگونه از اطلاعات شما استفاده می‌کنیم'}</h2>
      <p>
        {language === 'en' 
          ? `We use your information to:
            <ul>
              <li>Provide, maintain, and improve our services.</li>
              <li>Process transactions and send you related information, including confirmations and invoices.</li>
              <li>Communicate with you about products, services, offers, promotions, and events.</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
              <li>Personalize the services and provide advertisements, content, or features that match user profiles or interests.</li>
            </ul>`
          : `ما از اطلاعات شما برای موارد زیر استفاده می‌کنیم:
            <ul>
              <li>ارائه، نگهداری و بهبود خدمات ما.</li>
              <li>پردازش تراکنش‌ها و ارسال اطلاعات مرتبط، از جمله تأییدیه‌ها و فاکتورها.</li>
              <li>ارتباط با شما در مورد محصولات، خدمات، پیشنهادات، تبلیغات و رویدادها.</li>
              <li>نظارت و تجزیه و تحلیل روندها، استفاده و فعالیت‌ها در ارتباط با خدمات ما.</li>
              <li>شخصی‌سازی خدمات و ارائه تبلیغات، محتوا یا ویژگی‌هایی که با پروفایل‌ها یا علایق کاربران مطابقت دارد.</li>
            </ul>`
        }
      </p>

      <h2>{language === 'en' ? '3. Sharing Your Information' : '۳. اشتراک‌گذاری اطلاعات شما'}</h2>
      <p>
        {language === 'en'
          ? `We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. We do not sell your personal information.`
          : `ما ممکن است اطلاعات شما را با فروشندگان شخص ثالث و ارائه‌دهندگان خدماتی که به نمایندگی از ما خدماتی را انجام می‌دهند، مانند پردازش پرداخت، تجزیه و تحلیل داده‌ها، تحویل ایمیل، خدمات میزبانی و خدمات مشتری، به اشتراک بگذاریم. ما اطلاعات شخصی شما را نمی‌فروشیم.`
        }
      </p>

      <h2>{language === 'en' ? '4. Data Security' : '۴. امنیت داده‌ها'}</h2>
      <p>
        {language === 'en'
          ? `We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.`
          : `ما اقدامات منطقی را برای کمک به محافظت از اطلاعات مربوط به شما در برابر از دست دادن، سرقت، سوء استفاده و دسترسی، افشا، تغییر و تخریب غیرمجاز انجام می‌دهیم.`
        }
      </p>
      
      <h2>{language === 'en' ? '5. Your Choices' : '۵. انتخاب‌های شما'}</h2>
      <p>
        {language === 'en'
          ? `You may update, correct, or delete your account information at any time by logging into your account. You can also opt out of receiving promotional emails from us by following the instructions in those emails.`
          : `شما می‌توانید در هر زمان با ورود به حساب کاربری خود، اطلاعات حساب خود را به‌روز، اصلاح یا حذف کنید. همچنین می‌توانید با دنبال کردن دستورالعمل‌های موجود در ایمیل‌های تبلیغاتی، از دریافت آنها انصراف دهید.`
        }
      </p>

      <h2>{language === 'en' ? '6. Cookies' : '۶. کوکی‌ها'}</h2>
      <p>
        {language === 'en'
          ? `We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`
          : `ما از کوکی‌ها و فناوری‌های ردیابی مشابه برای ردیابی فعالیت در سرویس خود و نگهداری اطلاعات خاص استفاده می‌کنیم. شما می‌توانید به مرورگر خود دستور دهید که تمام کوکی‌ها را رد کند یا هنگام ارسال کوکی نشان دهد.`
        }
      </p>

      <h2>{language === 'en' ? '7. Changes to This Policy' : '۷. تغییرات در این سیاست'}</h2>
      <p>
        {language === 'en'
          ? `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.`
          : `ما ممکن است هر از گاهی سیاست حفظ حریم خصوصی خود را به‌روز کنیم. ما هرگونه تغییر را با ارسال سیاست حفظ حریم خصوصی جدید در این صفحه به شما اطلاع خواهیم داد.`
        }
      </p>

      <h2>{language === 'en' ? '8. Contact Us' : '۸. تماس با ما'}</h2>
      <p>
        {language === 'en'
          ? `If you have any questions about this Privacy Policy, please contact us.`
          : `اگر در مورد این سیاست حفظ حریم خصوصی سؤالی دارید، لطفاً با ما تماس بگیرید.`
        }
      </p>
    </div>
  );
}
