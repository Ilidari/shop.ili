"use client";
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import Image from 'next/image';


export default function ContactPage() {
  const { t, language } = useLocalization();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log("Contact form submitted:", formData);
    toast({
      title: language === 'en' ? "Message Sent!" : "پیام ارسال شد!",
      description: language === 'en' ? "We'll get back to you soon." : "به زودی با شما تماس خواهیم گرفت.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
  };

  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          {t('footer.contact')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {language === 'en' 
            ? `We're here to help! Reach out to us with any questions or inquiries.`
            : `ما اینجا هستیم تا کمک کنیم! با هرگونه سوال یا استعلام با ما تماس بگیرید.`
          }
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{language === 'en' ? 'Send us a Message' : 'برای ما پیام ارسال کنید'}</CardTitle>
            <CardDescription>
                {language === 'en' ? 'Fill out the form below and we will get back to you as soon as possible.' : 'فرم زیر را پر کنید و ما در اسرع وقت با شما تماس خواهیم گرفت.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">{language === 'en' ? 'Your Name' : 'نام شما'}</Label>
                <Input id="name" value={formData.name} onChange={handleChange} required className="mt-1 h-11" />
              </div>
              <div>
                <Label htmlFor="email">{language === 'en' ? 'Your Email' : 'ایمیل شما'}</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 h-11" />
              </div>
              <div>
                <Label htmlFor="subject">{language === 'en' ? 'Subject' : 'موضوع'}</Label>
                <Input id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 h-11" />
              </div>
              <div>
                <Label htmlFor="message">{language === 'en' ? 'Message' : 'پیام'}</Label>
                <Textarea id="message" value={formData.message} onChange={handleChange} rows={5} required className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg">
                {language === 'en' ? 'Send Message' : 'ارسال پیام'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">{language === 'en' ? 'Contact Information' : 'اطلاعات تماس'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-accent" />
                <a href="mailto:support@ilishop.com" className="hover:text-primary">support@ilishop.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-accent" />
                <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-accent mt-1" />
                <p>
                  123 Tech Avenue, Suite 404<br />
                  Innovation City, CA 90210<br />
                  {language === 'en' ? 'United States' : 'ایالات متحده'}
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg">
             <Image
                src="https://placehold.co/600x400.png"
                alt={language === 'en' ? 'Map showing ili shop location' : 'نقشه مکان ایلی شاپ'}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="street map"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
