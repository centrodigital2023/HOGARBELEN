#!/bin/bash
# Unificación Completa de Ramas - HOGARBELEN
# Rama Destino: proteger-hogar-belen
# Fecha: 2026-09-25
# Usuario: centrodigital2023

set -e

echo "=========================================="
echo "INICIANDO UNIFICACIÓN DE RAMAS"
echo "=========================================="
echo ""
echo "Repositorio: centrodigital2023/HOGARBELEN"
echo "Rama Destino: proteger-hogar-belen"
echo "Total de Merges: 14"
echo ""
echo "=========================================="

# Preparar rama base
echo ""
echo "[PASO 1/3] Preparando rama base..."
git checkout proteger-hogar-belen
git pull origin proteger-hogar-belen
echo "✓ Rama base lista"

# Ejecutar merges
echo ""
echo "[PASO 2/3] Fusionando ramas..."
echo ""

echo "  [1/14] copilot/create-terms-and-conditions-page"
git merge --no-ff copilot/create-terms-and-conditions-page -m "Merge: Terms and conditions page"

echo "  [2/14] copilot/fix-errors"
git merge --no-ff copilot/fix-errors -m "Merge: Fix errors"

echo "  [3/14] copilot/fix-whatsapp-link"
git merge --no-ff copilot/fix-whatsapp-link -m "Merge: Fix WhatsApp link"

echo "  [4/14] copilot/optimize-seo-keywords-narino"
git merge --no-ff copilot/optimize-seo-keywords-narino -m "Merge: Optimize SEO keywords"

echo "  [5/14] copilot/optimize-web-domain-structure"
git merge --no-ff copilot/optimize-web-domain-structure -m "Merge: Optimize web domain structure"

echo "  [6/14] copilot/optimize-web-performance-2025"
git merge --no-ff copilot/optimize-web-performance-2025 -m "Merge: Optimize web performance 2025"

echo "  [7/14] copilot/deploy-to-hogarbelen-org"
git merge --no-ff copilot/deploy-to-hogarbelen-org -m "Merge: Deploy to hogarbelen org"

echo "  [8/14] copilot/deploy-to-vercel"
git merge --no-ff copilot/deploy-to-vercel -m "Merge: Deploy to Vercel"

echo "  [9/14] copilot/deploy-to-vercel-again"
git merge --no-ff copilot/deploy-to-vercel-again -m "Merge: Deploy to Vercel again"

echo "  [10/14] dependabot/npm_and_yarn/framer-motion-12.38.0"
git merge --no-ff dependabot/npm_and_yarn/framer-motion-12.38.0 -m "Merge: Update framer-motion"

echo "  [11/14] dependabot/npm_and_yarn/lucide-react-1.0.1"
git merge --no-ff dependabot/npm_and_yarn/lucide-react-1.0.1 -m "Merge: Update lucide-react"

echo "  [12/14] dependabot/npm_and_yarn/react-dom-19.2.4"
git merge --no-ff dependabot/npm_and_yarn/react-dom-19.2.4 -m "Merge: Update react-dom"

echo "  [13/14] dependabot/npm_and_yarn/react-error-boundary-6.1.1"
git merge --no-ff dependabot/npm_and_yarn/react-error-boundary-6.1.1 -m "Merge: Update react-error-boundary"

echo "  [14/14] dependabot/npm_and_yarn/supabase/supabase-js-2.100.0"
git merge --no-ff dependabot/npm_and_yarn/supabase/supabase-js-2.100.0 -m "Merge: Update supabase-js"

echo ""
echo "✓ Todos los merges completados"

# Push
echo ""
echo "[PASO 3/3] Publicando cambios..."
git push origin proteger-hogar-belen
echo "✓ Push completado"

echo ""
echo "=========================================="
echo "✅ UNIFICACIÓN COMPLETADA CON ÉXITO"
echo "=========================================="
echo ""
echo "Rama unificada: proteger-hogar-belen"
echo "Total de merges: 14 ✓"
echo ""
echo "Próximos pasos opcionales:"
echo "  1. Eliminar ramas antiguas localmente"
echo "  2. Eliminar ramas antiguas en remoto"
echo "  3. Verificar cambios en GitHub"
echo ""
