-- Add CTA to hero content

insert into public.content_blocks (slug, data) values (
  'hero',
  '{
    "tagline": "Dětský vlek pro zimní radovánky vašich ratolestí.",
    "webcamUrl": "https://ski-dracek.click2stream.com/",
    "noticeBanner": { "isVisible": true, "text": "Z důvodu nedostatku sněhu o od 28. 2. 2025 lyžařský vlek Dráček mimo provoz." },
    "cta": { "label": "Kontaktujte nás", "url": "https://dracek.wufoo.com/forms/zbz2mit0em65ev/" }
  }'
) on conflict (slug) do update set data = excluded.data;


