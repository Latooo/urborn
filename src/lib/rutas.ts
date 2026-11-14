// El sitio puede vivir en la raíz (Netlify) o en /urborn/ (GitHub Pages).
// Todas las rutas internas se arman con esta función para que funcionen en los dos.
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function ruta(destino = ''): string {
  return base + destino.replace(/^\//, '');
}
