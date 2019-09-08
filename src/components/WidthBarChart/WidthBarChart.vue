<template>
	<div>
		<monthCalendar :year='year' v-for="(n,index) in twelveList" :month='index+1' :state='n.state' @editClick="editClick"
		 class='month'></monthCalendar>
	</div>
</template>

<script>
	import monthCalendar from './monthCalendar'
	export default {
		name: 'WidthBarChart',
		components: {
			monthCalendar
		},
		props: {
			year: {
				type: [String, Number],
				default: new Date().getYear()
			},
			month: {
				type: [String, Number],
				default: new Date().getMonth() + 1
			},
			twelveList: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				monthList: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
				weekList: ['日', '一', '二', '三', '四', '五', '六'],
			}
		},
		computed: {
			monthTitle() {
				return this.monthList[this.month - 1]
			},
			initCalendar() {
				let monthDays = new Date(this.year, this.month, 0).getDate(); //每个月有多少天
				let weekDay = new Date(this.year, this.month - 1, 1).getDay(); //每个月第一天是星期几
				let weeks = Math.ceil((weekDay + monthDays) / 7); //每个月有几个周
				console.log('monthDays', monthDays);
				console.log('weekDay', weekDay);
				console.log('weeks', weeks);
				let days = [];
				let day = 0;

				for (let i = 0; i < weeks; i++) { //代表一个月中的第几周
					days[i] = [];
					for (let j = 0; j < 7; j++) { //代表星期几
						if (i == 0 & j >= weekDay | (i > 0 & day < monthDays)) {
							day++;
							days[i][j] = day;
						} else {
							days[i][j] = '*';
						}
					}
				}
				console.log(days);
				return days;
			}
		},
		methods: {
			editClick(data){
				this.$emit('editClick',data.substr(0,2))
			},
		},
		created() {}
	}
</script>

<style scoped>
	.week li {
		float: left;
		width: 14.28%;
		text-align: center;
		/* border: 1px solid #ccc; */
	}

	.day li {
		float: left;
		width: 14.28%;
		text-align: center;
		/* border: 1px solid #ccc; */
	}

	.month {
		width: 16.66%;
		float: left;
		padding: 0 20px;
	}
</style>
