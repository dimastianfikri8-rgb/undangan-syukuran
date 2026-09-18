'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RsvpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    name: '',
    status: 'hadir',
    guest_count: 1,
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('wishes').insert([form])

    setLoading(false)
    if (error) {
      alert('Gagal mengirim ucapan, silakan coba lagi.')
    } else {
      alert('Terima kasih! RSVP & Ucapan kamu berhasil terkirim.')
      setForm({ name: '', status: 'hadir', guest_count: 1, message: '' })
      if (onSuccess) onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-2xl shadow-md border border-amber-100 space-y-4">
      <h3 className="text-xl font-serif text-amber-950 font-bold text-center">Konfirmasi Kehadiran & Doa</h3>
      
      <div>
        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Nama Lengkap</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          placeholder="Isi nama kamu"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Konfirmasi Kehadiran</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-white"
        >
          <option value="hadir">Hadir</option>
          <option value="tidak_hadir">Tidak Hadir</option>
          <option value="ragu">Masih Ragu</option>
        </select>
      </div>

      {form.status === 'hadir' && (
        <div>
          <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Jumlah Tamu</label>
          <input
            type="number"
            min="1"
            max="5"
            value={form.guest_count}
            onChange={(e) => setForm({ ...form, guest_count: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Pesan & Doa</label>
        <textarea
          required
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          placeholder="Tulis ucapan atau doa..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-lg transition duration-200 text-sm shadow"
      >
        {loading ? 'Mengirim...' : 'Kirim Ucapan & RSVP'}
      </button>
    </form>
  )
}