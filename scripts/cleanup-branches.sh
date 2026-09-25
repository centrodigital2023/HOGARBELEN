#!/bin/bash

# Script de Limpieza de Ramas
# Elimina todas las ramas antiguas tras la unificación
# Repositorio: centrodigital2023/HOGARBELEN

set -e

echo "=========================================="
echo "Limpieza de Ramas Antiguas"
echo "=========================================="
echo ""

declare -a old_branches=(
    "copilot/create-terms-and-conditions-page"
    "copilot/fix-errors"
    "copilot/fix-whatsapp-link"
    "copilot/optimize-seo-keywords-narino"
    "copilot/optimize-web-domain-structure"
    "copilot/optimize-web-performance-2025"
    "copilot/deploy-to-hogarbelen-org"
    "copilot/deploy-to-vercel"
    "copilot/deploy-to-vercel-again"
    "dependabot/npm_and_yarn/framer-motion-12.38.0"
    "dependabot/npm_and_yarn/lucide-react-1.0.1"
    "dependabot/npm_and_yarn/react-dom-19.2.4"
    "dependabot/npm_and_yarn/react-error-boundary-6.1.1"
    "dependabot/npm_and_yarn/supabase/supabase-js-2.100.0"
)

echo "Eliminando ramas locales..."
for branch in "${old_branches[@]}"; do
    echo "  Eliminando: $branch"
    git branch -d "$branch" 2>/dev/null || echo "    (rama no encontrada localmente)"
done
echo "✓ Ramas locales eliminadas"
echo ""

echo "Eliminando ramas remotas..."
for branch in "${old_branches[@]}"; do
    echo "  Eliminando: origin/$branch"
    git push origin --delete "$branch" 2>/dev/null || echo "    (rama remota no encontrada)"
done
echo "✓ Ramas remotas eliminadas"
echo ""

# Limpiar referencias locales
echo "Limpiando referencias locales..."
git remote prune origin
echo "✓ Referencias limpias"
echo ""

echo "=========================================="
echo "✅ LIMPIEZA COMPLETADA"
echo "=========================================="
echo ""
echo "Rama única oficial: proteger-hogar-belen"
echo ""
