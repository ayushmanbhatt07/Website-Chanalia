'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  city: z.string().optional(),
  productInterest: z.string().optional(),
  requirement: z.string().optional(),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

type EnquiryFormProps = {
  productName?: string;
  className?: string;
};

const inputClasses = cn(
  'w-full px-4 py-3 text-sm rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]',
  'text-[var(--color-rio-ink)] placeholder:text-[var(--color-rio-mute)]',
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-rio-blue)] focus:border-transparent',
  'transition-colors'
);

export function EnquiryForm({ productName, className }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productInterest: productName || '',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    // TODO: Wire to form backend (email service, Google Sheets, etc.)
    console.log('Enquiry submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn('p-8 rounded-lg bg-[var(--color-rio-blue-tint)] text-center', className)}>
        <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-2">
          Thank you for your enquiry
        </h3>
        <p className="text-sm text-[var(--color-rio-slate)]">
          Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('name')}
            placeholder="Your Name *"
            className={inputClasses}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('company')}
            placeholder="Company Name"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('phone')}
            placeholder="Phone Number *"
            type="tel"
            className={inputClasses}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            placeholder="Email Address *"
            type="email"
            className={inputClasses}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          {...register('city')}
          placeholder="City"
          className={inputClasses}
        />
        <select
          {...register('productInterest')}
          className={inputClasses}
        >
          <option value="">Select Product Interest</option>
          <option value="CPVC">CPVC Plumbing System</option>
          <option value="UPVC">UPVC Plumbing System</option>
          <option value="SWR">SWR Plumbing System</option>
          <option value="Agriculture">Agriculture Plumbing System</option>
        </select>
      </div>

      <input
        {...register('requirement')}
        placeholder="Quantity / Requirement"
        className={inputClasses}
      />

      <textarea
        {...register('message')}
        placeholder="Your Message"
        rows={4}
        className={cn(inputClasses, 'resize-none')}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Send Enquiry'}
      </Button>
    </form>
  );
}
