'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { fetchJSON } from '@/lib/api';

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});
}

export default function CustomerTablePage({ params }) {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({});
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  const tableNumber = params.tableNumber;

  useEffect(() => {
    fetchJSON('/menu?visible=true')
      .then((data) => setMenu(data.items))
      .catch((err) => setError(err.message));
  }, []);

  const grouped = useMemo(() => groupByCategory(menu), [menu]);

  const total = useMemo(
    () =>
      menu.reduce((sum, item) => {
        const qty = cart[item._id] || 0;
        return sum + qty * item.price;
      }, 0),
    [cart, menu]
  );

  function addItem(id) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function removeItem(id) {
    setCart((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  }

  async function placeOrder() {
    const items = Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([menuItem, quantity]) => ({ menuItem, quantity }));

    if (!items.length) return;

    setPlacing(true);
    setError('');

    try {
      await fetchJSON('/orders', {
        method: 'POST',
        body: JSON.stringify({
          tableNumber,
          items,
          paymentStatus: 'unpaid'
        })
      });
      setCart({});
      alert('Order placed successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-4 pb-40">
      <header className="sticky top-0 z-10 rounded-b-2xl bg-white p-4 shadow">
        <h1 className="text-xl font-bold text-brand">Table {tableNumber} Menu</h1>
        <p className="text-sm text-slate-500">Mobile-first QR ordering</p>
      </header>

      {error && <p className="mt-4 rounded bg-rose-100 p-2 text-rose-700">{error}</p>}

      <section className="mt-4 space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="mb-2 text-lg font-semibold">{category}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <article key={item._id} className="rounded-xl border bg-white p-3 shadow-sm">
                  <div className="relative h-28 w-full overflow-hidden rounded-md bg-slate-100">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded border px-2" onClick={() => removeItem(item._id)}>
                        -
                      </button>
                      <span>{cart[item._id] || 0}</span>
                      <button className="rounded bg-brand px-2 text-white" onClick={() => addItem(item._id)}>
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={placeOrder}
            disabled={placing || total === 0}
            className="rounded-lg bg-brand px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            {placing ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </footer>
    </main>
  );
}
