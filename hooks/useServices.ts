'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string | null;
  slug: string;
  fullDescription: string | null;
  servicesProvided: string | null;
  targetInsects: string | null;
  methodsTitle: string | null;
  methodsDescription: string | null;
  advancedTechnologies: string | null;
  safeUseDescription: string | null;
  serviceGuarantee: string | null;
  isActive: boolean;
  order: number;
}

export function useServices() {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/services?lang=${language}`);
        const data = await response.json();

        if (data.success) {
          // Filter only active services for public view
          setServices(data.services.filter((s: Service) => s.isActive));
        } else {
          setError(data.message || 'Failed to fetch services');
        }
      } catch (err) {
        setError('Failed to fetch services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [language]);

  return { services, loading, error };
}

export function useService(slugOrId: string) {
  const { language } = useLanguage();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/services/${slugOrId}?lang=${language}`);
        const data = await response.json();

        if (data.success) {
          setService(data.service);
        } else {
          setError(data.message || 'Failed to fetch service');
        }
      } catch (err) {
        setError('Failed to fetch service');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slugOrId) {
      fetchService();
    }
  }, [slugOrId, language]);

  return { service, loading, error };
}
