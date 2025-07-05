const TwinklingStars = () => {
  return (
    <div className="absolute inset-0">
      {/* Small twinkling stars */}
      <div className="bg-star w-1 h-1 top-10 left-20"></div>
      <div className="bg-star-slow w-0.5 h-0.5 top-32 right-40"></div>
      <div className="bg-star-fast w-1 h-1 bottom-40 left-60"></div>
      <div className="bg-star-delayed w-0.5 h-0.5 top-60 right-20"></div>
      <div className="bg-star w-1 h-1 bottom-20 right-80"></div>
      <div className="bg-star-slow w-0.5 h-0.5 top-80 left-40"></div>
      <div className="bg-star-fast w-1 h-1 top-24 left-80"></div>
      <div className="bg-star w-0.5 h-0.5 bottom-60 right-60"></div>
      <div className="bg-star-delayed w-1 h-1 top-40 right-100"></div>
      <div className="bg-star-slow w-0.5 h-0.5 top-16 left-32"></div>
      <div className="bg-star w-1 h-1 bottom-32 left-24"></div>
      <div className="bg-star-fast w-0.5 h-0.5 top-72 right-32"></div>
      <div className="bg-star-delayed w-1 h-1 bottom-16 right-16"></div>
      <div className="bg-star w-0.5 h-0.5 top-48 left-72"></div>
      <div className="bg-star-slow w-1 h-1 bottom-72 right-72"></div>
      <div className="bg-star-fast w-0.5 h-0.5 top-20 right-60"></div>
      <div className="bg-star w-1 h-1 bottom-48 left-48"></div>
      <div className="bg-star-delayed w-0.5 h-0.5 top-64 left-16"></div>
      <div className="bg-star-slow w-1 h-1 bottom-24 right-24"></div>
      <div className="bg-star w-0.5 h-0.5 top-36 right-36"></div>
      {/* More scattered stars */}
      <div className="bg-star-fast w-0.5 h-0.5 top-52 left-88"></div>
      <div className="bg-star w-1 h-1 bottom-52 right-88"></div>
      <div className="bg-star-delayed w-0.5 h-0.5 top-28 left-64"></div>
      <div className="bg-star-slow w-1 h-1 bottom-28 right-64"></div>
      <div className="bg-star w-0.5 h-0.5 top-76 left-28"></div>
      <div className="bg-star-fast w-1 h-1 bottom-76 right-28"></div>
    </div>
  )
}

export default TwinklingStars 