'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, Calendar, MapPin, Music, VolumeX, Volume2, 
  Copy, Check, Gift, Sparkles, Clock, Send 
} from 'lucide-react'
import RsvpForm from '@/components/RsvpForm'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [guestName, setGuestName] = useState('Tamu Undangan')

  // Tangkap query param nama tamu (?to=Nama)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to')
    if (to) setGuestName(to)

    // Audio background
    const bgMusic = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-413.mp3')
    bgMusic.loop = true
    setAudio(bgMusic)

    return () => {
      bgMusic.pause()
    }
  }, [])

  const handleOpenInvitation = () => {
    setIsOpen(true)
    if (audio) {
      audio.play().catch(() => console.log('Autoplay blocked'))
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedBank(type)
    setTimeout(() => setCopiedBank(null), 2000)
  }

  // Countdown Timer Target
  const targetDate = new Date('2026-11-24T09:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <main className="min-h-screen bg-stone-900 text-stone-100 font-sans relative overflow-hidden select-none">
      {/* BACKGROUND DEKORATIVE GRADIENT */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-stone-900 to-black pointer-events-none" />

      {/* COVER OVERLAY ELEGANT */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center text-center"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="relative z-10 pt-12 space-y-3">
              <span className="text-amber-300 tracking-[0.3em] uppercase text-xs font-semibold">The Wedding Of</span>
              <h1 className="text-4xl md:text-6xl font-serif text-amber-100 font-bold tracking-wide">
                Fikri Dimastian & Arsya Insyirah R
              </h1>
            </div>

            <div className="relative z-10 space-y-4 max-w-sm w-full bg-black/40 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-md">
              <p className="text-xs text-stone-300">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <h2 className="text-xl font-bold text-amber-200 capitalize">{guestName}</h2>
              <button
                onClick={handleOpenInvitation}
                className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4" /> Buka Undangan
              </button>
            </div>

            <p className="relative z-10 text-[10px] text-stone-400 tracking-widest uppercase">
              Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ISI UNDANGAN */}
      {isOpen && (
        <div className="max-w-md mx-auto px-4 py-12 space-y-16 relative z-10">
          
          {/* MUSIC CONTROLLER FLOATING */}
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-40 p-3 bg-amber-600/80 backdrop-blur-md text-stone-950 rounded-full shadow-2xl border border-amber-300/40 hover:scale-110 transition active:scale-95"
          >
            {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* HEADER MEMPELAI */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 pt-6"
          >
            <span className="text-amber-400 tracking-[0.2em] text-xs uppercase">Walimatul &apos;Ursy</span>
            <h1 className="text-4xl font-serif text-amber-200 font-bold">Fikri Dimastian & Arsya Insyirah R</h1>
            <p className="text-xs text-stone-400 italic max-w-xs mx-auto leading-relaxed">
              &quot;Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.&quot;
            </p>
          </motion.section>

          {/* COUNTDOWN TIMER */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 bg-gradient-to-b from-stone-800/80 to-stone-900/90 rounded-3xl border border-amber-500/20 text-center space-y-4 backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4" /> Menuju Hari Bahagia
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
                  <span className="text-2xl font-bold font-serif text-amber-300">{item.val}</span>
                  <p className="text-[10px] text-stone-400 uppercase mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ACARA & LOKASI */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-serif text-amber-200 font-bold">Rangkaian Acara</h3>
              <p className="text-xs text-stone-400">Selasa, 24 November 2026</p>
            </div>

            <div className="grid gap-4">
              {/* AKAD */}
              <div className="p-5 bg-stone-800/40 rounded-2xl border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Calendar className="w-4 h-4" /> Akad Nikah
                </div>
                <p className="text-xs text-stone-300">Pukul: 08.00 WIB - Selesai</p>
                <p className="text-xs text-stone-400">Lokasi: KUA, Karawang Timur</p>
              </div>

              {/* RESEPSI */}
              <div className="p-5 bg-stone-800/40 rounded-2xl border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <MapPin className="w-4 h-4" /> Syukuran
                </div>
                <p className="text-xs text-stone-300">Pukul: 10.00 - Selesai WIB</p>
                <p className="text-xs text-stone-400">Lokasi: Kondangjaya, Karawang Timur</p>
                <a 
                  href="https://www.google.com/maps/place/WARUNG+POJOK+BAROKAH/@-6.3378403,107.3381714,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6976f681b69791:0x366d5bcc79ec18ce!8m2!3d-6.3378456!4d107.3407463!16s%2Fg%2F11s8kl29mq?entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline font-semibold mt-2"
                >
                  <MapPin className="w-3.5 h-3.5" /> Buka Petunjuk Google Maps &rarr;
                </a>
              </div>
            </div>
          </motion.section>

          {/* INTEGRASI SUPABASE RSVP FORM & GUESTBOOK */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <RsvpForm />
          </motion.section>

          {/* AMPLOP DIGITAL / HADIAH */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-stone-800/50 rounded-3xl border border-amber-500/20 text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-amber-300 font-serif font-bold text-lg">
              <Gift className="w-5 h-5 text-amber-400" /> Amplop Digital
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat mengirimkannya melalui:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-stone-900/80 rounded-2xl border border-stone-700 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-stone-200 block">SeaBank</span>
                  <span className="text-sm font-mono text-amber-300 font-bold">1234 5678 90</span>
                  <span className="text-[10px] text-stone-400 block">a.n Arsya Insyirah R</span>
                </div>
                <button
                  onClick={() => copyToClipboard('1234567890', 'seabank-1')}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-600 text-stone-200 transition"
                >
                  {copiedBank === 'seabank-1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 bg-stone-900/80 rounded-2xl border border-stone-700 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-stone-200 block">SeaBank</span>
                  <span className="text-sm font-mono text-amber-300 font-bold">0987 6543 21</span>
                  <span className="text-[10px] text-stone-400 block">a.n Fikri Dimastian</span>
                </div>
                <button
                  onClick={() => copyToClipboard('0987654321', 'seabank-2')}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-600 text-stone-200 transition"
                >
                  {copiedBank === 'seabank-2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.section>

          {/* FOOTER */}
          <footer className="text-center pt-8 border-t border-stone-800 space-y-2">
            <p className="text-xs text-stone-500 font-serif">Terima Kasih Atas Doa & Restu Anda</p>
            <p className="text-[10px] text-amber-500/60 uppercase tracking-widest">Fikri Dimastian & Arsya Insyirah R</p>
          </footer>

        </div>
      )}
    </main>
  )
}