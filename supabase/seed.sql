insert into public.services (slug, title, summary, sort_order, published) values
  ('strategy-advisory', 'Strategy & Advisory', 'Strategic guidance for ophthalmic biotech programs.', 1, true),
  ('product-development', 'Product Development', 'End-to-end product development support.', 2, true),
  ('regulatory-clinical', 'Regulatory & Clinical', 'Regulatory and clinical development expertise.', 3, true),
  ('market-access', 'Market Access', 'Market access strategy and execution.', 4, true),
  ('commercialization', 'Commercialization', 'Launch and commercialization planning.', 5, true)
on conflict (slug) do nothing;

insert into public.categories (slug, name) values
  ('industry-trends', 'Industry Trends'),
  ('regulatory', 'Regulatory'),
  ('commercialization', 'Commercialization')
on conflict (slug) do nothing;

insert into public.posts (slug, title, excerpt, content, status, published_at, read_time_min) values
  (
    'emerging-therapies-ophthalmology',
    'Emerging Therapies Shaping the Future of Ophthalmology',
    'How gene therapy, sustained delivery, and real-world evidence are redefining development priorities.',
    E'Ophthalmic biotech continues to attract significant investment as gene therapy, sustained delivery platforms, and targeted biologics mature.\n\nReal-world evidence and patient-reported outcomes are playing a larger role in regulatory and access discussions.\n\nBEEÑA-E advises teams to align development, HEOR, and commercial narratives from Phase 2 onward.',
    'published',
    '2026-03-12',
    6
  ),
  (
    'regulatory-pathways-ophthalmology',
    'Navigating Global Regulatory Pathways in Ophthalmology',
    'A practical lens on FDA, EMA, and emerging market requirements for novel ophthalmic products.',
    E'Global ophthalmic development requires navigating distinct FDA, EMA, and regional expectations.\n\nEarly agency engagement remains one of the highest-leverage activities for novel mechanisms.\n\nStructured gap analysis against ophthalmic precedents helps teams prioritize investments.',
    'published',
    '2026-02-28',
    8
  ),
  (
    'biomarkers-ophthalmic-drug-development',
    'Biomarkers in Ophthalmic Drug Development',
    'How translational biomarkers accelerate decision-making from early clinical proof-of-concept through pivotal trials.',
    E'Biomarkers are increasingly central to ophthalmic trials.\n\nImaging and fluid biomarkers can de-risk programs when applied early.\n\nBEEÑA-E supports sponsors in biomarker strategy aligned to regulatory expectations.',
    'published',
    '2026-02-10',
    5
  )
on conflict (slug) do nothing;
