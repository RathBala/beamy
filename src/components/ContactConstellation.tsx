interface Star {
  size: string
  color: string
  position: string
}

interface ContactConstellationProps {
  position: string
  title: string
  titleColor: string
  stars: Star[]
  nebulaColor: string
  nebulaSize: string
  nebulaOpacity?: string
  nebulaBlur?: string
}

const ContactConstellation = ({
  position,
  title,
  titleColor,
  stars,
  nebulaColor,
  nebulaSize,
  nebulaOpacity = 'opacity-5',
  nebulaBlur = 'blur-2xl'
}: ContactConstellationProps) => {
  return (
    <div className={`absolute ${position}`}>
      <div className={`${titleColor} text-sm font-bold mb-4 text-center`}>{title}</div>
      <div className="relative">
        {/* Contact stars with realistic glow */}
        {stars.map((star, index) => (
          <div
            key={index}
            className={`${star.size} ${star.color} contact-star absolute ${star.position}`}
          />
        ))}
        {/* Subtle nebula effect */}
        <div className={`absolute ${nebulaSize} ${nebulaColor} ${nebulaOpacity} rounded-full ${nebulaBlur} nebula-effect`}></div>
      </div>
    </div>
  )
}

export default ContactConstellation 