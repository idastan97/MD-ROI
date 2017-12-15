//страница админа
import React from 'react';
import axios from 'axios';

class Admin extends React.Component{
    constructor(props){
      super(props);
      this.state={
          id: "", //аиди новго счетчика для добавления
          message: "", //ответ сервера при добавлении счетчика
          savedCounter: null, //сохраненный счетчик
          counters: [] //список счетчиклв в базе
      };
      this.loadCounters=this.loadCounters.bind(this);
    }

    loadCounters(){ //получаем список счетчиков
      axios.get('/api/counters')
        .then((res)=>{
          this.setState({counters: res.data});
        }).catch(function(err){

        })
    }

    componentWillMount(){
      this.loadCounters(); //запускаем функцию выше
    }

    handleSubmit(){ //функция для сабмита (для добавления новго счетчика)
      var outerThis = this;
        axios.post('/api/addcounter',{ //стучимся на сервак
            id: outerThis.state.id
        }).then((res) => {
              outerThis.setState({ //обнуляем данные для добавления
                id: "",
                message: "",
                savedCounter: res.data //получаем ответ от сервера
              });
              outerThis.loadCounters();
              console.log(outerThis.state.savedCounter);
        }).catch(function(err){
            outerThis.setState({message: "Ошибка", savedCounter: null});
        });
    }

