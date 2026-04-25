'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import StatusBadge from '@/components/StatusBadge';
import { API_BASE, fetchJSON } from '@/lib/api';

const socketBase = API_BASE.replace('/api', '');

export default function OwnerPage() {
  const [orders, setOrders] = useState([]);
  const [staffMember, setStaffMember] = useState('');

  async function loadOrders() {
    const data = await fetchJSON('/orders');
    setOrders(data.orders);
  }

  useEffect(() => {
    loadOrders();
    const socket = io(socketBase);
    socket.on('order:new', loadOrders);
    socket.on('order:updated', loadOrders);
    return () => socket.disconnect();
  }, []);

  async function patchOrder(orderId, payload) {
    await fetchJSON(`/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    await loadOrders();
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-brand">Owner Dashboard</h1>
      <p className="mb-6 text-sm text-slate-500">Real-time order feed, assignment, billing and statuses.</p>

      <div className="grid gap-4">
        {orders.map((order) => (
          <article key={order._id} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">Order #{order._id.slice(-6)} · Table {order.tableNumber}</h2>
              <div className="flex gap-2">
                <StatusBadge label={order.status} />
                <StatusBadge label={order.paymentStatus} />
              </div>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Items: {order.items.map((i) => `${i.menuItem?.name || 'Item'} x${i.quantity}`).join(', ')}
            </p>
            <p className="text-sm text-slate-600">Assigned to: {order.assignedTo || 'Not assigned'}</p>
            <p className="text-sm text-slate-600">Bill: ${Number(order.totalAmount || 0).toFixed(2)}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {['Pending', 'Preparing', 'Completed'].map((status) => (
                <button
                  key={status}
                  className="rounded border px-3 py-1 text-sm"
                  onClick={() => patchOrder(order._id, { status })}
                >
                  {status}
                </button>
              ))}

              <button
                className="rounded border px-3 py-1 text-sm"
                onClick={() =>
                  patchOrder(order._id, {
                    paymentStatus: order.paymentStatus === 'paid' ? 'unpaid' : 'paid'
                  })
                }
              >
                Toggle Payment
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={staffMember}
                onChange={(e) => setStaffMember(e.target.value)}
                placeholder="Assign staff"
                className="rounded border px-3 py-1 text-sm"
              />
              <button
                className="rounded bg-brand px-3 py-1 text-sm text-white"
                onClick={() => patchOrder(order._id, { assignedTo: staffMember })}
              >
                Assign
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
