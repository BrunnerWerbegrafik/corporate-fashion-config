# Corporate Fashion Konfigurator

Eigenständige Webapp für die Brunner Werbegrafik OHG. Kunden konfigurieren Textilien (Produkt → Veredelung → Position → Übersicht), legen sie in den Anfragekorb, laden optional ihr Logo hoch und senden eine Anfrage. Brunner antwortet innerhalb von 24 Stunden mit einem individuellen Angebot.

**Repo:** `corporate-fashion-config` · **Live:** [corporate-fashion-config.vercel.app](https://corporate-fashion-config.vercel.app)

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3
- React Router v6
- Cart-State via React Context + localStorage
- E-Mail-Versand: Vercel Edge Function + Resend

## Lokal starten

```bash
npm install
npm run dev
```

Öffnet auf <http://localhost:5173>. Im Dev-Mode ohne Vercel-Functions wird der Submit-Endpoint nicht erreicht – die Anfrage landet als Console-Log und der Erfolgs-Screen wird trotzdem angezeigt.

## Deployment auf Vercel

1. Repo zu GitHub pushen, in Vercel als neues Projekt importieren.
2. Framework wird automatisch als **Vite** erkannt.
3. **Environment Variables** setzen (Project Settings → Environment Variables):
   - `RESEND_API_KEY` – API-Key aus dem Resend-Dashboard.
   - `RESEND_FROM` – *optional*, Absender-Adresse, z.B. `Corporate Fashion Konfigurator <konfigurator@brunner-werbegrafik.de>`.
4. Domain nach Wunsch anpassen (Project Settings → Domains).

> **Wichtig:** Die in `RESEND_FROM` verwendete Domain (z.B. `brunner-werbegrafik.de`) muss bei Resend verifiziert sein, sonst wird der Versand abgelehnt. Solange `RESEND_API_KEY` nicht gesetzt ist, antwortet die Function mit Status 200 und einem `warning`-Feld – die Anfrage wird im Function-Log persistiert, sodass nichts verloren geht.

## Projektstruktur

```
corporate-fashion-config/
├── api/
│   └── submit-anfrage.ts        Vercel Edge Function (Resend)
├── public/
│   ├── fonts/                   Avenir + Avenir Italic
│   └── images/
│       ├── kategorien/          6 Kategoriebilder
│       ├── produkte/            9 Demo-Produktbilder (wiederverwendbar)
│       ├── veredelungen/        7 Veredelungs-Beispielbilder
│       └── logo-brunner.svg
├── src/
│   ├── components/
│   │   ├── layout/              TopNav, Footer, PageWrapper, CartBadge
│   │   ├── ui/                  Button, ProductCard, TileCard, ColorSwatch,
│   │   │                        QuantityInput, ProgressBar, Silhouette, Icon
│   │   ├── konfigurator/        ProductDetailPanel + Step1–4
│   │   ├── cart/                CartItem, CartSidebar, LogoUploader
│   │   └── forms/               AnfrageForm
│   ├── contexts/                CartContext, LogoFileContext
│   ├── data/                    Mock-Daten (TextileTypes, Products, …)
│   ├── pages/                   Eine pro Route
│   ├── services/                Daten- und Submission-Services
│   ├── types/models.ts          Single Source of Truth
│   └── utils/                   uuid, generateRequestNumber
├── tailwind.config.js
├── vercel.json
└── package.json
```

## Routen

- `/` – Startseite (HELL)
- `/textilart/:textileTypeId` – Produktübersicht (HELL) mit Slide-In-Konfigurator (DUNKEL)
- `/anfragekorb` – Cart inkl. Logo-Upload (DUNKEL)
- `/anfrage` – Kontaktformular (DUNKEL)
- `/anfrage/erfolg?nr=…` – Bestätigung mit Anfragenummer (HELL)
- `/impressum`, `/datenschutz`, `/agb` – Platzhalter-Texte (HELL)

## Phase-2-Features (vorbereitet, nicht aktiv)

- Live-Logo-Visualisierung (Logo wird aktuell nur an Brunner übergeben)
- Level-Filter (`qualityLevelId` ist im Datenmodell vorgesehen, alle Demo-Produkte sind `essential`)
- CMS-Anbindung statt Mock-Daten
- Frage-basierter Konfigurator-Modus
- Personalisierte Kunden-URLs

## Design-Prinzip: Zwei Welten

- **Hell** (weiß/schwarz, Cyan-Akzent) für Discovery: Start, Textilart, Erfolg, Legal.
- **Dunkel** (Dunkelblau, weiß, Cyan-Akzent) für Aktion: Produktdetail, Cart, Formular.

Der Wechsel signalisiert: jetzt geht's in die Tiefe – jetzt ist Konzentration gefragt.
