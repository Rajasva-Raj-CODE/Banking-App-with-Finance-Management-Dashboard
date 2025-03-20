'use client'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amonut }: { amonut: number }) => {
    return (
        <div className='w-full'>
            <CountUp
                decimal=','
                prefix='$'

                decimals={2}
                end={amonut} />
        </div>
    )
}

export default AnimatedCounter