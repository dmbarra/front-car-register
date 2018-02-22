<template>
  <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-5">
        <p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="Procure pelo nome" v-model="search">
          <a class="button is-info" @click.prevent="searchCar">Search</a>
        </p>
      </div>
      <div class="column is-6">

      </div>
      <div class="column is-1">
        <a class="button is-info" @click.prevent="newCar">Novo</a>
      </div>



    </div>
    <div class="columns">
      <div class="column is-12">
        <table class="table is-narrow is-bordered">
          <thead>
            <th>Model</th>
            <th>Year</th>
            <th>Collor</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="Car in Car">
            <td>{{car.model}}</td>
            <td>{{car.year}}</td>
            <td>{{car.collor}}</td>
            <td class="is-icon">
              <a href="#">
                <i class="fa fa-map-marker"></i>
              </a>
              <a href="#">
                <i class="fa fa-plus-circle"></i>
              </a>
            </td>
            <td class="is-icon">

              <a href="#" @click.prevent="editCar(car)">
                <i class="fa fa-edit"></i>
              </a>
              <a href="#" @click.prevent="removeCar(car)">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination>
    </div>
  </div>
</div>

<div id="modal_car" class="modal" :class="{'is-active':showModal}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Carro: {{selected.model}}</p>
      <button class="delete" @click.prevent="showModal=false"></button>
    </header>
    <section class="modal-card-body">

    <div class="columns">
      <div class="column">
        <label class="label">Model</label>
          <p class="control">
            <input class="input" type="text" placeholder="Text input" v-model="selected.model">
          </p>
      </div>
      <div class="column">
         <label class="label">Year</label>
    <p class="control">
      <input class="input" type="text" placeholder="Text input" v-model="selected.year">
    </p>
      </div>
      </div>

      <label class="label">Collor</label>
      <p class="control">
        <input class="textarea" type="text" placeholder="Text input" v-model="selected.collor">
      </p>

   <label class="label">Category</label>
    <p class="control">
      <input class="input" type="text" placeholder="Text input" v-model="selected.category">
    </p>

    </section>
    <footer class="modal-card-foot">
      <a class="button is-primary" @click.prevent="saveCar">Salvar</a>
      <a class="button" @click.prevent="showModal=false">Cancelar</a>
    </footer>
  </div>
</div>
</template>

<script>
  import Pagination from './Pagination.vue'
  // import axios from 'axios';
  var client = require('@/js/client');


  export default {
    name: 'Car',
    data () {
      return {
        isLoading: false,
        title: 'Vue.js Crud',
        search: '',
        car: [],
        page: 1,
        total: 0,
        selected: {},
        itensPerPage: 10,
        showModal:false,
      }
    },
    components: {
      Pagination
    },
    methods: {
      onChangePage(page){
        this.page = page
        this.loadCar()
      },
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadCar(){

        let t = this
        this.showLoading()

        // let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        // let end = this.page * this.itensPerPage
        // let qString = "";

        // if (this.search){
          // qString = `&q=${this.search}`
        // }

        client.get(`/car/`).then(
         response=>{
           t.car = response.json()
           // t.total = response.headers['X-Total-Count']
           t.total = 1
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
       searchCar(){
        this.loadCar()
       },
       newCar(){
        this.selected={}
        this.showModal = true;
       },
       editCar(car){
        this.selected=car
        this.showModal = true;
       },
       removeCar(car){
        // let self = this;
        // swal({  title: "Você tem certeza?",
        //          text: `Deseja apagar "${brewery.name}"`,
        //          type: "warning",
        //          showCancelButton: true,
        //          confirmButtonColor: "#DD6B55",
        //          cancelButtonText: "Cancelar",
        //          confirmButtonText: "Sim, pode apagar!",
        //          showLoaderOnConfirm: true,
        //          closeOnConfirm: false }, function(){
        //
        //           self.$http.delete(`/breweries/${brewery.id}`).then(
        //             result=>{
        //               swal("Cervejaria removida!")
        //               self.loadBreweries()
        //             })
        // });
        //
       },
       saveCar(){
        if (this.selected.id!=null){  //EDIT
          client.put(`/car/${this.selected.id}`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadCar()
            )
          }
          else
          { //NEW
            client.post(`/car`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadCar()
            )
          }
       }
     },
     created(){
      this.loadCar();
    },
  }
</script>
<style>
  .fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>
