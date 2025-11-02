-- Seed initial content mirroring skidracek.cz

insert into public.content_blocks (slug, data) values (
  'hero',
  '{
    "tagline": "Dětský vlek pro zimní radovánky vašich ratolestí.",
    "webcamUrl": "https://ski-dracek.click2stream.com/",
    "noticeBanner": { "isVisible": true, "text": "Z důvodu nedostatku sněhu o od 28. 2. 2025 lyžařský vlek Dráček mimo provoz." }
  }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'news', '{ "items": [] }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'hours', '{ "text": "Lyžařský vlek je v provozu o víkendech od 9:00 do 17:00." }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'params',
  '{
    "subtitle": "Sjezdovka je ideální pro malé děti, začínající lyžaře a snowboardisty.",
    "items": [
      { "header": "Délka vleku", "value": "154", "unit": "metrů" },
      { "header": "Převýšení", "value": "21", "unit": "metrů" },
      { "header": "Nadmořská výška", "value": "550", "unit": "m. n. m." },
      { "header": "Obtížnost", "value": "modrá", "unit": "dětská" },
      { "header": "Kapacita", "value": "350", "unit": "osob/hod." }
    ]
  }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'school',
  '{
    "description": "Novinkou pro rodiny s dětmi je školička lyžování vedená zkušeným instruktorem a držitelem licence \"Instruktor základního lyžování\".",
    "pricing": { "individual": "500 Kč/osoba/50min", "group": "300 Kč/osoba/hodina" },
    "instructor": { "name": "Marek Matouš", "phone": "721 638 175", "email": "skola@skidracek.cz" }
  }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'pricing',
  '{
    "rows": [
      { "duration": "1 hodina", "adults": "130 Kč", "kids": "100 Kč" },
      { "duration": "2 hodiny", "adults": "180 Kč", "kids": "140 Kč" },
      { "duration": "3 hodiny", "adults": "230 Kč", "kids": "190 Kč" }
    ]
  }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'directions',
  '{
    "car": "U Dráčka jsou k dispozici dvě malá parkoviště pro 12 automobilů. Parkování pro lyžaře je zdarma.",
    "gps": "50.674512, 15.235718",
    "mapyCzUrl": "http://www.mapy.cz/zakladni?planovani-trasy&x=15.2051588&y=50.7017564&z=12&rc=9iHptx1d4C9iRc2x1ODX&rl=obec%20Jablonec%20nad%20Nisou%2C%20okres%20Jablonec%20nad%20Nisou%2C%20kraj%20Libereck%C3%BD&rl=Ly%C5%BEa%C5%99sk%C3%BD%20vlek%20Dr%C3%A1%C4%8Dek%2C%20P%C4%9Bn%C4%8D%C3%ADn%20468%2021%20%20P%C4%9Bn%C4%8D%C3%ADn%2C%20Al%C5%A1ovice&rp=%7B%22criterion%22%3A%22fast%22%7D&ri=0",
    "buses": [
      { "label": "Jízdní řády z Jablonce n. N.", "url": "http://jizdnirady.idnes.cz/autobusy/spojeni/?f=Jablonec+nad+Nisou&t=Al%C5%A1ovice%2fP%C4%9Bn%C4%8D%C3%ADn+%5bJN%5d&fc=1&tc=2&submit=true" },
      { "label": "Jízdní řády z Žel. Brodu", "url": "http://jizdnirady.idnes.cz/autobusy/spojeni/?f=%C5%BDelezn%C3%BD+Brod&t=Al%C5%A1ovice%2fP%C4%9Bn%C4%8D%C3%ADn+%5bJN%5d&fc=1&tc=2&submit=true" }
    ]
  }'
) on conflict (slug) do update set data = excluded.data;

insert into public.content_blocks (slug, data) values (
  'contacts',
  '{
    "manager": { "name": "Karel Daníček", "phone": "603 584 505", "email": "info@skidracek.cz" },
    "operator": {
      "name": "TJ Sokol Alšovice",
      "address": "Alšovice 109\n468 21 Bratříkov",
      "ico": "70947392",
      "web": "http://www.dosokola.cz"
    },
    "wufooUrl": "https://dracek.wufoo.com/forms/zbz2mit0em65ev/"
  }'
) on conflict (slug) do update set data = excluded.data;


