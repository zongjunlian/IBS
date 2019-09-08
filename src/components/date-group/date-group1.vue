<template>
  <Row style="width:100%">
    <Col span="10" :offset="1">
      <DatePicker :editable='false' :size="size" :type="type" placeholder="请选择起始时间" @on-change='startTimeChange' :options="startTimeOption"></DatePicker>
    </Col>
    <Col span="10" :offset="1">
      <DatePicker :editable='false' :size="size" :type="type" placeholder="请选择结束时间" @on-change='endTimeChange' :options="endTimeOption"></DatePicker>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'DateGroup',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    size: {
      type: String,
      default: 'large'
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      start: this.startTime,
      end: this.endTime,
      startTimeOption: {},
      endTimeOption: {}
    }
  },

  created () {
    this.startTimeChange()
    this.endTimeChange()
  },

  methods: {
    startTimeChange(timeStart) {
      this.start = timeStart
      this.endTimeOption = {
        disabledDate (endDate) {
          return endDate && (endDate < new Date(new Date(timeStart).getTime() - 86400000) || endDate > Date.now())
        }
      }
    },

    endTimeChange(timeEnd) {
      this.end = timeEnd
      this.startTimeOption = {
        disabledDate (startDate) {
          return startDate && (startDate > new Date(timeEnd) || startDate > Date.now())
        }
      }
    }
  },

  watch: {
    start: function(val, oldVal) {
      if(!val) {
        this.$emit('update:startTime', '')
      }else{
        this.$emit('update:startTime', this.start)
      }
    },

    end: function(val, oldVal) {
      if(!val && !this.start) {
        this.$emit('update:endTime', '')
      }else{
        this.$emit('update:endTime', this.end)
      }
    }
  }
}
</script>
