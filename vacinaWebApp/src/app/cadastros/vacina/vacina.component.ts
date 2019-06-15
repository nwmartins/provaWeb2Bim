import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Vacina } from './model/vacina';
import { VacinaService } from './vacina.service';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {
  vacinaModel: Vacina;
  edicao: Boolean = false;  

  constructor(private vacinaService: VacinaService, 
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.vacinaModel = new Vacina();    
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id != undefined){
          console.log(params);
          this.getById(params.id);
          this.edicao = true;
        }
      }
    )
  }

  getById(id: number){
    this.vacinaService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.vacinaModel = sucesso;
      },
      error => {
        console.log(error);
      }
      )};  

  salvar(){
    console.log("salvar Vacina");
    console.log(this.edicao);
    this.spinner.show();
    if (this.edicao == false) {
      this.vacinaService.save(this.vacinaModel).subscribe(sucesso => {
        console.log(sucesso);
        if (sucesso != null) {
          console.log("Salvo");
          this.voltar();  
        }      
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });
    } else {
      this.vacinaService.put(this.vacinaModel).subscribe(sucesso => {
        console.log(sucesso);
        if (sucesso != null)  {
          console.log("Atualizado"); 
          this.voltar();        
        }
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });      
    } 
  }   
      
  voltar(){
    this.router.navigate(['../vacina-list/']);   
  }      

}
