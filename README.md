# Venergi Website

Marketing website for Venergi, built with React + Vite + Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Contact form configuration

The contact form submits through an HTTP endpoint.

- `VITE_CONTACT_ENDPOINT`: optional explicit endpoint URL.
- `VITE_CONTACT_EMAIL`: optional fallback email used for FormSubmit endpoint generation.

If `VITE_CONTACT_ENDPOINT` is not set, the app submits to:

```text
https://formsubmit.co/ajax/<VITE_CONTACT_EMAIL>
```

Default fallback email: `hello@venergi.com.ng`
