<template>
  <div class="archive-redirect"></div>
</template>

<script>
export default {
  name: 'ArchiveRedirect',
  middleware({ redirect }) {
    return redirect('/resume')
  },
  mounted() {
    this.$router.replace('/resume')
  },
}
</script>
