<script setup>
import { Trophy } from 'lucide-vue-next'
</script>

<template>
  <div class="mt-12 p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950 border border-indigo-500/20">
    <div class="flex items-center gap-4 mb-4">
      <div class="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
        <Trophy :size="24" />
      </div>
      <div>
        <h4 class="font-bold text-lg">The Wall of Pointless Fame</h4>
        <p class="text-sm text-slate-400 italic">Every vote adds 1 point of validity to an invalid skill.</p>
      </div>
    </div>
    <div class="text-xs text-indigo-300 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/10 leading-relaxed">
      <strong>Community Mandate:</strong> This is a collaborative effort to map the human experience through
      its most insignificant capabilities. Please only log talents that would serve zero purpose in a survival situation.
    </div>
  </div>
</template>
