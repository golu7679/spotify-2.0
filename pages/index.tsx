import type {NextPage} from 'next'
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <main className="">
                <Sidebar/>
                {/*    Center content */}
            </main>

            <div>
                {/*    player */}
            </div>

        </div>
    )
}

export default Home
