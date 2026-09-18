'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [guestName, setGuestName] = useState('Tamu Undangan')
  
  const [comments, setComments] = useState([
    { name: 'Rian Pratama', status: 'Hadir', message: 'Barakallah Fikri & Arsya! Semoga sakinah mawaddah warahmah.' },
    { name: 'Siti Rahma', status: 'Hadir', message: 'Happy wedding! Lancar sampai hari H ya kalian berdua.' }
  ])
  const [formName, setFormName] = useState('')
  const [formStatus, setFormStatus] = useState('Hadir')
  const [formMessage, setFormMessage] = useState('')

  // State untuk tombol salin amplop digital
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const params = new URLSearchParams(window.location.search)
    const toParam = params.get('to')
    if (toParam) {
      const decoded = decodeURIComponent(toParam)
      setGuestName(decoded)
      setFormName(decoded)
    }

    const saved = localStorage.getItem('wedding_comments_fikri_arsya')
    if (saved) {
      try { setComments(JSON.parse(saved)) } catch (e) {}
    }

    // Menggunakan file lagu lokal di folder public (public/music.mp3)
    audioRef.current = new Audio('/music.mp3')
    audioRef.current.loop = true

    const targetDate = new Date('2026-11-24T08:00:00').getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = targetDate - now
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formMessage.trim()) return
    const newEntry = { name: formName, status: formStatus, message: formMessage }
    const updated = [newEntry, ...comments]
    setComments(updated)
    localStorage.setItem('wedding_comments_fikri_arsya', JSON.stringify(updated))
    setFormMessage('')
    alert('Terima kasih! Konfirmasi kehadiran berhasil dikirim.')
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#2c2a29] relative selection:bg-stone-200 overflow-x-hidden flex flex-col items-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ================= COVER / AMPLOP PEMBUKA DENGAN EFEK FADE ================= */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-[#f7f5f0]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md w-full bg-white border border-stone-200/90 p-8 rounded-[2rem] shadow-2xl space-y-6"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[#f7f5f0] border border-stone-300/60 flex items-center justify-center text-stone-800 text-2xl tracking-widest shadow-inner" style={{ fontFamily: "'Playfair Display', serif" }}>
            F & A
          </div>
          <div className="space-y-1">
            <p className="text-stone-400 tracking-[0.3em] uppercase text-[10px] font-semibold">THE WEDDING OF</p>
            <h1 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Fikri & Arsya</h1>
          </div>
          <div className="p-4 bg-[#fcfbfa] rounded-2xl border border-stone-200/60 space-y-1 shadow-sm">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">Kepada Yth:</p>
            <p className="text-base font-semibold text-stone-800">{guestName}</p>
          </div>
          <button
            onClick={handleOpen}
            className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-2xl shadow-xl transition-all duration-300 text-xs tracking-[0.25em] uppercase cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Buka Undangan
          </button>
        </motion.div>
      </motion.div>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative flex flex-col items-center text-center pb-24 border-x border-stone-200/40">

        {/* 1. HERO SECTION */}
        <div className="w-full relative px-6 pt-10 pb-6 space-y-6">
          <p className="text-stone-400 tracking-[0.3em] uppercase text-[10px] font-semibold">THE WEDDING OF</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-stone-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800" 
              alt="Fikri & Arsya" 
              className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 inset-x-6 text-white space-y-1.5">
              <h2 className="text-4xl font-normal tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>Fikri & Arsya</h2>
              <p className="text-[11px] text-stone-200 tracking-[0.2em] uppercase font-medium">Selasa, 24 November 2026</p>
            </div>
          </motion.div>

          {/* Countdown timer */}
          <div className="grid grid-cols-4 gap-2.5 pt-2">
            {['Hari', 'Jam', 'Menit', 'Detik'].map((label, idx) => {
              const val = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][idx]
              return (
                <motion.div 
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#fcfbfa] border border-stone-200/80 p-3.5 rounded-2xl shadow-sm"
                >
                  <span className="block text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</span>
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest font-semibold">{label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 2. QUOTE / AYAT */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full px-8 py-12 space-y-5 bg-[#fcfbfa]/50"
        >
          <div className="w-12 h-12 mx-auto border border-stone-300 rounded-full flex items-center justify-center text-stone-700 text-xs shadow-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
            F&A
          </div>
          <blockquote className="text-xs text-stone-600 italic leading-relaxed max-w-sm mx-auto">
            "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya..."
          </blockquote>
          <p className="text-[11px] text-stone-400 uppercase tracking-widest font-semibold">(QS. Ar-Rum: 21)</p>
        </motion.div>

        {/* 3. PROFIL MEMPELAI */}
        <div className="w-full px-6 py-10 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="w-44 h-44 mx-auto rounded-3xl overflow-hidden shadow-lg border-2 border-stone-200/80">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Fikri" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Fikri Dimastian</h3>
              <p className="text-xs text-stone-500 font-medium">Putra dari Bpk. ... & Ibu ...</p>
            </div>
          </motion.div>

          <div className="w-12 h-[1px] bg-stone-200 mx-auto"></div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="w-44 h-44 mx-auto rounded-3xl overflow-hidden shadow-lg border-2 border-stone-200/80">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Arsya" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Arsya Insyirah R</h3>
              <p className="text-xs text-stone-500 font-medium">Putri dari Bpk. ... & Ibu ...</p>
            </div>
          </motion.div>
        </div>

        {/* 4. RANGKAIAN ACARA & MAPS */}
        <div className="w-full px-6 py-12 space-y-6 bg-[#fcfbfa]/60">
          <h3 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Wedding Events</h3>
          <div className="space-y-4 text-left">
            
            <div className="bg-white border border-stone-200/80 p-6 rounded-3xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">Akad Nikah</p>
                <span className="text-[9px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full uppercase font-medium">Utama</span>
              </div>
              <p className="text-sm font-bold text-stone-900">Selasa, 24 November 2026</p>
              <p className="text-xs text-stone-500">Pukul 08.00 WIB - Selesai</p>
              <p className="text-xs text-stone-600 pt-3 border-t border-stone-100 flex items-center gap-1.5 font-medium">
                <span>📍</span> Kediaman Mempelai
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 p-6 rounded-3xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">Resepsi</p>
                <span className="text-[9px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full uppercase font-medium">Perayaan</span>
              </div>
              <p className="text-sm font-bold text-stone-900">Selasa, 24 November 2026</p>
              <p className="text-xs text-stone-500">Pukul 11.00 WIB - Selesai</p>
              <p className="text-xs text-stone-600 pt-3 border-t border-stone-100 flex items-center gap-1.5 font-medium">
                <span>📍</span> Gedung Serbaguna
              </p>
            </div>

            {/* MAPS SECTION */}
            <div className="bg-white border border-stone-200/80 p-4 rounded-3xl space-y-3 shadow-sm text-center pt-6">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Peta Lokasi Acara</p>
              <p className="text-[11px] text-stone-500">Gedung Serbaguna / Kediaman Mempelai</p>
              
              <div className="w-full h-52 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.832742918809!2d107.456!3d-6.312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnNDMuMiJTIDEwN8KwMjcnMjEuNiJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold uppercase tracking-[0.15em] rounded-2xl transition-all shadow-sm border border-stone-200"
              >
                Buka di Google Maps 🗺️
              </a>
            </div>

          </div>
        </div>

        {/* 5. GALERI FOTO GRID */}
        <div className="w-full px-6 py-10 space-y-5">
          <h3 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Galeri Foto</h3>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400"
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-2xl shadow-sm border border-stone-100"
              >
                <img src={img} className="w-full h-44 object-cover" alt={`Galeri ${i+1}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6. AMPLOP DIGITAL & GIFT */}
        <div className="w-full px-6 py-12 space-y-6 text-left bg-white">
          <div className="text-center space-y-1">
            <p className="text-stone-400 tracking-[0.3em] uppercase text-[10px] font-semibold">TANDA KASIH</p>
            <h3 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Amplop Digital</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto pt-1">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { bank: "BCA", holder: "Fikri Dimastian", number: "1234567890" },
              { bank: "DANA", holder: "Arsya Insyirah R", number: "081234567890" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="bg-[#fcfbfa] border border-stone-200/80 p-6 rounded-3xl shadow-sm space-y-3 relative overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-900">{item.bank}</span>
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-serif italic">
                    {item.bank[0]}
                  </div>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">Nomor Rekening / Akun</p>
                  <p className="text-base font-bold text-stone-900 tracking-wider font-mono">{item.number}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                  <p className="text-xs text-stone-600 font-medium">a.n. {item.holder}</p>
                  <button
                    onClick={() => handleCopy(item.number, idx)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[10px] font-semibold uppercase tracking-widest rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    {copiedIndex === idx ? 'Berhasil Disalin! ✓' : 'Salin Rekening'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 7. BUKU TAMU & RSVP */}
        <div className="w-full px-6 py-12 space-y-6 text-left bg-[#fcfbfa]/60">
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-normal text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Buku Tamu</h3>
            <p className="text-xs text-stone-500">Konfirmasi kehadiran & berikan doa restu</p>
          </div>

          <form onSubmit={handleRSVP} className="space-y-4">
            <div>
              <label className="block text-[10px] text-stone-500 uppercase tracking-widest font-semibold mb-1">Nama Tamu</label>
              <input 
                type="text" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] text-stone-500 uppercase tracking-widest font-semibold mb-1">Konfirmasi Kehadiran</label>
              <select 
                value={formStatus} 
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-500 shadow-sm"
              >
                <option value="Hadir">Hadir, akan datang</option>
                <option value="Tidak Hadir">Maaf, berhalangan hadir</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-stone-500 uppercase tracking-widest font-semibold mb-1">Ucapan & Doa</label>
              <textarea 
                rows={3}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
                placeholder="Tulis ucapan..."
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-500 shadow-sm resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-2xl transition-all shadow-md cursor-pointer"
            >
              Kirim Ucapan
            </button>
          </form>

          {/* List Komentar */}
          <div className="mt-8 space-y-3 pt-6 border-t border-stone-200/60 max-h-64 overflow-y-auto pr-1">
            {comments.map((c, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">{c.name}</span>
                  <span className={`text-[9px] px-2.5 py-0.5 rounded-full uppercase font-medium ${c.status === 'Hadir' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-0.5">{c.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="w-full py-12 bg-white text-center space-y-3 border-t border-stone-200/60">
          <p className="text-xs text-stone-500 px-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>"Merupakan suatu kehormatan dan kebahagiaan bagi kami..."</p>
          <p className="text-lg font-normal text-stone-900 tracking-wider pt-2" style={{ fontFamily: "'Playfair Display', serif" }}>Fikri & Arsya</p>
        </footer>

      </div>

      {/* FLOATING MUSIC BUTTON */}
      {isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 bg-stone-900 hover:bg-stone-800 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer border border-stone-700"
          title={isPlaying ? "Matikan Musik" : "Putar Musik"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </motion.button>
      )}

    </main>
  )
}