    //удаление счетчика
    deleteCounter(event){
      axios.post('/api/deletecounter', {
        counter: event.target.name,
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //добавление компании яндекс
    addYandexCompany(event){
      axios.post('/api/addyandexcompany', {
        counter: event.target.name,
        newYandexCompany: document.getElementById(event.target.name+'y').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //удаление компании яндекс
    deleteYandexCompany(event){
      axios.post('/api/deleteyandexcompany', {
        counter: event.target.name,
        yandexCompanyIndex: event.target.key
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //добавить компанию фейсбук
    addFbAdsCompany(event){
      axios.post('/api/addfbadscompany', {
        counter: event.target.name,
        newFbAdsCompany: document.getElementById(event.target.name+'f').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //удалить компанию фейсбук
    deleteFbAdsCompany(event){
      axios.post('/api/deletefbadscompany', {
        counter: event.target.name,
        fbAdsCompanyIndex: event.target.key
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //добавить компанию инсты
    addInstaCompany(event){
      axios.post('/api/addinstacompany', {
        counter: event.target.name,
        newInstaCompany: document.getElementById(event.target.name+'i').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //удалить компанию инсты
    deleteInstaCompany(event){
      axios.post('/api/deleteinstacompany', {
        counter: event.target.name,
        instaCompanyIndex: event.target.key
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //установить бюджет
    setYandexBudget(event){
      axios.post('/api/setyandexbudget', {
        counter: event.target.name,
        yandexBudget: document.getElementById(event.target.name+'yb').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    setFbBudget(event){
      axios.post('/api/setfbbudget', {
        counter: event.target.name,
        fbBudget: document.getElementById(event.target.name+'fb').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    setInstaBudget(event){
      axios.post('/api/setinstabudget', {
        counter: event.target.name,
        instaBudget: document.getElementById(event.target.name+'ib').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    //установить дилс
    setYandexDeals(event){
      axios.post('/api/setyandexdeals', {
        counter: event.target.name,
        yandexDeals: document.getElementById(event.target.name+'yd').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    setFbDeals(event){
      axios.post('/api/setfbdeals', {
        counter: event.target.name,
        fbDeals: document.getElementById(event.target.name+'fd').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    setInstaDeals(event){
      axios.post('/api/setinstadeals', {
        counter: event.target.name,
        instaDeals: document.getElementById(event.target.name+'id').value
      }).then((res)=>{
        this.loadCounters();
      })
    }

    render() {
      var outerThis = this;
        return (
          <div className="page">
            <div className = "text-center">
              <div className="form-group">
                  <h1>Добавить счетчик метрики</h1>
              </div>
              <div className='form-group'>
                <input onChange={(event)=>{
                    //меняем аиди в стейте
                    this.setState({id: event.target.value})
                  }} value={this.state.id} type="Number" placeholder = "Counter ID"/>
              </div>
              <div className='form-group'>
                <button onClick={this.handleSubmit.bind(this)}>Добавить</button>
              </div>
                <p className="message">{this.state.message}</p>
                {
                  //добавленный счетчик
                  this.state.savedCounter!==null ?
                    <div>
                      <p>Счетчик добавлен:</p>
                      <p>id: {this.state.savedCounter.id}</p>
                      <p>name: {this.state.savedCounter.name}</p>
                      <p>dircet: {this.state.savedCounter.yandexCompanies.join()}</p>
                      <p>goalId: {this.state.savedCounter.goalId}</p>
                    </div> :
                    <div />
                }
            </div>
            {
              //список счетчиков из базы
              this.state.counters.map(function(counter, index){
                return (
                  <div className='row-md' key={index}>
                    <div className='col-md-1 text-right' style={{marginTop: "25px"}}>
                      <button name={counter._id} onClick={outerThis.deleteCounter.bind(outerThis)}>X</button>
                    </div>
                    <div className='col-md-11' style={{backgroundColor: 'rgb(204, 204, 255)', border: 'solid 1px', marginTop: "20px", padding: '5px'}}>
                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          id:
                        </div>
                        <div className="col-md-10 text-left">
                          {counter.id}
                        </div>
                      </div>
                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          name:
                        </div>
                        <div className="col-md-10 text-left">
                          {counter.name}
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          goalId:
                        </div>
                        <div className="col-md-10 text-left">
                          {counter.goalId}
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          yandexBudget:
                        </div>
                        <div className="col-md-10 text-left">
                          <input id={counter._id+'yb'} type="Number" style={{width: "90px"}} placeholder={counter.yandexBudget}/>
                          <button name={counter._id} onClick={outerThis.setYandexBudget.bind(outerThis)}>ok</button>
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          fbBudget:
                        </div>
                        <div className="col-md-10 text-left">
                          <input id={counter._id+'fb'} type="Number" style={{width: "90px"}} placeholder={counter.fbBudget}/>
                          <button name={counter._id} onClick={outerThis.setFbBudget.bind(outerThis)}>ok</button>
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          instaBudget:
                        </div>
                        <div className="col-md-10 text-left">
                          <input id={counter._id+'ib'} type="Number" style={{width: "90px"}} placeholder={counter.instaBudget}/>
                          <button name={counter._id} onClick={outerThis.setInstaBudget.bind(outerThis)}>ok</button>
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          yandexDeals:
                        </div>
                        <div className="col-md-10 text-left">
                          <input id={counter._id+'yd'} type="Number" style={{width: "90px"}} placeholder={counter.yandexDeals}/>
                          <button name={counter._id} onClick={outerThis.setYandexDeals.bind(outerThis)} >ok</button>
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          fbDeals:
                        </div>
                        <div className="col-md-10 text-left">
                          <input id={counter._id+'fd'} type="Number" style={{width: "90px"}} placeholder={counter.fbDeals}/>
                          <button name={counter._id} onClick={outerThis.setFbDeals.bind(outerThis)}>ok</button>
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          instaDeals:
                        </div>
                        <div className="col-md-10 text-left">
                          <input id={counter._id+'id'} type="Number" style={{width: "90px"}} placeholder={counter.instaDeals}/>
                          <button name={counter._id} onClick={outerThis.setInstaDeals.bind(outerThis)}>ok</button>
                        </div>
                      </div>

                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          yandexCompanies:
                        </div>
                        <div className="col-md-10 text-left">
                          {
                            counter.yandexCompanies.map(function(yandexCompany, index2){
                              return <span key={index2} style={{border: "solid 1px", marginRight: "3px"}}>{yandexCompany} <button key={index2} name={counter._id} onClick={outerThis.deleteYandexCompany.bind(outerThis)}>x</button></span>
                            })
                          }
                          <input id={counter._id+'y'} type="Number" style={{width: "90px"}}/>
                          <button name={counter._id} onClick={outerThis.addYandexCompany.bind(outerThis)}>+</button>
                        </div>
                      </div>
                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          fbAdsCompanies:
                        </div>
                        <div className="col-md-10 text-left">
                          {
                            counter.fbAdsCompanies.map(function(fbAdsCompany, index2){
                              return <span key={index2} style={{border: "solid 1px", marginRight: "3px"}}>{fbAdsCompany} <button key={index2} name={counter._id} onClick={outerThis.deleteFbAdsCompany.bind(outerThis)}>x</button></span>
                            })
                          }
                          <input id={counter._id+'f'} type="Number" style={{width: "150px"}}/>
                          <button name={counter._id} onClick={outerThis.addFbAdsCompany.bind(outerThis)}>+</button>
                        </div>
                      </div>
                      <div className="form-group row-md">
                        <div className="col-md-2 text-right">
                          instaCompanies:
                        </div>
                        <div className="col-md-10 text-left">
                          {
                            counter.instaCompanies.map(function(instaCompany, index2){
                              return <span key={index2} style={{border: "solid 1px", marginRight: "3px"}}>{instaCompany} <button key={index2} name={counter._id} onClick={outerThis.deleteInstaCompany.bind(outerThis)}>x</button></span>
                            })
                          }
                          <input id={counter._id+'i'} type="Number" style={{width: "150px"}}/>
                          <button name={counter._id} onClick={outerThis.addInstaCompany.bind(outerThis)}>+</button>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })
            }
          </div>
        );
    }
};

export default Admin;
