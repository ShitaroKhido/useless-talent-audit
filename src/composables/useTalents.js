import { ref, computed, watch, onUnmounted } from 'vue'
// Resolves to mock.js or firebase.js at build time via vite.config.js alias
import dataService from '@/services/data'

/**
 * Composable that owns all talent data + auth logic.
 * Works with either the real Firebase service or the local mock.
 */
export function useTalents() {
  const user = ref(null)
  const talents = ref([])
  const loading = ref(true)

  const avgPointlessness = computed(() => {
    if (!talents.value.length) return 0
    const total = talents.value.reduce((acc, t) => acc + (t.uselessness || 0), 0)
    return Math.round(total / talents.value.length)
  })

  const totalUpvotes = computed(() =>
    talents.value.reduce((acc, t) => acc + (t.upvotes || 0), 0)
  )

  // Start auth — runs on composable creation (synchronously inside setup())
  const unsubAuth = dataService.initAuth((u) => {
    user.value = u
  })

  // Subscribe to talents whenever auth user changes
  let unsubTalents = null
  watch(user, (u) => {
    unsubTalents?.()
    unsubTalents = null
    if (!u) return
    unsubTalents = dataService.subscribeToTalents((data) => {
      talents.value = data
      loading.value = false
    })
  })

  onUnmounted(() => {
    unsubAuth?.()
    unsubTalents?.()
  })

  async function addTalent(payload) {
    if (!user.value) return { duplicate: null }

    // Case-insensitive duplicate check against the current in-memory list
    const duplicate = talents.value.find(
      (t) => t.name.trim().toLowerCase() === payload.name.trim().toLowerCase()
    )
    if (duplicate) return { duplicate }

    await dataService.addTalent(user.value, payload)
    return { duplicate: null }
  }

  async function upvote(id) {
    if (!user.value) return
    await dataService.upvote(id)
  }

  async function addComment(talentId, text) {
    if (!text.trim()) return
    const uid = user.value?.uid
    await dataService.addComment(talentId, {
      text: text.trim(),
      userId: uid || 'anon',
      userName: uid ? `User-${uid.substring(0, 5)}` : 'Anonymous',
    })
  }

  return { user, talents, loading, avgPointlessness, totalUpvotes, addTalent, upvote, addComment }
}
