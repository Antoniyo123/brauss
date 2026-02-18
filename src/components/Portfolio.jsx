import "../styles/Portfolio.css"

export default function Services() {
  const services = [
    {
      title: "Creative Strategy",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullam"
    },
    {
      title: "Digital Media",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullam"
    },
    {
      title: "Activation",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullam"
    }
  ]

  return (
    <section className="services">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>

        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-col" key={i}>
              <h3 className="service-name">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}