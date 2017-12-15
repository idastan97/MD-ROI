//главная страница (РОЙ)
import React from 'react';
import axios from 'axios';
import style from '../../public/css/style.css';

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state={
			yandexWeekShows: '-',
			yandexWeekClicks: '-',
			yandexDayShows: '-',
			yandexDayClicks: '-',
			yandexWeekReaches: '-',
			yandexDayReaches: '-',
			yandexCampaigns: '-',
			yandexWeekSpent: '-',
			yandexDaySpent: '-',
			yandexWeekCPC: '-',
			yandexDayCPC: '-',
			yandexWeekCPA: '-',
			yandexDayCPA: '-',
			yandexWeekCTR: '-',
			yandexDayCTR: '-',
			yandexWeekCVR: '-',
			yandexDayCVR: '-',

			fbWeekShows: '-',
			fbWeekClicks: '-',
			fbDayShows: '-',
			fbDayClicks: '-',
			facebookWeekReaches: '-',
			facebookDayReaches: '-',
			fbAdsCampaigns: '-',
			fbWeekSpent: '-',
			fbDaySpent: '-',
			fbWeekCPC: '-',
			fbDayCPC: '-',
			fbWeekCPA: '-',
			fbDayCPA: '-',
			fbWeekCTR: '-',
			fbDayCTR: '-',
			fbWeekCVR: '-',
			fbDayCVR: '-',

			instaWeekShows: '-',
			instaWeekClicks: '-',
			instaDayShows: '-',
			instaDayClicks: '-',
			instaWeekReaches: '-',
			instaDayReaches: '-',
			instaCampaigns: '-',
			instaWeekSpent: '-',
			instaDaySpent: '-',
			instaWeekCPC: '-',
			instaDayCPC: '-',
			instaWeekCPA: '-',
			instaDayCPA: '-',
			instaWeekCTR: '-',
			instaDayCTR: '-',
			instaWeekCVR: '-',
			instaDayCVR: '-',

			totalWeekCTR: '-',
			totalWeekCVR: '-',
			totalWeekCPC: '-',
			totalWeekCPA: '-',
			weekRejects: '-',
			weekReaches: '-',

			yandexBudget: '-',
			fbBudget: '-',
			instaBudget: '-',
			deals: '-',
			yandexLeft: '-',
			fbLeft: '-',
			InstaLeft: '-',

			loading: false, //загрузка идет или нет
			counters: []
		}
		this.getStat = this.getStat.bind(this);
	}

  // Метод для получения данных с сервера
	getStat(selected){
		this.setState({loading: true});
		if (selected==='all'){ //параметр равно all то загружаем статистику по всем проектам
			axios.get('/api/getdata',{
	        }).then((res) => {
						console.log(res.data);
	            this.setState({
								yandexWeekShows: res.data.yandexWeekShows,
								yandexWeekClicks: res.data.yandexWeekClicks,
								yandexDayShows: res.data.yandexDayShows,
								yandexDayClicks: res.data.yandexDayClicks,
								yandexWeekReaches: res.data.yandexWeekReaches,
								yandexDayReaches: res.data.yandexDayReaches,
								yandexCampaigns: res.data.yandexCampaigns,
								yandexWeekSpent: res.data.yandexWeekSpent,
								yandexDaySpent: res.data.yandexDaySpent,
								yandexWeekCPC: Number(res.data.yandexWeekClicks>0 ? res.data.yandexWeekSpent/res.data.yandexWeekClicks : 0).toFixed(3),
								yandexDayCPC: Number(res.data.yandexDayClicks>0 ? res.data.yandexDaySpent/res.data.yandexDayClicks : 0).toFixed(3),
								yandexWeekCPA: Number(res.data.yandexWeekReaches>0 ? res.data.yandexWeekSpent/res.data.yandexWeekReaches : 0).toFixed(3),
								yandexDayCPA: Number(res.data.yandexDayReaches>0 ? res.data.yandexDaySpent/res.data.yandexDayReaches : 0).toFixed(3),
								yandexWeekCTR: Number(res.data.yandexWeekShows>0 ? res.data.yandexWeekClicks*100/res.data.yandexWeekShows : 0).toFixed(3),
								yandexDayCTR: Number(res.data.yandexDayShows>0 ? res.data.yandexDayClicks*100/res.data.yandexDayShows : 0).toFixed(3),
								yandexWeekCVR: Number(res.data.yandexWeekClicks>0 ? res.data.yandexWeekReaches*100/res.data.yandexWeekClicks : 0).toFixed(3),
								yandexDayCVR: Number(res.data.yandexDayClicks>0 ? res.data.yandexDayReaches*100/res.data.yandexDayClicks : 0).toFixed(3),

								fbWeekShows: res.data.fbWeekShoWeek,
								fbWeekClicks: res.data.fbWeekClicks,
								fbDayShows: res.data.fbDayShows,
								fbDayClicks: res.data.fbDayClicks,
								facebookWeekReaches: res.data.facebookWeekReaches,
								facebookDayReaches: res.data.facebookDayReaches,
								fbAdsCampaigns: res.data.fbAdsCampaigns,
								fbWeekSpent: res.data.fbWeekSpent,
								fbDaySpent: res.data.fbDaySpent,
								fbWeekCPC: Number(res.data.fbWeekClicks>0 ? res.data.fbWeekSpent/res.data.fbWeekClicks : 0).toFixed(3),
								fbDayCPC: Number(res.data.fbDayClicks>0 ? res.data.fbDaySpent/res.data.fbDayClicks : 0).toFixed(3),
								fbWeekCPA: Number(res.data.facebookWeekReaches>0 ? res.data.fbWeekSpent/res.data.facebookWeekReaches : 0).toFixed(3),
								fbDayCPA: Number(res.data.facebookDayReaches>0 ? res.data.fbDaySpent/res.data.facebookDayReaches : 0).toFixed(3),
								fbWeekCTR: Number(res.data.fbWeekShows>0 ? res.data.fbWeekClicks*100/res.data.fbWeekShows : 0).toFixed(3),
								fbDayCTR: Number(res.data.fbDayShows>0 ? res.data.fbDayClicks*100/res.data.fbDayShows : 0).toFixed(3),
								fbWeekCVR: Number(res.data.fbWeekClicks>0 ? res.data.facebookWeekReaches*100/res.data.fbWeekClicks : 0).toFixed(3),
								fbDayCVR: Number(res.data.fbDayClicks>0 ? res.data.facebookDayReaches*100/res.data.fbDayClicks : 0).toFixed(3),

								instaWeekShows: res.data.instaWeekShows,
								instaWeekClicks: res.data.instaWeekClicks,
								instaDayShows: res.data.instaDayShows,
								instaDayClicks: res.data.instaDayClicks,
								instaWeekReaches: res.data.instaWeekReaches,
								instaDayReaches: res.data.instaDayReaches,
								instaCampaigns: res.data.instaCampaigns,
								instaWeekSpent: res.data.instaWeekSpent,
								instaDaySpent: res.data.instaDaySpent,
								instaWeekCPC: Number(res.data.instaWeekClicks>0 ? res.data.instaWeekSpent/res.data.instaWeekClicks : 0).toFixed(3),
								instaDayCPC: Number(res.data.instaDayClicks>0 ? res.data.instaDaySpent/res.data.instaDayClicks : 0).toFixed(3),
								instaWeekCPA: Number(res.data.instaWeekReaches>0 ? res.data.instaWeekSpent/res.data.instaWeekReaches : 0).toFixed(3),
								instaDayCPA: Number(res.data.instaDayReaches>0 ? res.data.instaDaySpent/res.data.instaDayReaches : 0).toFixed(3),
								instaWeekCTR: Number(res.data.instaWeekShows>0 ? res.data.instaWeekClicks*100/res.data.instaWeekShows : 0).toFixed(3),
								instaDayCTR: Number(res.data.instaDayShows>0 ? res.data.instaDayClicks*100/res.data.instaDayShows : 0).toFixed(3),
								instaWeekCVR: Number(res.data.instaWeekClicks>0 ? res.data.instaWeekReaches*100/res.data.instaWeekClicks : 0).toFixed(3),
								instaDayCVR: Number(res.data.instaDayClicks>0 ? res.data.instaDayReaches*100/res.data.instaDayClicks : 0).toFixed(3),

								totalWeekCTR: Number((res.data.yandexWeekShows+res.data.fbWeekShows+res.data.instaWeekShows)>0 ? (res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks)*100/(res.data.yandexWeekShows+res.data.fbWeekShows+res.data.instaWeekShows) : 0).toFixed(2),
								totalWeekCVR: Number((res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks)>0 ? (res.data.yandexWeekReaches+res.data.facebookWeekReaches+res.data.instaWeekReaches)*100/(res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks) : 0).toFixed(1),
								totalWeekCPC: Number((res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks)>0 ? (res.data.yandexWeekSpent+res.data.fbWeekSpent+res.data.instaWeekSpent)/(res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks) : 0).toFixed(2),
								totalWeekCPA: Number((res.data.yandexWeekReaches+res.data.facebookWeekReaches+res.data.instaWeekReaches)>0 ? (res.data.yandexWeekSpent+res.data.fbWeekSpent+res.data.instaWeekSpent)/(res.data.yandexWeekReaches+res.data.facebookWeekReaches+res.data.instaWeekReaches) : 0).toFixed(1),
								weekRejects: res.data.weekRejects,
								weekReaches: res.data.yandexWeekReaches+res.data.instaWeekReaches+res.data.facebookWeekReaches,
								loading: false,
								yandexBudget: res.data.yandexBudget,
								fbBudget: res.data.fbBudget,
								instaBudget: res.data.instaBudget,
								yandexLeft: res.data.yandexBudget-res.data.yandexWeekSpent,
								fbLeft: res.data.fbBudget-res.data.fbWeekSpent,
								InstaLeft: res.data.instaBudget-res.data.instaWeekSpent,
								deals: res.data.deals
			        });
	        });
		} else { //если не все проекты то загружаем только выбранный проект (передаем аиди счетчика (проекта) как аргумент пост запроса к серверу)
			axios.post('/api/getcounterdata',{
						counter: this.state.counters[selected]._id //selected - индекс выбранного счетчика (проекта)
	        }).then((res) => {
						console.log(res.data);
	            this.setState({
								yandexWeekShows: res.data.yandexWeekShows,
								yandexWeekClicks: res.data.yandexWeekClicks,
								yandexDayShows: res.data.yandexDayShows,
								yandexDayClicks: res.data.yandexDayClicks,
								yandexWeekReaches: res.data.yandexWeekReaches,
								yandexDayReaches: res.data.yandexDayReaches,
								yandexCampaigns: res.data.yandexCampaigns,
								yandexWeekSpent: res.data.yandexWeekSpent,
								yandexDaySpent: res.data.yandexDaySpent,
								//проверям на ноль, на ноль делить нельзя
								yandexWeekCPC: Number(res.data.yandexWeekClicks>0 ? res.data.yandexWeekSpent/res.data.yandexWeekClicks : 0).toFixed(3),
								yandexDayCPC: Number(res.data.yandexDayClicks>0 ? res.data.yandexDaySpent/res.data.yandexDayClicks : 0).toFixed(3),
								yandexWeekCPA: Number(res.data.yandexWeekReaches>0 ? res.data.yandexWeekSpent/res.data.yandexWeekReaches : 0).toFixed(3),
								yandexDayCPA: Number(res.data.yandexDayReaches>0 ? res.data.yandexDaySpent/res.data.yandexDayReaches : 0).toFixed(3),
								yandexWeekCTR: Number(res.data.yandexWeekShows>0 ? res.data.yandexWeekClicks*100/res.data.yandexWeekShows : 0).toFixed(3),
								yandexDayCTR: Number(res.data.yandexDayShows>0 ? res.data.yandexDayClicks*100/res.data.yandexDayShows : 0).toFixed(3),
								yandexWeekCVR: Number(res.data.yandexWeekClicks>0 ? res.data.yandexWeekReaches*100/res.data.yandexWeekClicks : 0).toFixed(3),
								yandexDayCVR: Number(res.data.yandexDayClicks>0 ? res.data.yandexDayReaches*100/res.data.yandexDayClicks : 0).toFixed(3),

								fbWeekShows: res.data.fbWeekShoWeek,
								fbWeekClicks: res.data.fbWeekClicks,
								fbDayShows: res.data.fbDayShows,
								fbDayClicks: res.data.fbDayClicks,
								facebookWeekReaches: res.data.facebookWeekReaches,
								facebookDayReaches: res.data.facebookDayReaches,
								fbAdsCampaigns: res.data.fbAdsCampaigns,
								fbWeekSpent: res.data.fbWeekSpent,
								fbDaySpent: res.data.fbDaySpent,
								fbWeekCPC: Number(res.data.fbWeekClicks>0 ? res.data.fbWeekSpent/res.data.fbWeekClicks : 0).toFixed(3),
								fbDayCPC: Number(res.data.fbDayClicks>0 ? res.data.fbDaySpent/res.data.fbDayClicks : 0).toFixed(3),
								fbWeekCPA: Number(res.data.facebookWeekReaches>0 ? res.data.fbWeekSpent/res.data.facebookWeekReaches : 0).toFixed(3),
								fbDayCPA: Number(res.data.facebookDayReaches>0 ? res.data.fbDaySpent/res.data.facebookDayReaches : 0).toFixed(3),
								fbWeekCTR: Number(res.data.fbWeekShows>0 ? res.data.fbWeekClicks*100/res.data.fbWeekShows : 0).toFixed(3),
								fbDayCTR: Number(res.data.fbDayShows>0 ? res.data.fbDayClicks*100/res.data.fbDayShows : 0).toFixed(3),
								fbWeekCVR: Number(res.data.fbWeekClicks>0 ? res.data.facebookWeekReaches*100/res.data.fbWeekClicks : 0).toFixed(3),
								fbDayCVR: Number(res.data.fbDayClicks>0 ? res.data.facebookDayReaches*100/res.data.fbDayClicks : 0).toFixed(3),

								instaWeekShows: res.data.instaWeekShows,
								instaWeekClicks: res.data.instaWeekClicks,
								instaDayShows: res.data.instaDayShows,
								instaDayClicks: res.data.instaDayClicks,
								instaWeekReaches: res.data.instaWeekReaches,
								instaDayReaches: res.data.instaDayReaches,
								instaCampaigns: res.data.instaCampaigns,
								instaWeekSpent: res.data.instaWeekSpent,
								instaDaySpent: res.data.instaDaySpent,
								instaWeekCPC: Number(res.data.instaWeekClicks>0 ? res.data.instaWeekSpent/res.data.instaWeekClicks : 0).toFixed(3),
								instaDayCPC: Number(res.data.instaDayClicks>0 ? res.data.instaDaySpent/res.data.instaDayClicks : 0).toFixed(3),
								instaWeekCPA: Number(res.data.instaWeekReaches>0 ? res.data.instaWeekSpent/res.data.instaWeekReaches : 0).toFixed(3),
								instaDayCPA: Number(res.data.instaDayReaches>0 ? res.data.instaDaySpent/res.data.instaDayReaches : 0).toFixed(3),
								instaWeekCTR: Number(res.data.instaWeekShows>0 ? res.data.instaWeekClicks*100/res.data.instaWeekShows : 0).toFixed(3),
								instaDayCTR: Number(res.data.instaDayShows>0 ? res.data.instaDayClicks*100/res.data.instaDayShows : 0).toFixed(3),
								instaWeekCVR: Number(res.data.instaWeekClicks>0 ? res.data.instaWeekReaches*100/res.data.instaWeekClicks : 0).toFixed(3),
								instaDayCVR: Number(res.data.instaDayClicks>0 ? res.data.instaDayReaches*100/res.data.instaDayClicks : 0).toFixed(3),

								totalWeekCTR: Number((res.data.yandexWeekShows+res.data.fbWeekShows+res.data.instaWeekShows)>0 ? (res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks)*100/(res.data.yandexWeekShows+res.data.fbWeekShows+res.data.instaWeekShows) : 0).toFixed(2),
								totalWeekCVR: Number((res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks)>0 ? (res.data.yandexWeekReaches+res.data.facebookWeekReaches+res.data.instaWeekReaches)*100/(res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks) : 0).toFixed(1),
								totalWeekCPC: Number((res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks)>0 ? (res.data.yandexWeekSpent+res.data.fbWeekSpent+res.data.instaWeekSpent)/(res.data.yandexWeekClicks+res.data.fbWeekClicks+res.data.instaWeekClicks) : 0).toFixed(2),
								totalWeekCPA: Number((res.data.yandexWeekReaches+res.data.facebookWeekReaches+res.data.instaWeekReaches)>0 ? (res.data.yandexWeekSpent+res.data.fbWeekSpent+res.data.instaWeekSpent)/(res.data.yandexWeekReaches+res.data.facebookWeekReaches+res.data.instaWeekReaches) : 0).toFixed(1),
								weekRejects: res.data.weekRejects,
								weekReaches: res.data.yandexWeekReaches+res.data.instaWeekReaches+res.data.facebookWeekReaches,
								loading: false,
								yandexBudget: res.data.yandexBudget,
								fbBudget: res.data.fbBudget,
								instaBudget: res.data.instaBudget,
								yandexLeft: res.data.yandexBudget-res.data.yandexWeekSpent,
								fbLeft: res.data.fbBudget-res.data.fbWeekSpent,
								instaLeft: res.data.instaBudget-res.data.instaWeekSpent,
								deals: res.data.deals
			        });
	        });
		}

	}
	componentWillMount(){
		axios.get('/api/counters')
			.then((res)=>{
				this.setState({counters: res.data});
			})
	}
	componentDidMount(){
		//запускаем гетСтат для всех счетчиков
		this.getStat('all');
		//запускаем сетИнтервал и сохраняем его в стейте
		var intervalFunc = setInterval(this.getStat('all'), 900000); // каждые 15 минут
		this.setState({inervalFunc: intervalFunc});
	}
	projectChange(event){
		//при изменении проекта (счетчика)
		//останавливаем предыдущий сетИнтервал
		clearInterval(this.state.intervalFunc);
		//запускаем новый сетИнтервал для выбранного проекта
		var intervalFunc = setInterval(this.getStat(event.target.value), 900000); //каждые 15 минут
		this.setState({ //пока данные загружаются, обнуяем статистику и ставим тру для лодинг (загрузка идет)
			intervalFunc: intervalFunc,

			yandexWeekShows: '-',
			yandexWeekClicks: '-',
			yandexDayShows: '-',
			yandexDayClicks: '-',
			yandexWeekReaches: '-',
			yandexDayReaches: '-',
			yandexCampaigns: '-',
			yandexWeekSpent: '-',
			yandexDaySpent: '-',
			yandexWeekCPC: '-',
			yandexDayCPC: '-',
			yandexWeekCPA: '-',
			yandexDayCPA: '-',
			yandexWeekCTR: '-',
			yandexDayCTR: '-',
			yandexWeekCVR: '-',
			yandexDayCVR: '-',

			fbWeekShows: '-',
			fbWeekClicks: '-',
			fbDayShows: '-',
			fbDayClicks: '-',
			facebookWeekReaches: '-',
			facebookDayReaches: '-',
			fbAdsCampaigns: '-',
			fbWeekSpent: '-',
			fbDaySpent: '-',
			fbWeekCPC: '-',
			fbDayCPC: '-',
			fbWeekCPA: '-',
			fbDayCPA: '-',
			fbWeekCTR: '-',
			fbDayCTR: '-',
			fbWeekCVR: '-',
			fbDayCVR: '-',

			instaWeekShows: '-',
			instaWeekClicks: '-',
			instaDayShows: '-',
			instaDayClicks: '-',
			instaWeekReaches: '-',
			instaDayReaches: '-',
			instaCampaigns: '-',
			instaWeekSpent: '-',
			instaDaySpent: '-',
			instaWeekCPC: '-',
			instaDayCPC: '-',
			instaWeekCPA: '-',
			instaDayCPA: '-',
			instaWeekCTR: '-',
			instaDayCTR: '-',
			instaWeekCVR: '-',
			instaDayCVR: '-',

			totalWeekCTR: '-',
			totalWeekCVR: '-',
			totalWeekCPC: '-',
			totalWeekCPA: '-',
			weekRejects: '-',
			weekReaches: '-',
			yandexBudget: '-',
			fbBudget: '-',
			instaBudget: '-',
			yandexLeft: '-',
			fbLeft: '-',
			InstaLeft: '-',
			deals: '-',
		});
	}
	render(){
		var outerThis=this;
    return (
      <div>
       <header className="header">
				 <select onChange={this.projectChange.bind(this)} style={{display: 'inline', backgroundColor: 'white', fontSize: '30px', margin: "5px", padding: "3px"}}>
					 <option value='all' >All</option>
				 { //список проектов
					 this.state.counters.map(function(counter, index){
						 return (
							 <option value={index} key={index}>
								 {counter.name}
							 </option>
						 )
					 })
				 }
				 </select>
				 <div style={{display: 'inline', color: 'white', fontSize: '40px'}}>{this.state.loading ? 'Loading...' : ''}</div>
         <span className="md"> MD ROI</span>
       </header>
       <div className="wrapper">
         <div className="grid">
           <div className="grid-item">
             <span className="grid-item--header">
               <div className="logo">
                 <img src="img/yandex.png" />
               </div>
               <div className="grid-item--header---title">
                 <span className="red_letter">Я</span>ндекс директ
               </div>
             </span>
             <div className="week">
               <span className="grid-item--week">
                 <span className="week-p">WEEK</span>
               </span>
               <span className="grid-item--week">
                 <span className="week-p">TODAY</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">{this.state.yandexCampaigns}</span>
                 <span className="grid-item--info"> СAMPAIGN</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">{this.state.yandexWeekClicks}</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">{this.state.yandexDayShows}</span>
                 <span className="grid-item--info"> SHOWS</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">{this.state.yandexDayClicks}</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">{this.state.yandexWeekCTR} %</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">{this.state.yandexWeekCVR} %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">{this.state.yandexDayCTR} %</span>
                 <span className="grid-item--info">  CtR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">{this.state.yandexDayCVR} %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
						 <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">{this.state.yandexWeekCPC}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">{this.state.yandexWeekCPA}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPA</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">{this.state.yandexDayCPC}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">{this.state.yandexDayCPA}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPA</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red1">
                 <span className="grid-item--number">{this.state.yandexBudget}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> BUDGET</span>
               </span>
               <span className="grid-item--line red2">
                 <span className="grid-item--number">{this.state.yandexWeekSpent}<span className="tenge">₸</span></span>
                 <span className="grid-item--info">   SPENT</span>
               </span>
               <span className="grid-item--line purple1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple2">
                 <span className="grid-item--number">{this.state.yandexLeft}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> LEFT</span>
               </span>
             </div>
           </div>
           <div className="grid-item">
             <span className="grid-item--header google">
               <div className="logo"><img src="img/google.png" /></div>
               <span className="grid-item--header---title google_word">
                 <span className="g"> G</span><span className="o1">o</span><span className="o2">o</span><span className="g">g</span><span className="l">l</span>e AdWords
               </span>
             </span>
             <div className="week">
               <span className="grid-item--week">
                 <span className="week-p">WEEK</span>
               </span>
               <span className="grid-item--week">
                 <span className="week-p">TODAY</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> СAMPAIGN</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> phrase</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info">  CtR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
						 <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info">  CtR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">- %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> BUDGET</span>
               </span>
               <span className="grid-item--line red2">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info">   SPENT</span>
               </span>
               <span className="grid-item--line purple1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple2">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> LEFT</span>
               </span>
             </div>

           </div>
           <div className="grid-item">
             <span className="grid-item--header facebook">
               <div className="logo"><img src="img/facebook.png" /></div>
               <span className="grid-item--header---title">FACEBOOK</span>
             </span>
             <div className="week">
               <span className="grid-item--week">
                 <span className="week-p">WEEK</span>
               </span>
               <span className="grid-item--week">
                 <span className="week-p">TODAY</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">{this.state.fbAdsCampaigns}</span>
                 <span className="grid-item--info"> СAMPAIGN</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">{this.state.fbWeekClicks}</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">{this.state.fbDayShows}</span>
                 <span className="grid-item--info"> SHOWS</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">{this.state.fbDayClicks}</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">{this.state.fbWeekCTR} %</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">{this.state.fbWeekCVR} %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">{this.state.fbDayCTR} %</span>
                 <span className="grid-item--info">  CTR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">{this.state.fbDayCVR} %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
						 <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">{this.state.fbWeekCPC}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">{this.state.fbWeekCPA}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPA</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">{this.state.fbDayCPC}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">{this.state.fbDayCPA}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPA</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red1">
                 <span className="grid-item--number">{this.state.fbBudget}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> BUDGET</span>
               </span>
               <span className="grid-item--line red2">
                 <span className="grid-item--number">{this.state.fbWeekSpent}<span className="tenge">₸</span></span>
                 <span className="grid-item--info">   SPENT</span>
               </span>
               <span className="grid-item--line purple1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple2">
                 <span className="grid-item--number">{this.state.fbLeft}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> LEFT</span>
               </span>
             </div>
           </div>
           <div className="grid-item">
             <span className="grid-item--header1">
               <span className="grid-item--header1---title">TOTAL WEEK</span>
             </span>
             <div className="ctr">
               <span className="grid-item--ctr ctr_red1">
                 <span className="grid-item--ctr--number">{this.state.totalWeekCTR}%</span>
                 <span className="grid-item--ctr--info"> CTR</span>
               </span>
               <span className="grid-item--ctr ctr_red2">
                 <span className="grid-item--ctr--number">{this.state.totalWeekCVR}%</span>
                 <span className="grid-item--ctr--info"> CVR</span>
               </span>
             </div>
             <div className="ctr">
               <span className="grid-item--ctr ctr_red3">
                 <span className="grid-item--ctr--number">{this.state.totalWeekCPC}₸</span>
                 <span className="grid-item--ctr--info"> CPC</span>
               </span>
               <span className="grid-item--ctr ctr_red4">
                 <span className="grid-item--ctr--number">{this.state.totalWeekCPA}₸</span>
                 <span className="grid-item--ctr--info"> CPA</span>
               </span>
             </div>
           </div>
           <div className="grid-item">
             <span className="grid-item--header vk">
               <div className="logo"><img src="img/vk.png" /></div>
               <span className="grid-item--header---title ">VK</span>
             </span>
             <div className="week">
               <span className="grid-item--week">
                 <span className="week-p">WEEK</span>
               </span>
               <span className="grid-item--week">
                 <span className="week-p">TODAY</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> СAMPAIGN</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> phrase</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info">  CtR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> BUDGET</span>
               </span>
               <span className="grid-item--line red2">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info">   SPENT</span>
               </span>
               <span className="grid-item--line purple1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple2">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> LEFT</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red3">
                 <span className="grid-item--number">-%<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line red4">
                 <span className="grid-item--number">-%<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CVR</span>
               </span>
               <span className="grid-item--line purple3">
                 <span className="grid-item--number">-%<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple4">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CVR</span>
               </span>
             </div>
           </div>
           <div className="grid-item">
             <span className="grid-item--header strela">
               <div className="logo"><img src="img/strela.png" /></div>
               <span className="grid-item--header---title ">ТАРГЕТ@MAIL.RU</span>
             </span>
             <div className="week">
               <span className="grid-item--week">
                 <span className="week-p">WEEK</span>
               </span>
               <span className="grid-item--week">
                 <span className="week-p">TODAY</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> СAMPAIGN</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> phrase</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">-</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info">  CtR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">-%</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> BUDGET</span>
               </span>
               <span className="grid-item--line red2">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info">   SPENT</span>
               </span>
               <span className="grid-item--line purple1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple2">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> LEFT</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red3">
                 <span className="grid-item--number">-%<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line red4">
                 <span className="grid-item--number">-%<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CVR</span>
               </span>
               <span className="grid-item--line purple3">
                 <span className="grid-item--number">-%<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple4">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CVR</span>
               </span>
             </div>
           </div>
           <div className="grid-item">
             <span className="grid-item--header insta">
               <div className="logo"><img src="img/instagram.png" /></div>
               <span className="grid-item--header---title">INSTAGRAM</span>
             </span>
             <div className="week">
               <span className="grid-item--week">
                 <span className="week-p">WEEK</span>
               </span>
               <span className="grid-item--week">
                 <span className="week-p">TODAY</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">{this.state.instaCampaigns}</span>
                 <span className="grid-item--info"> СAMPAIGN</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">{this.state.instaWeekClicks}</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">{this.state.instaDayShows}</span>
                 <span className="grid-item--info"> SHOWS</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">{this.state.instaDayClicks}</span>
                 <span className="grid-item--info"> CLICK</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line yellow3">
                 <span className="grid-item--number">{this.state.instaWeekCTR} %</span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line yellow4">
                 <span className="grid-item--number">{this.state.instaWeekCVR} %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
               <span className="grid-item--line green3">
                 <span className="grid-item--number">{this.state.instaDayCTR} %</span>
                 <span className="grid-item--info">  CtR</span>
               </span>
               <span className="grid-item--line green4">
                 <span className="grid-item--number">{this.state.instaDayCVR} %</span>
                 <span className="grid-item--info">  CVR</span>
               </span>
             </div>
						 <div className="line">
               <span className="grid-item--line yellow1">
                 <span className="grid-item--number">{this.state.instaWeekCPC}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line yellow2">
                 <span className="grid-item--number">{this.state.instaWeekCPA}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPA</span>
               </span>
               <span className="grid-item--line green1">
                 <span className="grid-item--number">{this.state.instaDayCPC}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CPC</span>
               </span>
               <span className="grid-item--line green2">
                 <span className="grid-item--number">{this.state.instaDayCPA}</span>
                 <span className="grid-item--info"> CPA</span>
               </span>
             </div>
             <div className="line">
               <span className="grid-item--line red1">
                 <span className="grid-item--number">{this.state.instaBudget}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> BUDGET</span>
               </span>
               <span className="grid-item--line red2">
                 <span className="grid-item--number">{this.state.instaWeekSpent}<span className="tenge">₸</span></span>
                 <span className="grid-item--info">   SPENT</span>
               </span>
               <span className="grid-item--line purple1">
                 <span className="grid-item--number">-<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> CTR</span>
               </span>
               <span className="grid-item--line purple2">
                 <span className="grid-item--number">{this.state.instaLeft}<span className="tenge">₸</span></span>
                 <span className="grid-item--info"> LEFT</span>
               </span>
             </div>
           </div>
           <div className="grid-item">
             <span className="grid-item--header1">
               <span className="grid-item--header1---title">TOTAL ACTION</span>
             </span>
             <div className="ctr">
               <span className="grid-item--ctr ctr_blue1">
                 <span className="grid-item--ctr--number">{this.state.weekReaches}</span>
                 <span className="grid-item--ctr--info"> LEADS</span>
               </span>
               <span className="grid-item--ctr ctr_blue2">
                 <span className="grid-item--ctr--number">{this.state.weekReaches}</span>
                 <span className="grid-item--ctr--info"> CALLS</span>
               </span>
             </div>
             <div className="ctr">
               <span className="grid-item--ctr ctr_blue3">
                 <span className="grid-item--ctr--number">{this.state.weekRejects}</span>
                 <span className="grid-item--ctr--info"> REJECTS</span>
               </span>
               <span className="grid-item--ctr ctr_blue4">
                 <span className="grid-item--ctr--number">{this.state.deals}</span>
                 <span className="grid-item--ctr--info"> DEALS</span>
               </span>
             </div>
           </div>
         </div>
       </div>

       <footer className="footer">
        <div className="footer-head">
          <span className="footer-head--first">UPCOMING EVENTS NOw</span>
          <span className="footer-head--second">TOTAL BALANCE</span>
        </div>
        <div className="footer-foot">
          <span className="red_triangle"><img src="img/tri.png" /></span>
          <span className="footer-text">FACEBOOK CTR -%</span>
          <span className="footer-money red1">-<span className="tenge">₸</span></span>
          <span className="footer-money green1">-<span className="tenge">₸</span></span>
        </div>
      </footer>
     </div>
    );
  }
}

export default Main;
