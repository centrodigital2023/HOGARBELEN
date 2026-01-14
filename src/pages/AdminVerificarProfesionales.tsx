import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminVerificarProfesionalesProps {
  setPage: (page: string) => void;
}

export default function AdminVerificarProfesionales({ setPage }: AdminVerificarProfesionalesProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Verificación de Profesionales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta página ha sido reemplazada. Use la versión en /páginas/AdminProfessionals.tsx
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
