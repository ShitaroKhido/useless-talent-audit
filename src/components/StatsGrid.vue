<script setup>
import { Users, Zap, Heart } from 'lucide-vue-next'

defineProps({
  count: { type: Number, required: true },
  avgPointlessness: { type: Number, required: true },
  totalUpvotes: { type: Number, required: true },
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <div class="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
        <Users :size="80" />
      </div>
      <div class="text-3xl font-bold mb-1">{{ count }}</div>
      <div class="text-slate-500 text-sm uppercase tracking-wider font-bold">Talents Logged</div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
        <Zap :size="80" />
      </div>
      <div class="text-3xl font-bold mb-1">{{ avgPointlessness }}%</div>
      <div class="text-slate-500 text-sm uppercase tracking-wider font-bold">Avg. Pointlessness</div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
        <Heart :size="80" />
      </div>
      <div class="text-3xl font-bold mb-1">{{ totalUpvotes }}</div>
      <div class="text-slate-500 text-sm uppercase tracking-wider font-bold">Total Recognition</div>
    </div>
  </div>
</template>
