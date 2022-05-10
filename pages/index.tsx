import type { NextPage } from 'next'
import { getSession } from 'next-auth/react';
import Center from '../components/Center';
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <main className="flex">
                <Sidebar />
                <Center />
            </main>

            <div>
                {/*    player */}
            </div>

        </div>
    )
}

export default Home

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        }
    }
}