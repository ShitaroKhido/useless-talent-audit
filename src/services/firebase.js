/**
 * Real Firebase data service.
 * Implements the data service interface used by useTalents composable.
 * Only bundled when VITE_USE_MOCK !== 'true'.
 */
import { auth, db, appId } from '@/lib/firebase.js'
import {
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  increment,
  arrayUnion,
} from 'firebase/firestore'

const talentsRef = () =>
  collection(db, 'artifacts', appId, 'public', 'data', 'global_talents')

export default {
  /**
   * Initialise auth (anonymous or custom token) and watch auth state.
   * @param {(user: object|null) => void} callback
   * @returns {() => void} unsubscribe
   */
  initAuth(callback) {
    const init = async () => {
      try {
        const token = import.meta.env.VITE_INITIAL_AUTH_TOKEN
        if (token) await signInWithCustomToken(auth, token)
        else await signInAnonymously(auth)
      } catch (err) {
        console.error('[firebase] Auth error:', err)
      }
    }
    init()
    return onAuthStateChanged(auth, callback)
  },

  /**
   * Subscribe to the global talents collection.
   * @param {(talents: object[]) => void} callback
   * @returns {() => void} unsubscribe
   */
  subscribeToTalents(callback) {
    return onSnapshot(
      talentsRef(),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        callback(data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)))
      },
      (err) => console.error('[firebase] Snapshot error:', err)
    )
  },

  /** @param {{ uid: string }} user @param {object} payload */
  async addTalent(user, payload) {
    await addDoc(talentsRef(), {
      ...payload,
      category: 'Community Entry',
      userId: user.uid,
      userName: `User-${user.uid.substring(0, 5)}`,
      upvotes: 0,
      timestamp: Date.now(),
    })
  },

  /** @param {string} id */
  async upvote(id) {
    await updateDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'global_talents', id),
      { upvotes: increment(1) }
    )
  },

  /** @param {string} talentId @param {object} comment */
  async addComment(talentId, comment) {
    await updateDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'global_talents', talentId),
      { comments: arrayUnion({ id: `c-${Date.now()}`, ...comment, timestamp: Date.now() }) }
    )
  },
}
