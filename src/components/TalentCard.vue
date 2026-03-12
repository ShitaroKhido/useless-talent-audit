<script setup>
import { ref, watch, nextTick } from 'vue'
import { Heart, MessageSquare, Send, ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  talent: { type: Object, required: true },
  focused: { type: Boolean, default: false },
})
defineEmits(['upvote', 'add-comment'])

const showComments = ref(false)
const showFull = ref(false)
const commentText = ref('')
const commentInput = ref(null)

// Auto-expand comments and focus input when this card is highlighted as a duplicate
watch(
  () => props.focused,
  async (val) => {
    if (val) {
      showComments.value = true
      await nextTick()
      commentInput.value?.focus()
    }
  },
  { immediate: true }
)

const commentCount = (talent) => (talent.comments || []).length

function submitComment(talentId) {
  if (!commentText.value.trim()) return
  // emit uses the (id, text) signature
  // We use $emit directly in template but need this for @keydown.enter
}

const formatDate = (ts) => (ts ? new Date(ts).toLocaleDateString() : 'Unknown')
</script>

<template>
  <div :id="`talent-${talent.id}`" :class="[
    'group border rounded-3xl transition-all duration-300 overflow-hidden',
    focused
      ? 'bg-purple-50 dark:bg-slate-900 border-purple-400 dark:border-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-900/30'
      : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
  ]">
    <!-- ── Main row (always visible) ─────────────────────── -->
    <div class="flex items-center gap-4 px-6 py-4">

      <!-- Upvote -->
      <button @click.stop="$emit('upvote', talent.id)"
        class="flex flex-col items-center gap-0.5 min-w-[40px] bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 px-2.5 py-2 rounded-xl transition-all active:scale-95 shrink-0">
        <Heart :size="15" :class="(talent.upvotes || 0) > 0 ? 'fill-current text-pink-400' : 'text-slate-400'" />
        <span class="text-[10px] font-bold leading-none">{{ talent.upvotes || 0 }}</span>
      </button>

      <!-- Title + meta -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-0.5 flex-wrap">
          <span
            class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 uppercase tracking-widest border border-purple-200 dark:border-purple-500/20 shrink-0">
            {{ talent.category }}
          </span>
          <span class="text-[10px] text-slate-500 truncate">by {{ talent.userName }}</span>
          <span class="text-[10px] text-slate-600 ml-auto shrink-0">{{ formatDate(talent.timestamp) }}</span>
        </div>
        <h4
          class="font-black text-slate-900 dark:text-white text-base leading-snug truncate group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
          {{ talent.name }}
        </h4>
      </div>

      <!-- Uselessness pill -->
      <div class="shrink-0 flex flex-col items-center">
        <div class="text-[10px] text-slate-500 uppercase tracking-wide leading-none mb-1">Useless</div>
        <div class="text-sm font-black text-purple-600 dark:text-purple-400">{{ talent.uselessness }}%</div>
      </div>
    </div>

    <!-- Uselessness bar (slim, always visible) -->
    <div class="h-0.5 w-full bg-slate-200 dark:bg-slate-800">
      <div class="h-full bg-linear-to-r from-purple-600 to-indigo-500 transition-all duration-1000"
        :style="{ width: `${talent.uselessness}%` }" />
    </div>

    <!-- ── Expandable body ─────────────────────────────────── -->
    <!-- Duplicate notice -->
    <div v-if="focused"
      class="mx-6 mt-3 flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-xl px-3 py-2">
      <span>⚡</span> This skill already exists! Leave a comment below.
    </div>

    <!-- Description (clamped, expand on click) -->
    <div v-if="talent.description" class="px-6 pt-3">
      <p :class="['text-slate-500 dark:text-slate-400 text-sm leading-relaxed', showFull ? '' : 'line-clamp-2']">{{
        talent.description }}</p>
      <button v-if="talent.description.length > 120" @click="showFull = !showFull"
        class="text-[10px] text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-bold uppercase tracking-wider mt-1 transition-colors">
        {{ showFull ? 'Show less' : 'Read more' }}
      </button>
    </div>

    <!-- Comments toggle row -->
    <div class="px-6 pt-3 pb-1">
      <button @click="showComments = !showComments"
        class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mb-3">
        <MessageSquare :size="12" />
        <span class="font-bold">{{ commentCount(talent) }} {{ commentCount(talent) === 1 ? 'comment' : 'comments'
          }}</span>
        <ChevronDown :size="12" :class="['transition-transform duration-200', showComments ? 'rotate-180' : '']" />
      </button>
    </div>

    <!-- Comments drawer -->
    <Transition name="expand">
      <div v-if="showComments" class="px-6 pb-5">
        <!-- Existing comments -->
        <div v-if="commentCount(talent)" class="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
          <div v-for="comment in talent.comments" :key="comment.id"
            class="bg-slate-100 dark:bg-slate-800/60 rounded-xl px-3 py-2 text-sm flex gap-2">
            <span class="text-purple-600 dark:text-purple-400 font-bold text-[10px] shrink-0 mt-0.5">{{ comment.userName
              }}</span>
            <span class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">{{ comment.text }}</span>
          </div>
        </div>
        <p v-else class="text-xs text-slate-400 dark:text-slate-600 mb-3 italic">No comments yet. Be first.</p>

        <!-- Input -->
        <div class="flex gap-2">
          <input ref="commentInput" v-model="commentText" type="text" placeholder="Add your take..." maxlength="280"
            class="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-purple-500 outline-none placeholder-slate-400 dark:placeholder-slate-600"
            @keydown.enter="$emit('add-comment', talent.id, commentText); commentText = ''" />
          <button @click="$emit('add-comment', talent.id, commentText); commentText = ''"
            class="bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded-lg transition-colors shrink-0">
            <Send :size="14" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 400px;
}
</style>
