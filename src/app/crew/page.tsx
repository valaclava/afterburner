'use client'
import { SignedOut, SignInButton, useUser, useSession } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import Footer from '../components/Footer';

export default function Crew() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { user } = useUser()
  const { session } = useSession()

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({ template: 'supabase' });
            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${clerkToken}`);
            return fetch(url, { ...options, headers });
          },
        },
      },
    )
  }

  const client = createClerkSupabaseClient()

  useEffect(() => {
    if (!user) return;

    async function loadTasks() {
      setLoading(true)
      const { data, error } = await client.from('tasks').select()
      if (error) {
        console.error('Error fetching tasks:', error)
      } else {
        setTasks(data)
      }
      setLoading(false)
    }

    loadTasks()
  }, [user])

  if (!user?.id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center space-y-6">
  {/* Logo */}
  <div>
    <h1 className="text-4xl font-extrabold tracking-wider">Crew</h1>
    <p className="text-gray-400 mt-2 text-sm">Fast life</p>
  </div>

  <div className="w-48 h-48">
    <img
      src="https://pbs.twimg.com/media/Glt9EvQbgAAoFED?format=jpg&name=large"
      alt="InRequiem Logo"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Branding */}
  <div>
    <h1 className="text-3xl font-bold tracking-widest">InRequiem</h1>
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

  {/* Footer */}
  <div className="absolute bottom-4 w-full">
    <Footer />
  </div>
</div>
    );
  }

  // Sort tasks by peak speed (highest first) and assign rank
  const sortedTasks = [...tasks].sort((a, b) => b.peak - a.peak);

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Crew</h1>
        <p className="text-gray-600 mt-2">Fast life</p>
        {loading && <p>fetching...</p>}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Crew Ranking</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">Rank</th>
                <th className="border border-gray-600 px-4 py-2">Rider</th>
                <th className="border border-gray-600 px-4 py-2">Peak</th>
              </tr>
            </thead>
            <tbody>
              {!loading && sortedTasks.length > 0 && sortedTasks.map((task, index) => (
                <tr key={task.id} className="text-center hover:bg-gray-800">
                  <td className="border border-gray-600 px-4 py-2">#{index + 1}</td>
                  <td className="border border-gray-600 px-4 py-2">{task.name}</td>
                  <td className="border border-gray-600 px-4 py-2">{task.peak} kmph</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
