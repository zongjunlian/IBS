<template>
	<div class="container_month">
		<div class="calendar">
			<div class="calendar_title">
				<span class="mr20">{{state}}</span>
				{{ monthTitle }}
				<span @click="editClick" class="ml20">{{'编辑'}}</span>
			</div>
			<div class="calendar_body">
				<div class="week">
					<ul class="clearfix">
						<li v-for="item in weekList">{{item}}</li>
					</ul>
				</div>
				<div class="dayBox">
					<ul class="clearfix" v-for="item in initCalendar">
						<li v-for="child in item">
							<span class="day">{{child}}</span>
						</li>
					</ul>
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>
	export default {
		name: 'monthCalendar',
		components: {

		},
		props: {
			state: {
			  type: String,
			  default: ''
			},
			year: {
				type: [String, Number],
				default: new Date().getYear()
			},
			month: {
				type: [String, Number],
				default: new Date().getMonth() + 1
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
// 				console.log('year', this.year);
// 				console.log('month', this.month);
// 				console.log('monthDays', monthDays);
// 				console.log('weekDay', weekDay);
// 				console.log('weeks', weeks);
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
				// console.log(days);
				return days;
			}
		},
		methods: {
			editClick(){
				 this.$emit('editClick',this.monthTitle)
			},
			
		},
		created() {
		}
	}
</script>

<style scoped>
	.container_month{
		padding: 8px;
	}
	.calendar {
		background-color: #fff;
    min-height: 295px;
    text-align: center;
    color: rgba(53,60,70,0.8);
    border-radius: 2px;
    min-width: 0;
    position: relative;
    text-decoration: none;
    -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);
    -webkit-transition: -webkit-transform 0.3s ease;
    transition: -webkit-transform 0.3s ease;
    transition: transform 0.3s ease;
    transition: transform 0.3s ease, -webkit-transform 0.3s ease;
	}
.calendar:hover {
    -webkit-transform: scale(1.15);
    transform: scale(1.15);
    -webkit-box-shadow: 0 7px 21px 0 rgba(0,0,0,0.1);
    box-shadow: 0 7px 21px 0 rgba(0,0,0,0.1);
}

	.calendar:hover {
		z-index: 2;
	}

	.calendar_title {
		font-weight: bold;
		-webkit-box-flex: 100%;
		-ms-flex: 100%;
		flex: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		border-bottom: 1px solid rgba(196, 196, 196, 0.3);
		font-size: 18px;
		height: 50px;
		margin-bottom: 12px;
	}

	.calendar_body {
    padding: 0px 20px;
    min-width: 194px;
	}

	.week li {
		float: left;
		width: 14.28%;
		text-align: center;
		/* border: 1px solid #ccc; */
	}

	.dayBox li {
		float: left;
		width: 14.28%;
		text-align: center;
		align-items: center;
		font-size: 16px;
		height: 31px;
		color: #5db3d4;
	}
	.day{
		font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 22px;
    height: 22px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    border-radius: 5px;
	}
	.day:hover{
		background-color: rgba(102,102,102,0.1);
    border-radius: 5px;
	}
</style>
