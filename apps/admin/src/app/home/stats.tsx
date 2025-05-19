const Stats = ({
  valueAll,
  valuePending,
  value1AC,
  value2AC,
  value3AC,
  valueTroncCommun,
  className
}:{
  valueAll: number,
  valuePending: number,
  value1AC: number,
  value2AC: number,
  value3AC: number,
  valueTroncCommun: number,
  className?: string
}) => {
  return (
    <>
      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Application</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">All</div>
          <div className={'text-zinc-100'}>{valueAll}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-[#FFE380] text-black">PENDING</div>
          <div className={'text-zinc-100'}>{valuePending}</div>
        </div>
      </div>

      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Pending Application by Level</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">1 AC</div>
          <div className={'text-zinc-100'}>{value1AC}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">2 AC</div>
          <div className={'text-zinc-100'}>{value2AC}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">3 AC</div>
          <div className={'text-zinc-100'}>{value3AC}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Tronc Commun</div>
          <div className={'text-zinc-100'}>{valueTroncCommun}</div>
        </div>
      </div>
    </>
    
  )
}

export default Stats
