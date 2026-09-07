import { Star, ExternalLink } from 'lucide-react';
import { testimonials } from '@/content/testimonials';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

export function TestimonialSection() {
  const { aggregate, reviews } = testimonials;

  return (
    <div>
      <Eyebrow>Testimonial</Eyebrow>
      <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-text-heading)] mb-2">
        Reviews From Customers
      </h2>

      {/* Aggregate */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              fill={i < Math.round(aggregate.rating) ? '#FBBF24' : 'none'}
              stroke={i < Math.round(aggregate.rating) ? '#FBBF24' : 'var(--color-border)'}
            />
          ))}
        </div>
        <span className="text-sm text-[var(--color-text-body)] font-medium">
          {aggregate.rating} out of 5
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">·</span>
        <a
          href={aggregate.googleListingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--color-accent-primary)] hover:underline inline-flex items-center gap-1"
        >
          {aggregate.totalReviews} Google reviews
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((review, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-inner)]">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    className="w-3.5 h-3.5"
                    fill={si < review.rating ? '#FBBF24' : 'none'}
                    stroke={si < review.rating ? '#FBBF24' : 'var(--color-border)'}
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-body)] mb-3 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-heading)]">
                  {review.name}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{review.age}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
