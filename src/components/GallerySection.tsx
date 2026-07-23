import { galleryImages } from '../data/gallery'

export function GallerySection() {
  return (
    <section id="gallery" className="hg-section">
      <div className="hg-shell">
        <div className="hg-section__intro hg-section__intro--left">
          <p className="hg-eyebrow">Gallery</p>
          <h2 className="hg-title">Atmosphere first, then detail.</h2>
          <p className="hg-lead">
            Replace these placeholders with real food, interior, team, and venue photography. The layout is ready for
            an editorial hospitality image system.
          </p>
        </div>

        <div className="hg-gallery">
          {galleryImages.slice(0, 8).map((image, index) => (
            <figure key={`${image.src}-${index}`} className={index === 0 || index === 5 ? 'hg-gallery__item hg-gallery__item--wide' : 'hg-gallery__item'}>
              <img src={image.src} alt={image.caption || `${image.set} image`} loading="lazy" />
              <figcaption>{image.set}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
