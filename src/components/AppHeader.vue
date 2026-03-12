<script setup>
import { Globe, Plus } from 'lucide-vue-next'

defineProps({ showForm: Boolean })
defineEmits(['toggle-form'])
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div>
      <div class="flex items-center gap-2 text-purple-400 font-bold mb-2">
        <Globe :size="16" />
        <span>LIVE COMMUNITY AUDIT</span>
      </div>
      <h1 class="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
        The Talent Audit
      </h1>
      <p class="text-slate-400 text-lg">See the weirdest skills from around the world.</p>
    </div>
    <button
      @click="$emit('toggle-form')"
      class="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-full font-bold shadow-lg shadow-purple-900/20"
    >
      <template v-if="showForm">Cancel</template>
      <template v-else><Plus :size="20" /> Share Your Talent</template>
    </button>
  </div>
</template>
