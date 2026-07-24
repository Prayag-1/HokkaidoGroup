import { galleryImages } from '../data/gallery'

export function GallerySection() {
  return (
    <section id="experiences" className="hg-section hg-section--dark">
      <div className="hg-shell">
        <div className="hg-section__intro hg-section__intro--left">
          <p className="hg-eyebrow">Hokkaido Experiences</p>
          <h2 className="hg-title">Bringing people together</h2>
          <p className="hg-lead">
            Food, rooms, teams, and gatherings form the heart of the group.
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
