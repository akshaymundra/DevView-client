import Button from "@/components/common/buttons/Button"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Link } from "react-router-dom";


const Home = () => {

    const { dispatch } = useAuthContext();

    return (
        <div className="text-sky-600 text-2xl">
            <Button
                varient="warning"
                onClick={() => dispatch({ type: 'LOGOUT' })}
            >
                Logout
            </Button>

            <Link to={'room/id'}>
                Go to room id
            </Link>

        </div>
    )
}

export default Home