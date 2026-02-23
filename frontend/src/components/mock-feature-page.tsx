import { Card, CardContent } from "@/src/components/ui";

type MockFeaturePageProps = {
  title: string;
  description?: string;
  hideHeader?: boolean;
};

export function MockFeaturePage({ title, description, hideHeader = false }: MockFeaturePageProps) {
  return (
    <div className="space-y-6">
      {hideHeader ? null : (
        <header className="space-y-1">
          <h1 className="text-4xl font-bold text-(--primecore-foreground)">{title}</h1>
          {description && <p className="text-sm text-(--primecore-foreground)/65">{description}</p>}
        </header>
      )}

      <Card className="min-h-[400px] flex items-center justify-center border-dashed">
        <CardContent className="text-center space-y-2">
          <p className="text-xl font-medium text-(--primecore-foreground)/40">Content for {title}</p>
          <p className="text-sm text-(--primecore-foreground)/30">This feature is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
}
