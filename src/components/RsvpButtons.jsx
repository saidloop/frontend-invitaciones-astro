import { useState } from 'react';

export default function RsvpButtons({ guestId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleResponse = async (newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api-invitaciones-django.onrender.com/api/invitacion/${guestId}/responder/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_asistencia: newStatus })
      });

      if (response.ok) {
        setStatus(newStatus);
        alert(newStatus === 'confirmado' ? "¡Genial! Te esperamos." : "Gracias por avisarnos.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. ESTADO: YA RESPONDIÓ (Botón de cambio eliminado para bloquear el estado)
  if (status !== 'pendiente') {
    return (
      <div className="relative text-center p-6 rounded-[2rem] w-full max-w-md overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 pointer-events-none"></div>
        
        <p className="relative z-10 text-sm md:text-base text-slate-100 font-medium leading-relaxed">
          {status === 'confirmado' 
            ? '¡Genial! Has confirmado tu asistencia. Nos vemos pronto.' 
            : 'Entendemos. Gracias por avisarnos.'}
        </p>
        {/* El botón de "Cambiar respuesta" fue eliminado de aquí */}
      </div>
    );
  }

  // 2. ESTADO: PENDIENTE
  return (
    <div className="flex flex-row gap-4 w-full max-w-md justify-center px-2">
      
      <button
        disabled={loading}
        onClick={() => handleResponse('confirmado')}
        className="group relative flex-1 flex items-center justify-center text-xs md:text-sm text-white font-semibold uppercase px-3 py-3.5 rounded-2xl tracking-wider transition-all duration-300 disabled:opacity-50 text-center leading-tight overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:border-[var(--color-gold)]/60 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
        <span className="relative z-10 drop-shadow-md">{loading ? 'Enviando...' : 'Sí, asistiré'}</span>
      </button>

      <button
        disabled={loading}
        onClick={() => handleResponse('rechazado')}
        className="group relative flex-1 flex items-center justify-center text-xs md:text-sm text-slate-200 font-semibold uppercase px-3 py-3.5 rounded-2xl tracking-wider transition-all duration-300 disabled:opacity-50 text-center leading-tight overflow-hidden bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-white/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none"></div>
        <span className="relative z-10 drop-shadow-md">No podré</span>
      </button>

    </div>
  );
}