import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = async () => {
    const loggedIn = await getLoggedInUser()
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type='greeting'
                        title='Welcome to Banking App'
                        user={loggedIn?.name || 'Guest'}
                        subtext='Access and manage your account and transactions efficiently'
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>
                recent  tranction
            </div>
            <RightSideBar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 1250.35 }, { currentBalance: 2450.35 }]}
            />
        </section>
    )
}

export default Home