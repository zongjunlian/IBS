<template>
	<div>
		<div class="title">
				{{month}}
		</div>
		<div class="content">
			<div class="week">
				<ul>
					<li v-for="item in weekList">{{item}}</li>
				</ul>
			</div>
			<div class="day">
				<ul v-for="item in initCalendar">
					<li v-for="child in item">{{child}}</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'analysis',
		components: {

		},
		data(){
			return {
				year:2009,
				month:2,
				weekList: [ '日','一', '二', '三', '四', '五', '六'],
			}
		},
		computed: {
			initCalendar() {
				let monthDays=new Date(this.year,this.month,0).getDate();//每个月有多少天
				let weekDay=new Date(this.year,this.month-1,1).getDay();//每个月第一天是星期几
				let weeks=Math.ceil((weekDay+monthDays)/7);//每个月有几个周
				let days=[];
				let day=0;
				
				for(let i=0;i<weeks;i++){//代表一个月中的第几周
					days[i]=[];
					for(let j=0;j<7;j++){//代表星期几
						if(i==0 & j>=weekDay | (i>0 & day<monthDays)){
							day++;
							days[i][j]=day;
						}else{
							days[i][j]='';
						}
					}
				}
				return days;
			}
		},
		methods: {
// 			initCalendar() {
// 				
// 				// console.log(days);
// 				
// 			}
		},
		created(){
			// this.initCalendar()
		}
	}
</script>

<style scoped>
.week li{
	float: left;
	width:14.28%;
	text-align: center;
	/* border: 1px solid #ccc; */
}
.day li{
	float: left;
	width:14.28%;
	text-align: center;
	/* border: 1px solid #ccc; */
}
</style>
