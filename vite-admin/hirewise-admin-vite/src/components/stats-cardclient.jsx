import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase-client'

import { Users, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function StatsCardsClient() {
  const [stats, setStats] = useState({
    total: 0,
    inReview: 0,
    shortlisted: 0,
    rejected: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        const [
          { count: total },
          { count: inReview },
          { count: shortlisted },
          { count: rejected }
        ] = await Promise.all([
          supabase.from('faculty_applications').select('*', { count: 'exact' }),
          supabase.from('faculty_applications').select('*', { count: 'exact' }).eq('status', 'in_review'),
          supabase.from('faculty_applications').select('*', { count: 'exact' }).eq('status', 'shortlisted'),
          supabase.from('faculty_applications').select('*', { count: 'exact' }).eq('status', 'rejected')
        ])

        setStats({
          total: total || 0,
          inReview: inReview || 0,
          shortlisted: shortlisted || 0,
          rejected: rejected || 0
        })
      } catch (err) {
        setError(err.message)
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div>Loading stats...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Total Applications */}
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100/50 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm backdrop-filter bg-opacity-80">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Total Applications</p>
        <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
      </div>
      <div className="p-3 rounded-lg bg-blue-100/70 shadow-inner">
        <Users className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>

  {/* In Review */}
  <div className="bg-[#fff3cd] rounded-xl p-6 border border-amber-100/50 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm backdrop-filter bg-opacity-80">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-amber-600">In Review</p>
        <p className="text-2xl font-bold text-amber-900 mt-1">{stats.inReview}</p>
      </div>
      <div className="p-3 rounded-lg bg-[#FFE082]/70 shadow-inner">
        <Eye className="h-6 w-6 text-amber-600" />
      </div>
    </div>
  </div>

  {/* Shortlisted */}
  <div className="bg-[#d4edda] rounded-xl p-6 border border-green-100/50 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm backdrop-filter bg-opacity-80">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-green-600">Shortlisted</p>
        <p className="text-2xl font-bold text-green-900 mt-1">{stats.shortlisted}</p>
      </div>
      <div className="p-3 rounded-lg bg-[#81C784]/70 shadow-inner">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
    </div>
  </div>

  {/* Rejected */}
  <div className="bg-[#f8d7da] rounded-xl p-6 border border-red-100/50 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm backdrop-filter bg-opacity-80">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-red-600">Rejected</p>
        <p className="text-2xl font-bold text-red-900 mt-1">{stats.rejected}</p>
      </div>
      <div className="p-3 rounded-lg bg-[#E57373]/70 shadow-inner">
        <XCircle className="h-6 w-6 text-red-600" />
      </div>
    </div>
  </div>
</div>
  )
}
