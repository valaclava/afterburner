'use client'
import { useEffect, useState } from 'react'
import { SignedOut, SignInButton, useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import Footer from '../components/Footer'

export default function Drive() {
  const [tasks, setTasks] = useState<any[]>([])
  const [rank, setRank] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [peak, setPeak] = useState('')

  const { user } = useUser()
  const { session } = useSession()

  // Function to convert kmph to mph
  const kmphToMph = (kmph: number) => {
    return Math.round(kmph * 0.621371);
  };

  // Protect the route by checking if the user is signed in
  const username = user?.username + "'s";
  const userImage = user?.imageUrl;

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

  useEffect(() => {
    async function loadRanks() {
      setLoading(true)
      const { data, error } = await client.from('tasks').select()
      if (error) {
        console.error('Error fetching tasks:', error)
      } else {
        setRank(data)
      }
      setLoading(false)
    }

    loadRanks()
  }, [user])

  if (!user?.id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center space-y-6">
  {/* Logo */}
  <div>
    <h1 className="text-4xl font-extrabold ">Driver's Profile</h1>
    <p className="text-gray-400 mt-2 text-sm">Fast life</p>
  </div>

  <div className="w-48 h-48">
    <img
      src="https://pbs.twimg.com/media/Glt9EvQbgAAoFED?format=jpg&name=large"
      alt="VΛCLV Logo"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Branding */}
  <div>
    <h1 className="text-3xl font-bold ">VΛCLV</h1>
    <p className="text-gray-400 text-xs mt-1 uppercase">Sign-In to view this page</p>
  </div>

  {/* Sign-in Button */}
  <SignedOut>
    <SignInButton>
      <button className="mt-2 px-6 py-3 border border-white text-black bg-white hover:bg-gray-300 transition rounded">
        Sign In
      </button>
    </SignInButton>
  </SignedOut>
</div>
    )
  }

  async function createOrUpdateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!user?.username) {
      alert('User is not logged in or username is unavailable')
      return
    }

    const newPeak = parseInt(peak, 10)
    if (isNaN(newPeak)) {
      alert('Please enter a valid peak value')
      return
    }

    console.log(`🔍 Attempting to update peak for ${user.username} with value:`, newPeak)

    // Fetch current peak value of the user
    const { data: existingTask, error } = await client
      .from('tasks')
      .select('peak')
      .eq('name', user.username)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Error fetching task:', error)
      return
    }

    const currentPeak = existingTask ? parseInt(existingTask.peak, 10) : 0

    console.log(`📊 Current peak: ${currentPeak}, New peak: ${newPeak}`)


    if (!existingTask) {
      console.log('🆕 No existing task found. Inserting new task...')
      const { error: insertError } = await client.from('tasks').insert({
        name: user.username,
        peak: newPeak,  // Keep as an integer
      })
      if (insertError) console.error('❌ Error inserting task:', insertError)
    } if (newPeak > currentPeak) {
      console.log('🔼 New peak is greater, updating...')
      const { data, error } = await client.from('tasks').update({ peak: newPeak }).eq('name', user.username)
      console.log(data, error)
      console.log(newPeak, currentPeak);
    } else {
      console.log('⏳ New peak is not greater. No update performed.')
    }

    window.location.reload()
  }
  const sortedRanks = [...rank].sort((a, b) => b.peak - a.peak);
  const userRank = sortedRanks.findIndex(task => task.user_id === user?.id) + 1;

  const resetStats = async () => {
    if (window.confirm("Are you sure you want to reset your stats?")) {
      console.log("Stats reset!");
      const { data, error } = await client.from('tasks').update({ peak: 0 }).eq('name', user.username)
      console.log(data,error);
    }
  };
  return (

    <div className='min-h-screen bg-black text-white p-6 sm:p-10'>
      <div className="max-w-4xl bg-black mx-auto text-center">
        <h1 className="text-4xl font-bold">{username} Profile</h1>
        <p className="text-gray-400 mt-2">VΛCLV</p>
        <div className=' flex flex-col items-center justify-center'>
          <div className='w-50 h-50 overflow-hidden border-4'>
            <img src={userImage} className=" w-full h-full object-cover " />
          </div>
        </div>
        {/* Driver Stats */}
        {loading &&
          <div className="mt-6 grid grid-cols-2 gap-6 text-lg">
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Peak</h2>
              <p className="text-xl font-bold">fetching...</p>
            </div>
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Rank</h2>
              <p className="text-xl font-bold">fetching...</p>
            </div>
          </div>
        }
        {!loading && tasks.length === 0 &&
          <div className="mt-6 grid grid-cols-2 gap-6 text-lg">
            <div className=" p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Peak</h2>
              <p className="text-4xl font-bold">N/A</p>
            </div>
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Rank</h2>
              <p className="text-4xl font-bold">N/A</p>
            </div>
          </div>
        }

        {!loading && tasks.length > 0 && tasks.map((task: any) => (
          <div className="mt-6 grid grid-cols-2 gap-6 text-lg">
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Peak</h2>
              <div className="flex flex-col">
                <p className="text-4xl font-bold">{task.peak} kmph</p>
                <p className="text-xl text-gray-400">{kmphToMph(task.peak)} mph</p>
              </div>
            </div>
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Rank</h2>
              <p className="text-4xl font-bold">#{userRank}</p>
            </div>
            <button onClick={resetStats} className='font-bold'>Reset</button>
            <button className='font-bold'>Share</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}
