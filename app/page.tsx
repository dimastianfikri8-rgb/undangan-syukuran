'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [guestName, setGuestName] = useState('Tamu Undangan')
  
  // State untuk RSVP & Ucapan Tamu
  const [comments, setComments] = useState([
    { name: 'Budi Santoso', status: 'Hadir', message: 'Barakallah fii kum! Semoga sakinah mawaddah warahmah sampai jannah.' },
    { name: 'Siti Aminah', status: 'Hadir', message: 'Selamat ya Fikri & Arsya! Lancar sampai hari H.' }
  ])
  const [formName, setFormName] = useState('')
  const [formStatus, setFormStatus] = useState('Hadir')
  const [formMessage, setFormMessage] = useState('')

  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Hitung mundur menuju 25 November 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Ambil nama tamu dari URL parameter ?to=Nama
    const params = new URLSearchParams(window.location.search)
    const toParam = params.get('to')
    if (toParam) {
      setGuestName(decodeURIComponent(toParam))
      setFormName(decodeURIComponent(toParam)) // Otomatis isi nama di form RSVP
    }

    // Inisialisasi Audio Backsound
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-serenade-487.mp3')
    audioRef.current.loop = true

    const targetDate = new Date('2026-11-25T09:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleOpenInvitation = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("Autoplay dicegah browser:", error)
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

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formMessage.trim()) return

    const newComment = {
      name: formName,
      status: formStatus,
      message: formMessage
    }

    setComments([newComment, ...comments])
    setFormMessage('')
    alert('Terima kasih! Konfirmasi kehadiran dan ucapan Anda berhasil dikirim.')
  }

  return (
    <main className="min-h-screen bg-[#0d0c0a] text-[#e7e2d8] font-sans relative selection:bg-amber-700 selection:text-white overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* HALAMAN SAMPUL / COVER BUKA AMPLOP EKSKLUSIF              */}
      {/* ========================================================= */}
      <div 
        className={`fixed inset-0 z-50 bg-[#0d0c0a] flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ease-in-out ${
          isOpen ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-[#0d0c0a] to-[#0d0c0a] pointer-events-none"></div>
        
        {/* Bingkai Amplop Mewah */}
        <div className="relative z-10 max-w-md w-full border-2 border-amber-500/40 p-8 rounded-3xl bg-[#161412]/90 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif text-2xl">
            FA
          </div>
          
          <div>
            <p className="text-amber-500 tracking-[0.3em] uppercase text-xs mb-2 font-semibold">
              The Wedding Of
            </p>
            <h1 className="text-4xl font-serif text-amber-100 font-bold tracking-wide">
              Fikri & Arsya
            </h1>
          </div>
          
          <div className="p-4 bg-[#0d0c0a]/80 rounded-xl border border-amber-500/20 space-y-1">
            <p className="text-[11px] text-amber-400/80 uppercase tracking-widest">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-xl font-semibold text-amber-200">
              {guestName}
            </p>
          </div>

          <p className="text-xs text-[#a8a29e] italic leading-relaxed px-2">
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada hari bahagia kami.
          </p>

          <button
            onClick={handleOpenInvitation}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-xl shadow-xl shadow-amber-900/40 transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-widest uppercase cursor-pointer border border-amber-300/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5" />
            </svg>
            Buka Undangan
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* KONTEN UTAMA UNDANGAN                                     */}
      {/* ========================================================= */}
      <div className="max-w-xl mx-auto px-4 py-16 flex flex-col items-center text-center space-y-16">
        
        {/* Header & Foto Mempelai */}
        <div className="w-full space-y-6">
          <p className="text-amber-500 tracking-[0.3em] uppercase text-xs font-semibold">
            Walimatul 'Ursy
          </p>
          
          <div className="relative w-48 h-48 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600" 
              alt="Fikri & Arsya" 
              className="w-full h-full object-cover rounded-full border-4 border-[#0d0c0a]"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-amber-100 font-bold tracking-wide">
            Fikri Dimastian <br/>& Arsya Insyirah R
          </h2>
          
          <blockquote className="text-sm text-[#a8a29e] italic max-w-md mx-auto px-4 leading-relaxed border-l-2 border-r-2 border-amber-500/30 py-3">
            "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya." <br/>
            <span className="text-xs text-amber-500 not-italic mt-2 block font-semibold">(QS. Ar-Rum: 21)</span>
          </blockquote>
        </div>

        {/* Countdown */}
        <div className="w-full bg-[#161412]/80 backdrop-blur-md border border-amber-500/20 rounded-3xl p-6 shadow-2xl">
          <p className="text-amber-500 tracking-widest text-xs uppercase mb-4 font-semibold flex items-center justify-center gap-2">
            <span>⏳</span> Menuju Hari Bahagia
          </p>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[#0d0c0a] p-3 rounded-2xl border border-amber-500/10">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.days}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Hari</span>
            </div>
            <div className="bg-[#0d0c0a] p-3 rounded-2xl border border-amber-500/10">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.hours}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Jam</span>
            </div>
            <div className="bg-[#0d0c0a] p-3 rounded-2xl border border-amber-500/10">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.minutes}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Menit</span>
            </div>
            <div className="bg-[#0d0c0a] p-3 rounded-2xl border border-amber-500/10">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.seconds}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Detik</span>
            </div>
          </div>
        </div>

        {/* Rangkaian Acara */}
        <div className="w-full space-y-6">
          <h3 className="text-3xl font-serif text-amber-200 font-bold">
            Rangkaian Acara
          </h3>
          
          <div className="grid gap-5">
            <div className="bg-[#161412]/80 backdrop-blur-md border border-amber-500/20 rounded-3xl p-6 text-left shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-amber-400 font-serif">Akad Nikah</h4>
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full">Utama</span>
              </div>
              <p className="text-sm text-[#e7e2d8]">Rabu, 25 November 2026</p>
              <p className="text-xs text-[#a8a29e]">Pukul 08.00 WIB s.d. Selesai</p>
              <div className="pt-2">
                <p className="text-xs text-amber-200/90 bg-[#0d0c0a] p-3.5 rounded-xl border border-amber-500/10 flex items-start gap-2">
                  <span>📍</span> Kediaman Mempelai Wanita, Cikampek - Jawa Barat
                </p>
              </div>
            </div>

            <div className="bg-[#161412]/80 backdrop-blur-md border border-amber-500/20 rounded-3xl p-6 text-left shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-amber-400 font-serif">Resepsi</h4>
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full">Perayaan</span>
              </div>
              <p className="text-sm text-[#e7e2d8]">Rabu, 25 November 2026</p>
              <p className="text-xs text-[#a8a29e]">Pukul 11.00 WIB s.d. Selesai</p>
              <div className="pt-2">
                <p className="text-xs text-amber-200/90 bg-[#0d0c0a] p-3.5 rounded-xl border border-amber-500/10 flex items-start gap-2">
                  <span>📍</span> Gedung Serbaguna Cikampek
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amplop Digital */}
        <div className="w-full bg-[#161412]/80 backdrop-blur-md border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4 text-center">
          <h3 className="text-2xl font-serif text-amber-200 font-bold">
            Amplop Digital
          </h3>
          <p className="text-xs text-[#a8a29e] leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Jika ingin memberikan tanda kasih, dapat melalui:
          </p>
          <div className="bg-[#0d0c0a] p-5 rounded-2xl border border-amber-500/15 space-y-2">
            <p className="text-xs text-amber-500 font-semibold uppercase tracking-widest">BCA</p>
            <p className="text-xl font-mono font-bold text-amber-100 tracking-wider">1234567890</p>
            <p className="text-xs text-[#a8a29e]">a.n. Fikri Dimastian</p>
          </div>
        </div>

        {/* RSVP & Buku Tamu */}
        <div className="w-full bg-[#161412]/80 backdrop-blur-md border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6 text-left">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-serif text-amber-200 font-bold">Buku Tamu & RSVP</h3>
            <p className="text-xs text-[#a8a29e]">Konfirmasi kehadiran dan berikan ucapan terbaik untuk kedua mempelai.</p>
          </div>

          <form onSubmit={handleRSVPSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-amber-400 mb-1 uppercase tracking-wider">Nama</label>
              <input 
                type="text" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full bg-[#0d0c0a] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="block text-xs text-amber-400 mb-1 uppercase tracking-wider">Konfirmasi Kehadiran</label>
              <select 
                value={formStatus} 
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full bg-[#0d0c0a] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Hadir">Hadir, akan datang</option>
                <option value="Berhalangan">Maaf, berhalangan hadir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-amber-400 mb-1 uppercase tracking-wider">Ucapan & Doa</label>
              <textarea 
                rows={3}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
                className="w-full bg-[#0d0c0a] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                placeholder="Tulis ucapan dan doa restu..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Kirim Ucapan & Kehadiran
            </button>
          </form>

          {/* Daftar Komentar Tamu */}
          <div className="mt-8 space-y-3 pt-6 border-t border-amber-500/10 max-h-64 overflow-y-auto pr-1">
            <p className="text-xs text-amber-500 tracking-wider uppercase font-semibold mb-2">Ucapan Rekan & Sahabat:</p>
            {comments.map((c, idx) => (
              <div key={idx} className="bg-[#0d0c0a] p-4 rounded-xl border border-amber-500/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-200">{c.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === 'Hadir' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-[#a8a29e] leading-relaxed pt-1">{c.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-16 text-xs text-[#a8a29e] space-y-3 border-t border-amber-500/10 w-full text-center">
          <p className="font-serif text-amber-200 text-sm leading-relaxed px-4">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
          </p>
          <p className="pt-2 uppercase tracking-widest text-[10px]">Terima Kasih</p>
          <p className="font-bold text-amber-500 tracking-widest uppercase text-sm">
            Fikri & Arsya
          </p>
        </footer>

      </div>

      {/* ========================================================= */}
      {/* TOMBOL FLOATING KONTROL MUSIK                              */}
      {/* ========================================================= */}
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