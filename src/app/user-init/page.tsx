"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserInit(): JSX.Element {
    const [user, loading] = useAuthState(auth)
    const router = useRouter()
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        // Wait until authentication state is fully initialized
        if (!loading) {
            setInitialized(true)
            if (!user) {
                router.push('/sign-up')
            }
        }
    }, [user, loading, router])

    if (loading || !initialized) {
        return <div>Loading...</div> // Optionally display a loading state
    }

    return (
        <div>
            {user ? <h1>Logged in</h1> : <h1>Not logged in</h1>}
        </div>
    )
}
