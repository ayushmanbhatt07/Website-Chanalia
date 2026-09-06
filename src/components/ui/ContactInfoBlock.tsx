import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { site } from '@/content/site';

export function ContactInfoBlock() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 shrink-0 text-[var(--color-rio-blue)] mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--color-rio-ink)] mb-0.5">Address</p>
          <a
            href={site.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors leading-relaxed"
          >
            {site.contact.address}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Phone className="w-5 h-5 shrink-0 text-[var(--color-rio-blue)] mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--color-rio-ink)] mb-0.5">Phone</p>
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
            className="text-sm text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors"
          >
            {site.contact.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MessageCircle className="w-5 h-5 shrink-0 text-[#25D366] mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--color-rio-ink)] mb-0.5">WhatsApp</p>
          <a
            href={site.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors"
          >
            {site.contact.whatsapp}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Mail className="w-5 h-5 shrink-0 text-[var(--color-rio-blue)] mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--color-rio-ink)] mb-0.5">Email</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-sm text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors"
          >
            {site.contact.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 shrink-0 text-[var(--color-rio-blue)] mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--color-rio-ink)] mb-0.5">Business Hours</p>
          <p className="text-sm text-[var(--color-rio-slate)]">{site.contact.hours}</p>
        </div>
      </div>
    </div>
  );
}
