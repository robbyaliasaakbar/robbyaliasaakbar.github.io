import { useEffect } from 'react'

const SITE = 'https://robbyaliasaakbar.github.io'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(obj) {
  let el = document.head.querySelector('script[type="application/ld+json"][data-seo]')
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute('data-seo', 'true')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(obj)
}

/**
 * Seo — update meta tags SPA supaya tiap halaman punya
 * title, description, OG, canonical, JSON-LD sendiri.
 *
 * Dipakai: <Seo title="..." description="..." image="/images/..." path="/exp001.html" type="article" />
 */
export default function Seo({
  title,
  description,
  image = '/images/Profile.webp',
  path = '/',
  type = 'website',
  jsonLd,
}) {
  const fullTitle = `${title} — Robby Aliasa Akbar`
  const url = `${SITE}${path}`
  const absImage = image.startsWith('http') ? image : `${SITE}${image}`

  useEffect(() => {
    // title
    document.title = fullTitle

    // basic meta
    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index, follow, max-image-preview:large')

    // Open Graph
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', 'Robby Aliasa Akbar')
    setMeta('property', 'og:locale', 'en_US')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', absImage)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', title)
    setMeta('property', 'og:image:type', 'image/webp')

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', absImage)
    setMeta('name', 'twitter:image:alt', title)

    // Canonical + hreflang
    setLink('canonical', url)
    setLink('alternate', url) // will be overwritten below for hreflang
    // fix hreflang links properly
    let altEn = document.head.querySelector('link[hreflang="en"]')
    if (!altEn) {
      altEn = document.createElement('link')
      altEn.setAttribute('hreflang', 'en')
      document.head.appendChild(altEn)
    }
    altEn.setAttribute('href', url)
    let altXd = document.head.querySelector('link[hreflang="x-default"]')
    if (!altXd) {
      altXd = document.createElement('link')
      altXd.setAttribute('hreflang', 'x-default')
      document.head.appendChild(altXd)
    }
    altXd.setAttribute('href', url)
    let altId = document.head.querySelector('link[hreflang="id"]')
    if (!altId) {
      altId = document.createElement('link')
      altId.setAttribute('hreflang', 'id')
      document.head.appendChild(altId)
    }
    altId.setAttribute('href', url)

    // JSON-LD
    if (jsonLd) {
      setJsonLd(jsonLd)
    } else {
      setJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': type === 'article' ? 'Article' : 'WebPage',
            headline: title,
            description,
            image: absImage,
            url,
            inLanguage: 'en-US',
            author: {
              '@type': 'Person',
              name: 'Robby Aliasa Akbar',
              url: `${SITE}/profile.html`,
              image: `${SITE}/images/Profile.webp`,
              jobTitle: 'Applied AI Systems Builder',
            },
            publisher: {
              '@type': 'Person',
              name: 'Robby Aliasa Akbar',
              url: `${SITE}/profile.html`,
              image: `${SITE}/images/Profile.webp`,
              sameAs: [
                'https://github.com/robbyaliasaakbar',
                'https://www.linkedin.com/in/robby-aliasa-akbar-001a2a267',
                'https://www.reddit.com/user/Full_Director87/',
                'https://www.instagram.com/ybboraa/',
              ],
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Experiments', item: `${SITE}/experiments-list.html` },
              { '@type': 'ListItem', position: 3, name: title, item: url },
            ],
          },
        ],
      })
    }
  }, [fullTitle, description, absImage, url, type, title, jsonLd])

  return null
}
