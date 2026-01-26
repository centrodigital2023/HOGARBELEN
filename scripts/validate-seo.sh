#!/bin/bash

# SEO Validation Script for Hogar Belén
# Validates sitemap, robots.txt, and routing structure

echo "🔍 SEO Validation Script"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Function to print success
success() {
  echo -e "${GREEN}✓${NC} $1"
  ((PASSED++))
}

# Function to print error
error() {
  echo -e "${RED}✗${NC} $1"
  ((FAILED++))
}

# Function to print warning
warning() {
  echo -e "${YELLOW}⚠${NC} $1"
  ((WARNINGS++))
}

echo "1. Checking sitemap.xml..."
echo "----------------------------"

if [ -f "public/sitemap.xml" ]; then
  success "Sitemap exists at public/sitemap.xml"
  
  # Count URLs
  URL_COUNT=$(grep -c "<loc>" public/sitemap.xml)
  echo "   Found $URL_COUNT URLs in sitemap"
  
  if [ $URL_COUNT -gt 50 ]; then
    success "Sitemap has sufficient URLs ($URL_COUNT > 50)"
  else
    warning "Sitemap has fewer URLs than expected ($URL_COUNT)"
  fi
  
  # Check for admin URLs (shouldn't be there) - only in <loc> tags
  ADMIN_COUNT=$(grep -c '<loc>[^<]*\/admin[^<]*<\/loc>' public/sitemap.xml || true)
  if [ $ADMIN_COUNT -eq 0 ]; then
    success "No admin URLs found in sitemap (correct)"
  else
    error "Found $ADMIN_COUNT admin URLs in sitemap (should be 0)"
  fi
  
  # Check domain
  if grep -q "hogarbelen.com" public/sitemap.xml; then
    success "Using correct domain (hogarbelen.com)"
  else
    error "Domain not found or incorrect in sitemap"
  fi
  
else
  error "Sitemap not found at public/sitemap.xml"
fi

echo ""
echo "2. Checking robots.txt..."
echo "----------------------------"

if [ -f "public/robots.txt" ]; then
  success "Robots.txt exists at public/robots.txt"
  
  # Check if admin is disallowed
  if grep -q "Disallow: /admin" public/robots.txt; then
    success "Admin routes are blocked"
  else
    error "Admin routes not blocked in robots.txt"
  fi
  
  # Check sitemap reference
  if grep -q "Sitemap:" public/robots.txt; then
    success "Sitemap reference found"
  else
    warning "No sitemap reference in robots.txt"
  fi
  
else
  error "Robots.txt not found at public/robots.txt"
fi

echo ""
echo "3. Checking route structure..."
echo "----------------------------"

if [ -f "src/src/App.tsx" ]; then
  success "App.tsx found"
  
  # Count routes
  ROUTE_COUNT=$(grep -c "<Route path=" src/src/App.tsx || true)
  echo "   Found $ROUTE_COUNT routes in App.tsx"
  
  if [ $ROUTE_COUNT -gt 80 ]; then
    success "Sufficient routes defined ($ROUTE_COUNT > 80)"
  else
    warning "Fewer routes than expected ($ROUTE_COUNT)"
  fi
  
  # Check for dynamic routes
  if grep -q "path=\"/profesional/:slug\"" src/src/App.tsx; then
    success "Dynamic professional route found"
  else
    warning "Dynamic professional route not found"
  fi
  
else
  error "App.tsx not found at src/src/App.tsx"
fi

echo ""
echo "4. Checking page components..."
echo "----------------------------"

PAGE_DIR="src/páginas"
if [ -d "$PAGE_DIR" ]; then
  PAGE_COUNT=$(ls -1 "$PAGE_DIR"/*.tsx 2>/dev/null | wc -l)
  echo "   Found $PAGE_COUNT page components"
  
  if [ $PAGE_COUNT -gt 40 ]; then
    success "Sufficient page components ($PAGE_COUNT > 40)"
  else
    warning "Fewer page components than expected ($PAGE_COUNT)"
  fi
else
  error "Page directory not found at $PAGE_DIR"
fi

echo ""
echo "5. Checking SEO utilities..."
echo "----------------------------"

if [ -f "src/lib/seo-utils.tsx" ]; then
  success "SEO utilities found"
else
  error "SEO utilities not found at src/lib/seo-utils.tsx"
fi

if [ -f "src/lib/slug-utils.ts" ]; then
  success "Slug utilities found"
else
  error "Slug utilities not found at src/lib/slug-utils.ts"
fi

if [ -f "src/lib/schema-utils.tsx" ]; then
  success "Schema.org utilities found"
else
  error "Schema.org utilities not found at src/lib/schema-utils.tsx"
fi

echo ""
echo "6. Checking documentation..."
echo "----------------------------"

if [ -f "SEO-ROUTING-GUIDE.md" ]; then
  success "SEO routing guide found"
else
  warning "SEO routing guide not found"
fi

if [ -f "IMAGE-OPTIMIZATION-GUIDE.md" ]; then
  success "Image optimization guide found"
else
  warning "Image optimization guide not found"
fi

echo ""
echo "================================"
echo "Summary"
echo "================================"
echo -e "${GREEN}Passed:${NC}   $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC}   $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All critical checks passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ Some checks failed. Please review.${NC}"
  exit 1
fi
