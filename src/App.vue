<script setup>
import { ref, nextTick } from 'vue'
import { useTalents } from '@/composables/useTalents.js'
import AppHeader from '@/components/AppHeader.vue'
import StatsGrid from '@/components/StatsGrid.vue'
import TalentForm from '@/components/TalentForm.vue'
import TalentFeed from '@/components/TalentFeed.vue'
import AppFooter from '@/components/AppFooter.vue'

const showForm = ref(false)
const focusedId = ref(null)
const { user, talents, loading, avgPointlessness, totalUpvotes, addTalent, upvote, addComment } = useTalents()

async function handleSubmit(payload) {
  const { duplicate } = await addTalent(payload)
  if (duplicate) {
    // Close form, highlight existing card, scroll to it
    showForm.value = false
    focusedId.value = duplicate.id
    await nextTick()
    document.getElementById(`talent-${duplicate.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    showForm.value = false
    focusedId.value = null
  }
}

function handleAddComment(talentId, text) {
  addComment(talentId, text)
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
    <div class="max-w-4xl mx-auto">
      <AppHeader :show-form="showForm" @toggle-form="showForm = !showForm" />
      <StatsGrid
        :count="talents.length"
        :avg-pointlessness="avgPointlessness"
        :total-upvotes="totalUpvotes"
      />
      <Transition name="slide-down">
        <TalentForm v-if="showForm" @submit="handleSubmit" @cancel="showForm = false" />
      </Transition>
      <TalentFeed
        :talents="talents"
        :loading="loading"
        :user="user"
        :focused-id="focusedId"
        @upvote="upvote"
        @add-comment="handleAddComment"
      />
      <AppFooter />
    </div>
  </div>
</template>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
