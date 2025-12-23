// Helper to get DISC theme colors
export const getDiscTheme = (disc: string) => {
    const d = (disc || '').toUpperCase();
    if (d.includes('D')) return { color: 'text-red-500', border: 'border-red-500/20', bg: 'bg-red-500/10', ring: 'ring-red-500/20', fill: 'bg-red-500', hex: '#ef4444' };
    if (d.includes('I')) return { color: 'text-yellow-500', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10', ring: 'ring-yellow-500/20', fill: 'bg-yellow-500', hex: '#eab308' };
    if (d.includes('S')) return { color: 'text-emerald-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/20', fill: 'bg-emerald-500', hex: '#10b981' };
    if (d.includes('C')) return { color: 'text-blue-500', border: 'border-blue-500/20', bg: 'bg-blue-500/10', ring: 'ring-blue-500/20', fill: 'bg-blue-500', hex: '#3b82f6' };

    // Default Gold
    return { color: 'text-brand-gold', border: 'border-brand-gold/20', bg: 'bg-brand-gold/10', ring: 'ring-brand-gold/20', fill: 'bg-brand-gold', hex: '#D4AF37' };
};

// Helper to get color for Big Five Traits
export const getBigFiveColor = (trait: string) => {
    switch (trait.toLowerCase()) {
        case 'openness':
        case 'abertura': return 'bg-purple-500';
        case 'conscientiousness':
        case 'conscienciosidade': return 'bg-blue-500';
        case 'extraversion':
        case 'extroversão': return 'bg-yellow-500';
        case 'agreeableness':
        case 'agradabilidade': return 'bg-green-500';
        case 'neuroticism':
        case 'neuroticismo': return 'bg-red-500';
        default: return 'bg-zinc-500';
    }
}
