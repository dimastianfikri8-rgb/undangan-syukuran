'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [guestName, setGuestName] = useState('Tamu Undangan')
  
  // State RSVP & Komentar (localStorage)
  const [comments, setComments] = useState([
    { name: 'Rian Pratama', status: 'Hadir', message: 'Barakallah Fikri & Arsya! Semoga lancar sampai hari H dan menjadi keluarga sakinah.' },
    { name: 'Dewi Lestari', status: 'Hadir', message: 'Happy wedding! Doa terbaik untuk kalian berdua.' }
  ])
  const [formName, setFormName] = useState('')
  const [formStatus, setFormStatus] = useState('Hadir')
  const [formMessage, setFormMessage] = useState('')

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Hitung mundur menuju 25 November 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const toParam = params.get('to')
    if (toParam) {
      const decoded = decodeURIComponent(toParam)
      setGuestName(decoded)
      setFormName(decoded)
    }

    const saved = localStorage.getItem('wedding_comments_fikri_arsya')
    if (saved) {
      try {
        setComments(JSON.parse(saved))
      } catch (e) {
        console.error("Gagal load komentar:", e)
      }
    }

    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-serenade-487.mp3')
    audioRef.current.loop = true

    const targetDate = new Date('2026-11-25T09:00:00').getTime()

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
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log("Autoplay blocked:", err)
      })
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

    const newEntry = {
      name: formName,
      status: formStatus,
      message: formMessage
    }

    const updated = [newEntry, ...comments]
    setComments(updated)
    localStorage.setItem('wedding_comments_fikri_arsya', JSON.stringify(updated))
    setFormMessage('')
    alert('Terima kasih! Konfirmasi kehadiran dan ucapan Anda berhasil dikirim.')
  }

  return (
    <main className="min-h-screen bg-[#0b0a09] text-[#e7e2d8] font-sans relative selection:bg-amber-600 selection:text-white overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* COVER / HALAMAN PEMBUKA                                   */}
      {/* ========================================================= */}
      <div 
        className={`fixed inset-0 z-50 bg-[#0b0a09] flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ease-in-out ${
          isOpen ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#0b0a09] to-[#0b0a09] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-md w-full border border-amber-500/30 p-8 rounded-3xl bg-[#141210]/90 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-serif text-2xl tracking-widest">
            FA
          </div>
          
          <div>
            <p className="text-amber-500 tracking-[0.3em] uppercase text-xs mb-2 font-medium">
              The Wedding Of
            </p>
            <h1 className="text-4xl font-serif text-amber-100 font-bold tracking-wide">
              Fikri & Arsya
            </h1>
          </div>
          
          <div className="p-4 bg-[#0b0a09]/70 rounded-2xl border border-amber-500/20 space-y-1">
            <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-lg font-semibold text-amber-200">
              {guestName}
            </p>
          </div>

          <p className="text-xs text-[#a8a29e] italic leading-relaxed px-2">
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada hari bahagia kami.
          </p>

          <button
            onClick={handleOpen}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-2xl shadow-xl shadow-amber-900/40 transition-all duration-300 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase cursor-pointer border border-amber-300/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5" />
            </svg>
            Buka Undangan
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* KONTEN UTAMA                                              */}
      {/* ========================================================= */}
      <div className="max-w-xl mx-auto px-4 py-16 flex flex-col items-center text-center space-y-16">
        
        {/* HERO SECTION / FOTO UTAMA & COUNTDOWN ALA WEKITA */}
        <div className="w-full space-y-6">
          <p className="text-amber-500 tracking-[0.3em] uppercase text-xs font-semibold">
            The Wedding Of
          </p>
          
          <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800" 
              alt="Fikri & Arsya" 
              className="w-full h-[450px] object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-transparent to-black/30"></div>
            
            <div className="absolute bottom-6 inset-x-6 text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif text-amber-100 font-bold">
                Fikri & Arsya
              </h2>
              <p className="text-xs text-amber-300 tracking-widest uppercase font-medium">
                Save The Date | 25 November 2026
              </p>
            </div>
          </div>

          {/* Countdown Grid */}
          <div className="bg-[#141210]/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-2xl">
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-[#0b0a09] p-3 rounded-2xl border border-amber-500/10">
                <span className="block text-2xl font-bold text-amber-200 font-serif">{timeLeft.days}</span>
                <span className="text-[9px] text-[#a8a29e] uppercase tracking-widest">Hari</span>
              </div>
              <div className="bg-[#0b0a09] p-3 rounded-2xl border border-amber-500/10">
                <span className="block text-2xl font-bold text-amber-200 font-serif">{timeLeft.hours}</span>
                <span className="text-[9px] text-[#a8a29e] uppercase tracking-widest">Jam</span>
              </div>
              <div className="bg-[#0b0a09] p-3 rounded-2xl border border-amber-500/10">
                <span className="block text-2xl font-bold text-amber-200 font-serif">{timeLeft.minutes}</span>
                <span className="text-[9px] text-[#a8a29e] uppercase tracking-widest">Menit</span>
              </div>
              <div className="bg-[#0b0a09] p-3 rounded-2xl border border-amber-500/10">
                <span className="block text-2xl font-bold text-amber-200 font-serif">{timeLeft.seconds}</span>
                <span className="text-[9px] text-[#a8a29e] uppercase tracking-widest">Detik</span>
              </div>
            </div>
          </div>
        </div>

        {/* QUOTE / AYAT SUCI */}
        <div className="w-full bg-[#141210]/60 border border-amber-500/20 p-6 rounded-3xl backdrop-blur-md">
          <blockquote className="text-xs text-[#a8a29e] italic leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          </blockquote>
          <span className="text-xs text-amber-400 font-semibold mt-3 block tracking-wider uppercase">
            (QS. Ar-Rum: 21)
          </span>
        </div>

        {/* PROFIL MEMPELAI */}
        <div className="w-full space-y-6">
          <h3 className="text-3xl font-serif text-amber-200 font-bold">Mempelai</h3>
          
          <div className="space-y-6">
            <div className="bg-[#141210]/80 border border-amber-500/20 rounded-3xl p-6 text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-amber-500/40">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Fikri" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-2xl font-serif text-amber-100 font-bold">Fikri Dimastian</h4>
                <p className="text-xs text-amber-500 mt-1">Putra dari Bpk. ... & Ibu ...</p>
              </div>
            </div>

            <div className="bg-[#141210]/80 border border-amber-500/20 rounded-3xl p-6 text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-amber-500/40">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Arsya" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-2xl font-serif text-amber-100 font-bold">Arsya Insyirah R</h4>
                <p className="text-xs text-amber-500 mt-1">Putri dari Bpk. ... & Ibu ...</p>
              </div>
            </div>
          </div>
        </div>

        {/* RANGKAIAN ACARA */}
        <div className="w-full space-y-6">
          <h3 className="text-3xl font-serif text-amber-200 font-bold">Rangkaian Acara</h3>
          
          <div className="grid gap-5">
            <div className="bg-[#141210]/80 border border-amber-500/20 rounded-3xl p-6 text-left space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-amber-400 font-serif">Akad Nikah</h4>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full uppercase">Utama</span>
              </div>
              <p className="text-sm text-[#e7e2d8]">Rabu, 25 November 2026</p>
              <p className="text-xs text-[#a8a29e]">Pukul 08.00 WIB s.d. Selesai</p>
              <p className="text-xs text-amber-200/90 bg-[#0b0a09] p-3 rounded-xl border border-amber-500/10">
                📍 Kediaman Mempelai Wanita, Cikampek - Jawa Barat
              </p>
            </div>

            <div className="bg-[#141210]/80 border border-amber-500/20 rounded-3xl p-6 text-left space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-amber-400 font-serif">Resepsi</h4>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full uppercase">Perayaan</span>
              </div>
              <p className="text-sm text-[#e7e2d8]">Rabu, 25 November 2026</p>
              <p className="text-xs text-[#a8a29e]">Pukul 11.00 WIB s.d. Selesai</p>
              <p className="text-xs text-amber-200/90 bg-[#0b0a09] p-3 rounded-xl border border-amber-500/10">
                📍 Gedung Serbaguna Cikampek
              </p>
            </div>
          </div>
        </div>

        {/* GALERI FOTO GRID ALA WEKITA */}
        <div className="w-full space-y-6">
          <h3 className="text-3xl font-serif text-amber-200 font-bold">Galeri Foto</h3>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=500" alt="Gallery 1" className="w-full h-48 object-cover rounded-2xl border border-amber-500/20" />
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=500" alt="Gallery 2" className="w-full h-48 object-cover rounded-2xl border border-amber-500/20" />
            <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=500" alt="Gallery 3" className="w-full h-48 object-cover rounded-2xl border border-amber-500/20" />
            <img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=500" alt="Gallery 4" className="w-full h-48 object-cover rounded-2xl border border-amber-500/20" />
          </div>
        </div>

        {/* AMPLOP DIGITAL */}
        <div className="w-full bg-[#141210]/80 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4 text-center">
          <h3 className="text-2xl font-serif text-amber-200 font-bold">Amplop Digital</h3>
          <p className="text-xs text-[#a8a29e] leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Jika ingin memberikan tanda kasih:
          </p>
          <div className="bg-[#0b0a09] p-5 rounded-2xl border border-amber-500/20 space-y-1">
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">BCA</p>
            <p className="text-xl font-mono font-bold text-amber-100">1234567890</p>
            <p className="text-xs text-[#a8a29e]">a.n. Fikri Dimastian</p>
          </div>
        </div>

        {/* BUKU TAMU & RSVP */}
        <div className="w-full bg-[#141210]/80 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6 text-left">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-serif text-amber-200 font-bold">Buku Tamu & RSVP</h3>
            <p className="text-xs text-[#a8a29e]">Konfirmasi kehadiran dan berikan ucapan terbaik.</p>
          </div>

          <form onSubmit={handleRSVP} className="space-y-4">
            <div>
              <label className="block text-[11px] text-amber-400 mb-1 uppercase tracking-wider">Nama Tamu</label>
              <input 
                type="text" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full bg-[#0b0a09] border border-amber-500/30 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] text-amber-400 mb-1 uppercase tracking-wider">Konfirmasi Kehadiran</label>
              <select 
                value={formStatus} 
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full bg-[#0b0a09] border border-amber-500/30 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Hadir">Hadir, akan datang</option>
                <option value="Berhalangan">Maaf, berhalangan hadir</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-amber-400 mb-1 uppercase tracking-wider">Ucapan & Doa Restu</label>
              <textarea 
                rows={3}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
                className="w-full bg-[#0b0a09] border border-amber-500/30 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                placeholder="Tulis ucapan..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg cursor-pointer border border-amber-400/30"
            >
              Kirim Ucapan & Kehadiran
            </button>
          </form>

          {/* List Komentar */}
          <div className="mt-8 space-y-3 pt-6 border-t border-amber-500/15 max-h-64 overflow-y-auto pr-1">
            <p className="text-[11px] text-amber-500 tracking-widest uppercase font-semibold mb-3">Ucapan Rekan & Sahabat:</p>
            {comments.map((c, idx) => (
              <div key={idx} className="bg-[#0b0a09] p-4 rounded-2xl border border-amber-500/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-200">{c.name}</span>
                  <span className={`text-[9px] px-2.5 py-0.5 rounded-full uppercase font-semibold ${c.status === 'Hadir' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-[#a8a29e] leading-relaxed">{c.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pt-8 pb-16 text-xs text-[#a8a29e] space-y-3 border-t border-amber-500/15 w-full text-center">
          <p className="font-serif text-amber-200 text-sm leading-relaxed px-4">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
          </p>
          <p className="pt-2 uppercase tracking-[0.25em] text-[10px]">Terima Kasih</p>
          <p className="font-bold text-amber-500 tracking-[0.3em] uppercase text-sm font-serif">
            Fikri & Arsya
          </p>
        </footer>

      </div>

      {/* FLOATING MUSIC BUTTON */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 bg-amber-600 hover:bg-amber-500 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2 border-amber-300/40 animate-bounce cursor-pointer"
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
        </button>
      )}

    </main>
  )
}