/**
 * Mock data service for local development — no Firebase required.
 * Data is persisted to localStorage so it survives page reloads.
 * Activated automatically when VITE_USE_MOCK=true (set in .env.development).
 */

const STORAGE_KEY = 'talent-audit:mock-data'
const MOCK_USER = { uid: 'mock-user-00001' }

let _talents = []
let _listeners = []

function _load() {
  try {
    _talents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    _talents = []
  }
}

function _save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_talents))
  const sorted = [..._talents].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
  _listeners.forEach((cb) => cb(sorted))
}

_load()

export default {
  /** Immediately resolves with a mock user after a short tick. */
  initAuth(callback) {
    setTimeout(() => callback(MOCK_USER), 50)
    return () => {} // no-op unsubscribe
  },

  /** Subscribes to in-memory talents store, emitting the current state immediately. */
  subscribeToTalents(callback) {
    _listeners.push(callback)
    // emit current state on next tick
    const sorted = [..._talents].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    setTimeout(() => callback(sorted), 0)
    return () => {
      _listeners = _listeners.filter((l) => l !== callback)
    }
  },

  async addTalent(user, payload) {
    _talents.unshift({
      id: `mock-${Date.now()}`,
      ...payload,
      category: 'Community Entry',
      userId: user.uid,
      userName: `User-${user.uid.substring(0, 5)}`,
      upvotes: 0,
      timestamp: Date.now(),
    })
    _save()
  },

  async upvote(id) {
    const talent = _talents.find((t) => t.id === id)
    if (talent) {
      talent.upvotes = (talent.upvotes || 0) + 1
      _save()
    }
  },

  async addComment(talentId, comment) {
    const talent = _talents.find((t) => t.id === talentId)
    if (talent) {
      if (!talent.comments) talent.comments = []
      talent.comments.push({ id: `c-${Date.now()}`, ...comment, timestamp: Date.now() })
      _save()
    }
  },
}
