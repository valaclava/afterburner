"use client";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

function Telemetry() {
    const [time, setTime] = useState(0); // Time in seconds
    const [speed, setSpeed] = useState(0); // Speed in km/h
    const [topSpeed, setTopSpeed] = useState(0);
    const [distance, setDistance] = useState(0); // Distance in km

    function toKmH(speed: number): number {
        return Math.round(speed * 3.6); // Convert m/s to km/h
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        const updateSpeed = (position: GeolocationPosition) => {
            let speed = position.coords.speed; // Speed in m/s
            if (speed !== null) {
                let kmh = toKmH(speed);
                setSpeed(kmh);
                setTopSpeed(prevTopSpeed => Math.max(prevTopSpeed, kmh));

            }
        };

        const watcher = navigator.geolocation.watchPosition(updateSpeed, console.error, {
            enableHighAccuracy: true,
            maximumAge: 0,
            //timeout: 500
        });

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1); // Increase time by 1 second
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    useEffect(() => {
        // Convert speed from km/h to km/s
        let speedKms = speed / 3600;
        setDistance(prevDistance => prevDistance + speedKms);
    }, [speed, time]);

    const [tasks, setTasks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    // const [peak, setPeak] = useState('')

    const { user } = useUser()
    const { session } = useSession()

    // Protect the route by checking if the user is signed in


    // Get the Backend API User object when you need access to the user's information

    const username = user?.username + "'s"

    function createClerkSupabaseClient() {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_KEY!,
            {
                global: {
                    fetch: async (url, options = {}) => {
                        const clerkToken = await session?.getToken({
                            template: 'supabase',
                        })

                        const headers = new Headers(options?.headers)
                        headers.set('Authorization', `Bearer ${clerkToken}`)

                        return fetch(url, { ...options, headers })
                    },
                },
            },
        )
    }

    const client = createClerkSupabaseClient()

    useEffect(() => {

        if (!user) return

        async function loadTasks() {
            setLoading(true)
            const { data, error } = await client.from('tasks').select().eq('user_id', user?.id)
            if (error) {
                console.error('Error fetching tasks:', error)
            } else {
                setTasks(data)
            }
            setLoading(false)
        }

        loadTasks()
    }, [user])
    async function createOrUpdateTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!user?.username) {
            alert('User is not logged in or username is unavailable')
            return
        }

        const newPeak = topSpeed
        const newDistance = parseFloat(distance.toFixed(2))
        if (isNaN(newPeak)) {
            alert('Please enter a valid peak value')
            return
        }
        // if(isNaN(newDistance))
        // {
        //     alert('invalid distance')
        // }

        console.log(`🔍 Attempting to update peak for ${user.username} with value:`, newPeak)

        // Fetch current peak value of the user
        const { data: existingTask, error } = await client
            .from('tasks')
            .select('peak,traversal')
            .eq('name', user.username)
            .single()

        if (error && error.code !== 'PGRST116') {
            console.error('❌ Error fetching task:', error)
            return
        }

        const currentPeak = existingTask ? parseInt(existingTask.peak, 10) : 0
        const currentDistance = existingTask ? parseFloat(existingTask.traversal) : 0
        console.log(`📊 Current peak: ${currentPeak}, New peak: ${newPeak}`)


        if (!existingTask) {
            console.log('🆕 No existing task found. Inserting new task...')
            const { error: insertError } = await client.from('tasks').insert({
                name: user.username,
                peak: newPeak,  // Keep as an integer
                traversal: newDistance,
            })
            if (insertError) console.error('❌ Error inserting task:', insertError)
        } if (newPeak > currentPeak) {
            console.log('🔼 New peak is greater, updating...')
            const { data, error } = await client.from('tasks').update({ peak: newPeak }).eq('name', user.username)
            console.log(data, error)

        }
        // if (newDistance > currentDistance) {
        //     console.log('🔼 New peak is greater, updating...')
        //     const { data, error } = await client.from('tasks').update({ traversal: newDistance }).eq('name', user.username)
        //     console.log(data, error)
        //}
        else {
            console.log('⏳ New peak is not greater. No update performed.')
        }

        window.location.reload()
    }
    createOrUpdateTask;



    return (
        <>
            <fieldset className="border p-4 flex justify-center">
                <legend className="font-bold text-lg px-2">VΛCLV</legend>

                <div className="p-4 text-center w-full max-w-md mx-auto">
                    {/* Enlarged Speed Block as a Square */}
                    <fieldset className="border text-white w-full h-48 sm:w-64 sm:h-64 flex flex-col items-center justify-center mx-auto">
                        <legend className="font-bold text-xl px-2">Speed</legend>
                        <div className="flex flex-col items-center">
                            <p className="text-5xl font-extrabold">{speed} kmph</p>
                            <p className="text-2xl text-gray-400 font-bold">{Math.round(speed * 0.621371)} mph</p>
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 mt-4">
                        <legend className="font-bold">Top Speed</legend>
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl">{topSpeed} kmph</h1>
                            <p className="text-lg text-gray-400 font-bold">{Math.round(topSpeed * 0.621371)} mph</p>
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 mt-4">
                        <legend className="font-bold">Time</legend>
                        <h1 className="text-2xl">{new Date(time * 1000).toISOString().substr(11, 8)}</h1>
                    </fieldset>

                    <fieldset className="border p-4 mt-4">
                        <legend className="font-bold">Distance</legend>
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl">{distance.toFixed(2)} km</h1>
                            <p className="text-lg text-gray-400 font-bold">{(distance * 0.621371).toFixed(2)} miles</p>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
            <form onSubmit={createOrUpdateTask}>
                <div className="flex justify-center">
                    <button className="px-4 py-2 ">Save</button>
                </div>
            </form>
        </>
    );
}

export default Telemetry;
