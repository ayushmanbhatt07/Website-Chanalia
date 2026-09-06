import { Check } from 'lucide-react';

type FeatureListProps = {
  features: string[];
  accent?: string;
};

export function FeatureList({ features, accent }: FeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
      {features.map((feature, i) => (
        <div
          key={i}
          className="flex items-start gap-3 py-2 border-b border-[var(--color-rio-line)] last:border-b-0"
        >
          <Check
            className="w-4 h-4 shrink-0 mt-0.5"
            style={{ color: accent || 'var(--color-rio-blue)' }}
          />
          <span className="text-sm text-[var(--color-rio-slate)] leading-relaxed">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}
