<script setup>
import { Trophy, Coffee, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <footer class="mt-12 space-y-4">
    <!-- Wall of Pointless Fame -->
    <div
      class="p-8 rounded-3xl bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-950 border border-indigo-200 dark:border-indigo-500/20">
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <Trophy :size="24" />
        </div>
        <div>
          <h4 class="font-bold text-lg text-slate-800 dark:text-slate-100">The Wall of Pointless Fame</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400 italic">Every vote adds 1 point of validity to an invalid
            skill.</p>
        </div>
      </div>
      <div
        class="text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-500/10 p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/10 leading-relaxed">
        <strong>Community Mandate:</strong> This is a collaborative effort to map the human experience through
        its most insignificant capabilities. Please only log talents that would serve zero purpose in a survival
        situation.
      </div>
    </div>

    <!-- Donation section -->
    <div
      class="p-6 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 border border-amber-200 dark:border-amber-500/20 flex flex-col sm:flex-row items-center gap-6">
      <div class="flex items-center gap-4 flex-1">
        <div class="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0">
          <Coffee :size="24" />
        </div>
        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-100">Enjoyed the absurdity?</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Love this pointless project?</p>
        </div>
      </div>
      <a href="https://ko-fi.com/pagnakhid" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0">
        <Coffee :size="16" /> Buy Me a Coffee
        <ExternalLink :size="14" />
      </a>
    </div>

    <!-- Credit + License -->
    <div class="text-center text-xs text-slate-400 dark:text-slate-500 pb-4 space-y-1">
      <p>
        Made with <span class="text-pink-500 dark:text-pink-400">♥</span> by
        <span class="font-semibold text-slate-600 dark:text-slate-300">Khid</span>
      </p>
      <p>
        Released under the
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >MIT License</a>
        &mdash; Copyright &copy; 2026 Khid
      </p>
    </div>
  </footer>
</template>
