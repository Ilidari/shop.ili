"use client";
import { useState, useEffect } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import type { Order } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingBag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// Mock orders data
const generateMockOrders = (t: Function, currencySymbol: string, language: string): Order[] => [
  {
    id: 'ORD001',
    date: '2023-10-26',
    status: 'Completed',
    items: [
      { id: 'prod_001', name: { en: 'Ultimate OS License', fa: 'لایسنس سیستم عامل نهایی' }, price: 99.99, quantity: 1, category:'license', currency:'USD', description:{en:'',fa:''}, image:'', slug:'' },
    ],
    total: 99.99,
  },
  {
    id: 'ORD002',
    date: '2023-11-15',
    status: 'Processing',
    items: [
      { id: 'vps_001', name: { en: 'Basic VPS Plan', fa: 'پلن VPS پایه' }, price: 10.00, quantity: 1, category:'vps', currency:'USD', description:{en:'',fa:''}, image:'', slug:''  },
      { id: 'prod_002', name: { en: 'Pro Design Suite', fa: 'مجموعه طراحی حرفه‌ای' }, price: 149.50, quantity: 1, category:'license', currency:'USD', description:{en:'',fa:''}, image:'', slug:'' },
    ],
    total: 159.50,
  },
  {
    id: 'ORD003',
    date: '2023-12-01',
    status: 'Cancelled',
    items: [
      { id: 'prod_003', name: { en: 'Security Toolkit', fa: 'جعبه ابزار امنیتی'}, price: 79.99, quantity: 2, category:'license', currency:'USD', description:{en:'',fa:''}, image:'', slug:''  },
    ],
    total: 159.98,
  },
];


export default function OrdersPage() {
  const { t, language, currencySymbol } = useLocalization();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(generateMockOrders(t, currencySymbol, language));
  }, [t, currencySymbol, language]);

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'Completed': return 'default'; // Greenish, using primary as default
      case 'Processing': return 'secondary'; // Bluish or yellowish
      case 'Cancelled': return 'destructive';
      default: return 'outline';
    }
  };
  
  const getStatusText = (status: Order['status']) => {
    if (language === 'fa') {
      switch (status) {
        case 'Completed': return 'تکمیل شده';
        case 'Processing': return 'در حال پردازش';
        case 'Cancelled': return 'لغو شده';
        default: return status;
      }
    }
    return status;
  }


  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-headline font-bold">{t('orders.title')}</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">{t('orders.noOrders')}</p>
          <Button asChild variant="link" className="mt-2 text-primary">
            <Link href="/products">{t('continueShopping')}</Link>
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orders.id')}</TableHead>
              <TableHead>{t('orders.date')}</TableHead>
              <TableHead>{t('orders.status')}</TableHead>
              <TableHead className="text-right rtl:text-left">{t('orders.total')}</TableHead>
              <TableHead className="text-center">{t('orders.action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)} className={getStatusBadgeVariant(order.status) === 'default' ? 'bg-green-500 text-white' : ''}>
                    {getStatusText(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right rtl:text-left">{currencySymbol}{order.total.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="mr-1 rtl:ml-1 rtl:mr-0 h-4 w-4" />
                        {t('orders.view')}
                      </Button>
                    </DialogTrigger>
                    {selectedOrder && selectedOrder.id === order.id && (
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>{t('orders.id')}: {selectedOrder.id}</DialogTitle>
                        <DialogDescription>
                          {t('orders.date')}: {new Date(selectedOrder.date).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')} - {t('orders.status')}: <Badge variant={getStatusBadgeVariant(selectedOrder.status)} className={getStatusBadgeVariant(selectedOrder.status) === 'default' ? 'bg-green-500 text-white' : ''}>{getStatusText(selectedOrder.status)}</Badge>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 max-h-80 overflow-y-auto py-4">
                        <h4 className="font-semibold">{language === 'en' ? 'Items:' : 'اقلام:'}</h4>
                        {selectedOrder.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center p-2 border rounded-md">
                            <div>
                              <p className="font-medium">{item.name[language]}</p>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? 'Qty: ' : 'تعداد: '}{item.quantity} x {currencySymbol}{item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-semibold">{currencySymbol}{(item.quantity * item.price).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                        <span>{t('orders.total')}:</span>
                        <span>{currencySymbol}{selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">{language === 'en' ? 'Close' : 'بستن'}</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// Link for product page
import Link from 'next/link';
