import {getProviders} from "next-auth/react";
import {providers} from "next-auth/core/routes";

function Login(props) {
    return (
        <div>
            <img src="https://links.paparact.com/9xl" alt="" className="w-52 mb-5"/>

            {
                Object.values(providers).map((provider) => {
                    <div>
                        <button className="bg-[#18D860]" key={provider.name}>
                            Login with {provider.name}
                        </button>
                    </div>
                })
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