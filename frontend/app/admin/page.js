'use client';

import { useEffect, useState } from 'react';
import { fetchJSON } from '@/lib/api';

const defaultForm = {
  name: '',
  category: '',
  price: '',
  imageUrl: '',
  visibleToCustomers: true,
  visibleToOwners: true
};

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(defaultForm);

  async function loadMenu() {
    const data = await fetchJSON('/menu');
    setItems(data.items);
  }

  useEffect(() => {
    loadMenu();
  }, []);

  async function saveItem(e) {
    e.preventDefault();
    await fetchJSON('/menu', {
      method: 'POST',
      headers: { 'x-role': 'Admin' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price)
      })
    });
    setForm(defaultForm);
    await loadMenu();
  }

  async function removeItem(id) {
    await fetchJSON(`/menu/${id}`, {
      method: 'DELETE',
      headers: { 'x-role': 'Admin' }
    });
    await loadMenu();
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-brand">Admin Panel</h1>
      <p className="mb-6 text-sm text-slate-500">Manage menu items, prices, categories and visibility controls.</p>

      <form onSubmit={saveItem} className="grid gap-3 rounded-xl border bg-white p-4 shadow-sm sm:grid-cols-2">
        <input className="rounded border p-2" placeholder="Item name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input className="rounded border p-2" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.visibleToCustomers} onChange={(e) => setForm({ ...form, visibleToCustomers: e.target.checked })} /> Visible to customers
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.visibleToOwners} onChange={(e) => setForm({ ...form, visibleToOwners: e.target.checked })} /> Visible to owners
        </label>
        <button type="submit" className="rounded bg-brand px-4 py-2 font-semibold text-white sm:col-span-2">
          Add Item
        </button>
      </form>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <article key={item._id} className="flex items-center justify-between rounded-lg border bg-white p-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-slate-600">
                {item.category} · ${item.price.toFixed(2)} · C:{item.visibleToCustomers ? 'Y' : 'N'} O:{item.visibleToOwners ? 'Y' : 'N'}
              </p>
            </div>
            <button onClick={() => removeItem(item._id)} className="rounded bg-rose-600 px-3 py-1 text-sm text-white">
              Delete
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
