import { ArrowRight, Award, Coins, Gamepad2, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
export default function Home() {
  // Sample game data
  const featuredGames = [
    {
      id: 1,
      title: "Find4.io",
      description:
        "The classic game to get 4 in a row, on-chain! Play against friends, beat the AI, earn and compete!",
      img: "https://pbs.twimg.com/media/GjW0kqOXoAAplvL?format=jpg&name=medium",
    },
    {
      id: 2,
      title: "$AXOL Game",
      description:
        "Swim your way through a sea of obstacles and earn weekly rewards!",
      img: "https://www.axolcoin.xyz/img/hero/axol.gif",
    },
    {
      id: 3,
      title: "Coming Soon",
      description:
        "Many new games being created by partner creators and our devs, stay tuned!",
      img: "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg",
    },
  ];
  const numberOfDuplications = [0, 1, 3];
  const images = [
    "/img-1.svg",
    "/img-2.svg",
    "/img-3.svg",
    "/axol.png",
    "/icon.png",
    "/img-2.svg",
    "/img-3.svg",
    "/img-4.svg",
    "/img-1.svg",
    "/img-2.svg",
    "/img-3.svg",
    "/img-4.svg",
  ];
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative hero-gradient text-white py-10 sm:py-20 overflow-hidden">
          {/* <section className="relative bg-blue-700 text-white py-20 overflow-hidden"> */}
          {/* Stars background */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + "px",
                  height: Math.random() * 3 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.8,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-2 tracking-tight">
                  {/* MULTICHAIN DEFI */}
                  The Ultimate
                </h1>
                <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-6 tracking-tight">
                  {/* WEB <span className="text-blue-500">3.0</span> ECOSYSTEM */}
                  Gaming Platform
                </h1>
                <p className="text-base md:text-lg mb-8 text-gray-300">
                  The next generation gaming ecosystem for ICOs and NFT market
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/games"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Explore Games
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>

                  <Link
                    to="/tokenomics"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Tokenomics
                  </Link>
                </div>

                {/* <div className="mt-16 sm:flex flex-col">
                  <p className="text-sm mb-4">BUY TOKEN ON</p>
                  <div className="flex sm:flex-nowrap flex-wrap sm:gap-0 gap-4 sm:items-start items-center sm:justify-start justify-center space-x-6 ">
                    {[
                      // "/img-1.svg",
                      "/img-2.svg",
                      // "/img-2.svg",
                      // "/img-1.svg",
                      // "/img-3.svg",
                      "/img-1.svg",
                      // "/img-3.svg",
                      "/img-3.svg",
                      // "/img-4.svg",
                    ].map((exchange, index) => (
                      <div
                        key={index}
                        className="opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <img
                          src={exchange}
                          alt={exchange}
                          width={100}
                          height={30}
                          className="sm:h-10 w-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="md:w-1/2 flex justify-center md:justify-end">
                {/* <div className="relative w-64 h-80"> */}
                {/* <div className="absolute w-full h-full animate-float">
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      <defs>
                        <linearGradient
                          id="rocketGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#F43F5E" />
                          <stop offset="100%" stopColor="#FB7185" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M100,20 L130,120 L130,220 L70,220 L70,120 Z"
                        fill="url(#rocketGradient)"
                      />
                      <path d="M100,20 L70,120 L130,120 Z" fill="#E11D48" />
                      <circle
                        cx="100"
                        cy="150"
                        r="20"
                        fill="#0F172A"
                        stroke="#22D3EE"
                        strokeWidth="3"
                      />
                      <path d="M70,220 L40,260 L70,240 Z" fill="#BE123C" />
                      <path d="M130,220 L160,260 L130,240 Z" fill="#BE123C" />
                      <path
                        d="M85,220 L100,280 L115,220 Z"
                        fill="#FBBF24"
                        className="animate-pulse"
                      />
                    </svg>
                  </div> */}
                <img
                  src="/logo-icon.png"
                  className="w-auto h-[240px] sm:h-[340px] animate-[pulse_5000ms_infinite]"
                  alt=""
                />
                {/* </div> */}
              </div>
            </div>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 border-t border-white pt-8">
              {[
                {
                  label: "MARKET CAP",
                  value: "$490.88M",
                  color: "text-blue-400",
                },
                { label: "TVL", value: "$38.60M", color: "text-blue-400" },
                { label: "PRICE", value: "$0.09", color: "text-blue-400" },
                {
                  label: "FUND RAISED",
                  value: "$160M",
                  color: "text-blue-400",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm text-white">{stat.label}</p>
                  <p className={`text-xl md:text-2xl font-bold text-blue-100`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div> */}
          </div>
        </section>
        {/* <section className="hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  The Ultimate Gaming Platform
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  Play, earn, and compete in the next generation of blockchain
                  gaming
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/games"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Explore Games
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/tokenomics"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Learn About Tokenomics
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-end">
                <img
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="GameSuite Platform"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* partners  */}
        {/* <div className="flex w-full flex-col gap-[40px] sm:gap-[32px] pt-[30px] bg-[white] overflow-hidden pb-[30px] sm:pb-[40px] md:gap-[40px]"> */}
          {/* <div className="flex w-full items-center justify-center">
            <p className="text-center text-[20px] leading-[1.2] text-gray-700 font-semibold  md:text-[20px]">
              Trusted by more than <br />
              <span className="font-[700]"> 100,000</span> of the world’s
              leading organizations
            </p>
          </div> */}
          {/* <div className="marquee-scroll-animation flex w-max items-center">
            {numberOfDuplications.map((_, dupIndex) => (
              <Fragment key={dupIndex}>
                {images.map((item, i) => (
                  <div
                    key={i}
                    className="mx-[48px] flex h-[50px] w-full items-center justify-center bg-[#BB3558]"
                    style={{
                      WebkitMaskImage: `url("${item}")`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskImage: `url("${item}")`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                    }}
                  >
                    <img
                      key={i}
                      src={`${item}`}
                      alt={`work-image-${i}`}
                      className="h-[50px] w-auto opacity-0"
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div> */}
        {/* </div> */}

        {/* Platform Features Section */}

        {/* Featured Games Section */}
        <section id="games" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Games
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our collection of exciting original and partnered games where you can play,
                compete, and earn rewards
              </p>
            </div>
            {/* Game Categories */}
            {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                All Games
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                Racing
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                Strategy
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                Card Games
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                RPG
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                Simulation
              </button>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGames.map((game) => (
                <div
                  key={game.id}
                  className="game-card bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-[240px] w-full">
                    <img
                      src={game.img || "/placeholder.svg"}
                      alt={game.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <Link
                      to={`/games/${game.id}`}
                      className="inline-flex items-center text-primary hover:text-secondary font-medium"
                    >
                      Play Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="text-center mt-12">
              <Link
                to="/games"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View All Games
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div> */}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose GameSuite for your game?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We are a fast growing ecosystem of Sui based games that offers exposure, on-chain features such as leaderboards and Enoki login services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-4">
                  <Gamepad2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sui Chain Integration
                </h3>
                <p className="text-gray-600">
                  We offer customizable and secure on-chain leaderboards and achievements, and web2 connected wallet logins for users, a
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-4">
                  <Coins className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Cheap and Easy
                </h3>
                <p className="text-gray-600">
                  Low costs for integrating our smart contracts into your game, and we make the setup is simple.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Community-Driven
                </h3>
                <p className="text-gray-600">
                  Join a thriving ecosystem of Sui games and gain larger exposure to the Sui community of gamers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Preview Section */}
        {/* <section id="tokenomics" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tokenomics
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our token economy is designed to reward players, developers, and
                stakeholders
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
              <div className="lg:w-1/2">
                <div className="relative w-full">
                  <img
                    src="/tokenomics.webp"
                    alt="Token Distribution Chart"
                    className="object-cover rounded-[10px]"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
                    <h3 className="font-medium text-gray-900">
                      Play-to-Earn Rewards
                    </h3>
                  </div>
                  <p className="text-gray-600">40% - 400,000,000 GST</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-secondary rounded-full mr-2"></div>
                    <h3 className="font-medium text-gray-900">
                      Team & Advisors
                    </h3>
                  </div>
                  <p className="text-gray-600">15% - 150,000,000 GST</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-blue-300 rounded-full mr-2"></div>
                    <h3 className="font-medium text-gray-900">
                      Ecosystem Development
                    </h3>
                  </div>
                  <p className="text-gray-600">20% - 200,000,000 GST</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
                    <h3 className="font-medium text-gray-900">
                      Community & Marketing
                    </h3>
                  </div>
                  <p className="text-gray-600">10% - 100,000,000 GST</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Play-to-Earn
                </h3>
                <p className="text-gray-600">
                  Earn tokens by playing games, completing challenges, and
                  climbing the leaderboards
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Staking Rewards
                </h3>
                <p className="text-gray-600">
                  Stake your tokens to earn passive income and unlock exclusive
                  benefits
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Governance
                </h3>
                <p className="text-gray-600">
                  Participate in platform decisions and shape the future of
                  GameSuite
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/tokenomics"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Learn More About Tokenomics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section> */}

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Getting started with GameSuite is easy - follow these simple
                steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4 relative z-10">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    Create an Account
                  </h3>
                  <p className="text-gray-600 text-center">
                    Sign up for a free account to access all games and features
                    on the platform
                  </p>
                  <div className="mt-6 w-full relative flex items-center justify-center">
                    <img
                      src="/ilust-1.webp"
                      alt="Create Account"
                      className="object-cover max-w-[200px] rounded-lg"
                    />
                  </div>
                </div>
                <div className="hidden md:block absolute top-10 right-0 w-1/2 h-0.5 bg-primary"></div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4 relative z-10">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    Play Games & Earn Tokens
                  </h3>
                  <p className="text-gray-600 text-center">
                    Choose from our collection of games and start earning tokens
                    as you play
                  </p>
                  <div className="mt-10 w-full relative flex items-center justify-center">
                    <img
                      src="/ilust-2.png"
                      alt="Create Account"
                      className="object-cover max-w-[180px] rounded-lg"
                    />
                  </div>
                </div>
                <div className="hidden md:block absolute top-10 right-0 w-1/2 h-0.5 bg-primary"></div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4 relative z-10">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    Stake & Participate
                  </h3>
                  <p className="text-gray-600 text-center">
                    Stake your tokens to earn rewards and participate in
                    platform governance
                  </p>
                  <div className="mt-10 w-full relative flex items-center justify-center">
                    <img
                      src="/ilust-3.png"
                      alt="Create Account"
                      className="object-cover max-w-[220px] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Start Your Gaming Journey?
                </h2>
                <p className="text-lg opacity-90 max-w-2xl">
                  Join thousands of players already earning rewards on the
                  GameSuite platform
                </p>
              </div>
              <div>
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
