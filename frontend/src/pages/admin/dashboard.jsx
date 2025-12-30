import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProductsSold: 0,
    topProducts: [],
    recentReviews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_SERVER}/api/admin/metrics/overview`,
          { withCredentials: true }
        );
        if (res?.data?.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='border rounded-lg p-4'>
          <h3 className='text-sm text-muted-foreground'>Total Orders</h3>
          <p className='text-2xl font-bold'>{data.totalOrders}</p>
        </div>
        <div className='border rounded-lg p-4'>
          <h3 className='text-sm text-muted-foreground'>Total Revenue</h3>
          <p className='text-2xl font-bold'>₹{Number(data.totalRevenue).toFixed(2)}</p>
        </div>
        <div className='border rounded-lg p-4'>
          <h3 className='text-sm text-muted-foreground'>Products Sold</h3>
          <p className='text-2xl font-bold'>{data.totalProductsSold}</p>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className='text-xl font-bold mb-3'>Top Products</h2>
        <div className='border rounded-lg'>
          <div className='grid grid-cols-3 font-semibold border-b p-3'>
            <div>Title</div>
            <div>Units Sold</div>
            <div>Revenue</div>
          </div>
          {data.topProducts?.map((p) => (
            <div key={p.productId} className='grid grid-cols-3 p-3 border-b last:border-0'>
              <div className='truncate'>{p.title}</div>
              <div>{p.unitsSold}</div>
              <div>₹{Number(p.revenue).toFixed(2)}</div>
            </div>
          ))}
          {(!data.topProducts || data.topProducts.length === 0) && (
            <div className='p-3 text-muted-foreground'>No sales yet.</div>
          )}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className='text-xl font-bold mb-3'>Recent Reviews</h2>
        <div className='space-y-3'>
          {data.recentReviews?.map((r, idx) => (
            <div key={idx} className='border rounded-lg p-3'>
              <div className='flex items-center justify-between'>
                <div className='font-semibold'>{r.productTitle}</div>
                <Badge variant='secondary'>{r.rating}★</Badge>
              </div>
              <p className='text-muted-foreground mt-1'>{r.comment}</p>
              <div className='text-xs text-muted-foreground mt-2'>
                by {r.userName} on {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
          {(!data.recentReviews || data.recentReviews.length === 0) && (
            <div className='text-muted-foreground'>No reviews yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard