<script setup>
import { Brain, MessageSquare } from 'lucide-vue-next'
import TalentCard from './TalentCard.vue'

defineProps({
  talents: { type: Array, required: true },
  loading: { type: Boolean, required: true },
  user: { type: Object, default: null },
  focusedId: { type: String, default: null },
})
defineEmits(['upvote', 'add-comment'])
</script>

<template>
  <div class="space-y-6">
    <!-- Feed header -->
    <div class="flex items-center justify-between px-2">
      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <MessageSquare :size="14" /> Global Feed
      </h3>
      <span v-if="user" class="text-[10px] text-slate-600 px-2 py-1 rounded">
        UID: {{ user.uid }}
      </span>
    </div>

    <!-- Loading spinner -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
      <div class="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p class="text-slate-500 animate-pulse">Scanning global absurdity...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="talents.length === 0"
      class="text-center py-20 bg-slate-100 dark:bg-slate-900/20 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
      <Brain :size="48" class="mx-auto mb-4 text-slate-400 dark:text-slate-700" />
      <p class="text-slate-400 dark:text-slate-500">No talents logged yet. Be the first to start the audit.</p>
    </div>

    <!-- Cards -->
    <TransitionGroup v-else name="list" tag="div" class="space-y-6">
      <TalentCard v-for="talent in talents" :key="talent.id" :talent="talent" :focused="talent.id === focusedId"
        @upvote="$emit('upvote', $event)" @add-comment="(id, text) => $emit('add-comment', id, text)" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
