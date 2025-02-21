import Image from 'next/image'

interface WelcomeCardProps {
  name: string
  progress: number
  isFirstTime?: boolean
  message?: string
}

const WelcomeCard = ({
  name,
  progress,
  isFirstTime = false,
  message,
}: WelcomeCardProps) => {
  const defaultMessage = isFirstTime
    ? "Let's make our success, Start Now!"
    : "Keep going, it's a lot of work today so let's start!"

  return (
    <div className="w-full bg-[#EBF3FA] rounded-xl p-6 flex justify-between items-center">
      <div className="space-y-2 w-1/4">
        <h2 className="text-2xl font-semibold">
          {isFirstTime ? 'Welcome' : 'Welcome back'}{' '}
          <span className="italic">{name}!</span>
        </h2>
        <p className="text-gray-600">{message || defaultMessage}</p>
      </div>
 <div className="flex flex-col items-center gap-2 w-1/4">
          <div className="relative w-20 h-20">
            <div className="w-full h-full rounded-full bg-[#0A2647] flex items-center justify-center">
              <span className="text-white text-xl font-bold">{progress}%</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#0A2647] transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      <div className="flex items-center gap-8 w-1/4">
        {/* Progress Circle with Bar */}
       

        {/* Illustration */}
        <div className="relative w-32 h-32">
          <Image
            src="/images/student-illustration.png"
            alt="Student illustration"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard
