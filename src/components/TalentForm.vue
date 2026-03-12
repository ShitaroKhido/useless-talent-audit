<script setup>
import { reactive } from 'vue'
import { Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ name: '', description: '', uselessness: 50 })

function handleSubmit() {
  if (!form.name.trim()) return
  emit('submit', {
    name: form.name.trim(),
    description: form.description.trim(),
    uselessness: form.uselessness,
    pride: Math.floor(Math.random() * 40) + 60,
  })
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl mb-8">
    <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-purple-600 dark:text-purple-400">
      <Sparkles :size="20" /> Add to Global Records
    </h2>

    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="What's your weird skill?"
        class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 rounded-lg p-3 focus:ring-2 ring-purple-500 outline-none w-full"
      />
      <div class="flex flex-col">
        <label class="text-xs text-slate-500 mb-1 ml-1">
          Uselessness: {{ form.uselessness }}%
        </label>
        <input
          v-model.number="form.uselessness"
          type="range"
          min="0"
          max="100"
          class="accent-purple-500 h-10 w-full cursor-pointer"
        />
      </div>
    </div>

    <textarea
      v-model="form.description"
      placeholder="Why is this impressive yet entirely useless?"
      class="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 rounded-lg p-3 h-24 mb-4 focus:ring-2 ring-purple-500 outline-none resize-none"
    />

    <button
      @click="handleSubmit"
      class="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-500 transition-colors"
    >
      Post to Public Audit
    </button>
  </div>
</template>
