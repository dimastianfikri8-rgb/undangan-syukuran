'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [guestName, setGuestName] = useState('Tamu Undangan')
  
  // Audio reference untuk musik latar undangan
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Hitung mundur menuju tanggal acara (25 November 2026)
  const [timeLeft, setTimeLeft] = useState({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  })

  useEffect(() => {
    // 1. Ambil parameter nama tamu dari URL (contoh: ?to=Budi)
    const params = new URLSearchParams(window.location.search)
    const toParam = params.get('to')
    if (toParam) {
      setGuestName(decodeURIComponent(toParam))
    }

    // 2. Inisialisasi Audio Backsound
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-serenade-487.mp3')
    audioRef.current.loop = true

    // 3. Konfigurasi Target Tanggal Pernikahan
    const targetDate = new Date('2026-11-25T09:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Fungsi untuk membuka undangan & memutar musik
  const handleOpenInvitation = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("Autoplay dicegah oleh browser:", error)
      })
    }
  }

  // Fungsi untuk tombol kontrol musik melayang (floating button)
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

  return (
    <main className="min-h-screen bg-[#141210] text-[#e7e2d8] font-sans relative selection:bg-amber-700 selection:text-white overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* HALAMAN SAMPUL / COVER PEMBUKA (ANIMASI BUKA UNDANGAN)    */}
      {/* ========================================================= */}
      <div 
        className={`fixed inset-0 z-50 bg-[#141210] flex flex-col items-center justify-center p-6 text-center transition-transform duration-1000 ease-in-out ${
          isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-[#141210] to-[#141210] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-md w-full border border-amber-500/30 p-8 rounded-2xl bg-[#1c1917]/80 backdrop-blur-md shadow-2xl space-y-6">
          
          <div>
            <p className="text-amber-500 tracking-[0.2em] uppercase text-xs mb-2 font-medium">
              The Wedding Of
            </p>
            <h1 className="text-4xl font-serif text-amber-100 font-bold tracking-wide">
              Fikri & Arsya
            </h1>
          </div>
          
          <div className="p-4 bg-[#141210]/60 rounded-xl border border-amber-500/20 space-y-1">
            <p className="text-xs text-amber-400/80 uppercase tracking-wider">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-xl font-semibold text-amber-200">
              {guestName}
            </p>
          </div>

          <p className="text-xs text-[#a8a29e] italic leading-relaxed">
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada acara pernikahan kami.
          </p>

          <button
            onClick={handleOpenInvitation}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-xl shadow-lg shadow-amber-900/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wider uppercase cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5" />
            </svg>
            Buka Undangan
          </button>

        </div>
      </div>

      {/* ========================================================= */}
      {/* KONTEN UTAMA UNDANGAN LENGKAP                              */}
      {/* ========================================================= */}
      <div className="max-w-xl mx-auto px-4 py-16 flex flex-col items-center text-center space-y-16">
        
        {/* BAGIAN HEADER & FOTO MEMPELAI */}
        <div className="w-full space-y-6">
          <p className="text-amber-500 tracking-[0.25em] uppercase text-xs font-semibold">
            Walimatul 'Ursy
          </p>
          
          {/* Bingkai Foto Bulat Bergradasi Emas */}
          <div className="relative w-44 h-44 mx-auto rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600" 
              alt="Mempelai Fikri & Arsya" 
              className="w-full h-full object-cover rounded-full border-4 border-[#141210]"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-amber-100 font-bold tracking-wide">
            Fikri Dimastian & Arsya Insyirah R
          </h2>
          
          <blockquote className="text-sm text-[#a8a29e] italic max-w-md mx-auto px-4 leading-relaxed border-l-2 border-r-2 border-amber-500/30 py-2">
            "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          </blockquote>
        </div>

        {/* BAGIAN COUNTDOWN / HITUNG MUNDUR */}
        <div className="w-full bg-[#1c1917]/60 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 shadow-xl">
          <p className="text-amber-500 tracking-widest text-xs uppercase mb-4 font-medium flex items-center justify-center gap-2">
            <span>⏱️</span> Menuju Hari Bahagia
          </p>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[#141210] p-3 rounded-xl border border-amber-500/10 shadow-inner">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.days}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Hari</span>
            </div>
            <div className="bg-[#141210] p-3 rounded-xl border border-amber-500/10 shadow-inner">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.hours}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Jam</span>
            </div>
            <div className="bg-[#141210] p-3 rounded-xl border border-amber-500/10 shadow-inner">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.minutes}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Menit</span>
            </div>
            <div className="bg-[#141210] p-3 rounded-xl border border-amber-500/10 shadow-inner">
              <span className="block text-2xl md:text-3xl font-bold text-amber-200">{timeLeft.seconds}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-wider">Detik</span>
            </div>
          </div>
        </div>

        {/* BAGIAN RANGKAIAN ACARA */}
        <div className="w-full space-y-6">
          <h3 className="text-2xl font-serif text-amber-200 font-bold">
            Rangkaian Acara
          </h3>
          
          <div className="grid gap-4">
            {/* Kotak Akad */}
            <div className="bg-[#1c1917]/60 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 text-left shadow-lg space-y-2">
              <h4 className="text-lg font-bold text-amber-400">Akad Nikah</h4>
              <p className="text-sm text-[#e7e2d8]">Rabu, 25 November 2026</p>
              <p className="text-xs text-[#a8a29e]">Pukul 08.00 WIB s.d. Selesai</p>
              <div className="pt-2">
                <p className="text-xs text-amber-200/90 bg-[#141210] p-3 rounded-lg border border-amber-500/10">
                  📍 Kediaman Mempelai Wanita, Cikampek - Jawa Barat
                </p>
              </div>
            </div>

            {/* Kotak Resepsi */}
            <div className="bg-[#1c1917]/60 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 text-left shadow-lg space-y-2">
              <h4 className="text-lg font-bold text-amber-400">Resepsi</h4>
              <p className="text-sm text-[#e7e2d8]">Rabu, 25 November 2026</p>
              <p className="text-xs text-[#a8a29e]">Pukul 11.00 WIB s.d. Selesai</p>
              <div className="pt-2">
                <p className="text-xs text-amber-200/90 bg-[#141210] p-3 rounded-lg border border-amber-500/10">
                  📍 Gedung Serbaguna Cikampek
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN AMPLOP DIGITAL */}
        <div className="w-full bg-[#1c1917]/60 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-4 text-center">
          <h3 className="text-2xl font-serif text-amber-200 font-bold">
            Amplop Digital
          </h3>
          <p className="text-xs text-[#a8a29e] leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika ingin memberikan tanda kasih, dapat melalui alamat berikut:
          </p>
          <div className="bg-[#141210] p-4 rounded-xl border border-amber-500/10 space-y-1">
            <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider">BCA</p>
            <p className="text-lg font-mono font-bold text-amber-100 tracking-wider">1234567890</p>
            <p className="text-xs text-[#a8a29e]">a.n. Fikri Dimastian</p>
          </div>
        </div>

        {/* BAGIAN FOOTER */}
        <footer className="pt-8 pb-16 text-xs text-[#a8a29e] space-y-3 border-t border-amber-500/10 w-full">
          <p className="font-serif text-amber-200 text-sm leading-relaxed px-4">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <p className="pt-2 uppercase tracking-widest">Terima Kasih</p>
          <p className="font-bold text-amber-500 tracking-widest uppercase text-sm">
            Fikri & Arsya
          </p>
        </footer>

      </div>

      {/* ========================================================= */}
      {/* TOMBOL FLOATING KONTROL MUSIK DI POJOK KANAN BAWAH        */}
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