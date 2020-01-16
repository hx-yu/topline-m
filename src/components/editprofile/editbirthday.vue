<template>
  <div>
      <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="编辑生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="$emit('onsave',currentDate)"
    />
  </div>
</template>

<script>
export default {
  name: 'EditBirthday',
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
