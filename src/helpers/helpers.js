export const formatDate = (d) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${ye}-${mo}-${da}`;
}

export const formatCurrency = (c=0) => {
    return new Intl.NumberFormat('en-EN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(+c);
}