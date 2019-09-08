<template>
  <div>
	  <WidthBarChart :year='year' :twelveList='twelveList' @editClick='editClick'></WidthBarChart>
  </div>
</template>
<script>
export default {
  data () {
    return {
			year:2018,
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
    }
  },
  methods: {
  	editClick(data){
			console.log('editClick',this.year+'-'+data);
		}
  },
  mounted () {
  
}
}
</script>