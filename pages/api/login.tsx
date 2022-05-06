import {getProviders, signIn} from "next-auth/react";

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img src="https://links.paparact.com/9xl" alt="" className="w-52 mb-5"/>
            {
                Object.values(providers).map((provider) =>
                    (
                        <div>
                            <button className="bg-[#18D860] text-white p-5 rounded-full" key={provider['name']}>
                                Login with {provider['name']}
                            </button>
                        </div>
                    )
                )
            }

        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}