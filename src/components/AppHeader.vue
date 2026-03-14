<script setup>
import { Globe, Plus, Sun, Moon } from 'lucide-vue-next'

defineProps({ showForm: Boolean, isDark: Boolean })
defineEmits(['toggle-form', 'toggle-theme'])
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div>
      <div class="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold mb-2">
        <Globe :size="16" />
        <span>LIVE COMMUNITY AUDIT</span>
      </div>
      <h1 class="text-5xl font-black bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
        The Talent Audit
      </h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">See the weirdest skills from around the world.</p>
      <nav aria-label="Quick links" class="mt-3 flex flex-wrap items-center gap-3 text-sm" hidden>
        <a href="#stats" class="text-slate-600 dark:text-slate-300 hover:underline">Stats</a>
        <a href="#submit" class="text-slate-600 dark:text-slate-300 hover:underline">Submit</a>
        <a href="#feed" class="text-slate-600 dark:text-slate-300 hover:underline">Feed</a>
        <a href="#about" class="text-slate-600 dark:text-slate-300 hover:underline">About</a>
      </nav>
    </div>
    <div class="flex items-center gap-3">
      <button
        @click="$emit('toggle-theme')"
        class="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Sun v-if="isDark" :size="18" />
        <Moon v-else :size="18" />
      </button>
      <button
        @click="$emit('toggle-form')"
        class="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-full font-bold text-white shadow-lg shadow-purple-600/20 dark:shadow-purple-900/20"
      >
        <template v-if="showForm">Cancel</template>
        <template v-else><Plus :size="20" /> Share Your Talent</template>
      </button>
    </div>
  </div>
</template>
