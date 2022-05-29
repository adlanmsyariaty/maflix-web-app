import { Navigate } from "react-router-dom"

function RequireAuth({ children, redirectPath }) {
    const authCheck = localStorage.access_token || false
    

    if (!authCheck && redirectPath == "/login") {
        return <Navigate to={redirectPath}/>
    }

    if (authCheck && redirectPath == "/") {
        return <Navigate to={redirectPath}/>
    }

    return children
}

export default RequireAuth