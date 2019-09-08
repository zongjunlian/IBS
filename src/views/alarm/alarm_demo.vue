<template>
  <div>
	  <DateGroup v-model="year" :activeDates.sync="activeDates" @toggleDate="toggleDate" prefixClass="your_customized_wrapper_class"
	   :activeClass="activeClass"
	   :showYearSelector="false"
	   :lang='"tw"'
		 :twelveList='twelveList'
	   ></DateGroup>
  </div>
</template>
<script>
export default {
  data () {
    return {
			twelveList:[
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:'已完成'},
				{state:''},
				{state:''}
			],
      year: 2018,
      activeDates: [{
      		date: '2019-02-13'
      	},
      	{
      		date: '2019-02-14',
      		className: 'red'
      	},
      	{
      		date: '2019-02-15',
      		className: 'blue'
      	},
      	{
      		date: '2019-02-16',
      		className: 'your_customized_classname'
      	}
      ],
      activeClass: '',
    }
  },
  methods: {
  	toggleDate(dateInfo) {
  		// console.log(dateInfo) // { date: '2010-10-23', selected: true }
  	}
  },
  mounted () {
  
}
}
</script>