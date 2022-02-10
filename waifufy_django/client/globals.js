export const BASE_URL =
process.env.NODE_ENV === 'development'
? `${window.location.origin}/api`
: 'http://localhost:8000/api'